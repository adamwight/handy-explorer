<template>
  <div class="home">
    <div class="controls">
      <ParameterControls
        :simulation-params="simulationParams"
      />
    </div>
    <div class="chart">
      <LineChart
        :chart-data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HandySimulator, SimulationResults } from '@/HandySimulator'
import { initialParams } from '@/store/SimulationParameters';

export default defineComponent({
  data() {
    return {
      simulationParameters: initialParams,
      chartOptions: {},
    }
  },
  computed: {
      chartData(): SimulationResults {
          // TODO: Debounce, kill running simulation
          return new HandySimulator()
            .runSimulation(this.simulationParameters);
      }
  },
  events: {

  }
});
</script>

<style scoped>
    div.controls {
        width: 65%;
        margin: 10px auto 10px auto;
    }
    div.chart {
        width: 80%;
        margin: 10em auto 10px auto;
    }
</style>
