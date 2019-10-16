<template>
  <div id="app">
    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Linechart</h2>
          <line-example></line-example>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Line } from 'vue-chartjs';

export default Vue.component( 'line-chart', {
    extends: Line,

    mounted() {

        (this as any).renderChart({
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#FC2525',
                        data: [40, 39, 10, 40, 39, 80, 40],
                    },
                    {
                        label: 'Data Two',
                        backgroundColor: '#05CBE1',
                        data: [60, 55, 32, 10, 2, 12, 53],
                    },
                ],
            },
            {
                responsive: true,
                maintainAspectRatio: false,
            });
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
