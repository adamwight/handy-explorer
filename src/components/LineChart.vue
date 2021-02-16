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
import { defineComponent } from 'vue'
//import * as d3 from 'd3';

export default defineComponent({
    name: 'LineChart',
    props: {
      chartData: { type: Object, required: true },
    },
    data() {
        return {
            // FIXME
            height: 600,
            width: 1000,
        }
    },
    created() {
      /*
        const svg = d3
            .select("#chart")
            .append("g");

        const xAxis = d3
            .scaleLinear();

       */
        // TODO
            //.domain([0,)
            //.range(this.width)
        //const yAxis =
        //this.chart = d3
    },
})
        //this.renderChart(this.chartData, this.options);
</script>
