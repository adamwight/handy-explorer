<template>
  <svg
    id="chart"
    :height="height"
    :width="width"
  />
</template>

<script lang="ts">
import {defineComponent, onMounted, watchEffect} from 'vue'
import * as d3 from 'd3';
import {SimulationResults} from "@/HandySimulator";

const charts = [
  {
    color: 'red',
  },
  {
    color: 'blue',
  },
  {
    color: 'green',
  },
  {
    color: 'yellow',
  },
];

export default defineComponent({
    name: 'LineChart',
    props: {
      chartData: {
        required: true,
        type: Object as () => SimulationResults,
      }
    },
    setup(props) {
      const margin = ({top: 10, right: 20, bottom: 30, left: 40});
      // FIXME: dynamic size
      const height = 600;
      const width = 1000;

      const draw = function() {
        const svg = d3
          // FIXME: Don't use ID, this breaks multiple graph support.
          .select("#chart")
          .append("g");

        const x = d3
          .scaleLinear()
          // TODO: yearsToModel, or dynamic chart data length
          .domain([0, 300])
          .range([margin.left, width - margin.right]);
        const y = d3
          .scaleLinear()
          //.domain([0, props.chartData.maximumPopupation])
          .domain([0, 1])
          .range([height - margin.bottom, margin.top]);

        const line = d3.line<number>(
          (_, i) => x(i),
          v => y(v)
        );

        const linePath = svg
          .selectAll("path");

        svg.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x));

        svg.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y));

        function updateData(chartData: SimulationResults) {
          const data = chartData.datasets.map(set => set.data);
          linePath
            .data(data, (_, i) => i)
            .join("path")
            .attr("class", "line")
            .attr("stroke", (_, i) => charts[i].color)
            .attr("d", d => line(d));
        }
        watchEffect(() => updateData(props.chartData));
      };

      onMounted(draw);

      return {
        draw,
        height,
        width,
      }
    },
})
</script>

<style lang="scss">
  #chart {
    margin: 10px;
    padding: 10px;
  }
  .line {
    fill: none;
    stroke-width: 2px;
  }
</style>
