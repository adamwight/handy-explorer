<template>
  <svg
    class="chart-svg"
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
      const margin = ({top: 5, right: 15, bottom: 25, left: 25});
      const width = 400;
      const height = 300;

      const draw = function() {
        const svg = d3
          // FIXME: Don't use ID, this breaks multiple graph support.
          .select(".chart-svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
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

        const lineSeries = svg.append("g");

        svg.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x));

        svg.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y));

        function updateData(chartData: SimulationResults) {
          const data = chartData.datasets.map(set => set.data);
          lineSeries
            .selectAll("path")
            .data(data)
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
      }
    },
})
</script>

<style lang="scss">
  .chart-svg {
    margin: 10px;
    padding: 10px;
    max-height: 100%;
  }

  .line {
    fill: none;
    stroke-width: 2px;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
</style>
