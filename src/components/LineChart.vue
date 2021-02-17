<template>
  <div>
    <svg
      id="chart"
      :height="height"
      :width="width"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, toRef, watch} from 'vue'
import * as d3 from 'd3';
import {SimulationResults} from "@/HandySimulator";

export default defineComponent({
    name: 'LineChart',
    props: {
      chartData: {
        required: true,
        type: Object as () => SimulationResults,
      }
    },
    setup(props) {
      // FIXME: dynamic size
      const height = 600;
      const width = 1000;
      const draw = function() {
        //console.log(props.chartData);
        // TODO
        const svg = d3
          .select("#chart")
          .append("g");

        const x = d3
          .scaleLinear()
          // TODO: yearsToModel, or dynamic chart data length
          .domain([0, 600])
          .range([0, width]);
        //.range(width)
        const y = d3
          .scaleLinear()
          .domain([0, props.chartData.maximumPopupation])
          .range([0, height]);

        const data1 = props.chartData.datasets[0].data.entries();
        const line1 = d3
          .line()
          .x(v => x(v[0]))
          .y(v => y(v[1]));

        svg
          .append("path")
          .datum(data1)
          .attr("d", line1);

        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        svg.append("g")
          .call(d3.axisLeft(y));
      };

      watch(toRef(props, "chartData"), draw);
      // FIXME: Shouldn't require the initial kick
      onMounted(draw);

      return {
        draw,
        height,
        width,
      }
    },
})
</script>
