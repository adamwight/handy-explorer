<template>
  <div class="home">
    <div class="controls">
      <ParameterControls
        :initial-parameters="simulationParameters"
        @change="updateParameters"
      />
    </div>
    <div class="chart">
      <LineChart
        :chart-data="chartData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import ParameterControls from "@/components/ParameterControls.vue";
import {HandySimulator} from '@/HandySimulator'
import {initialParams, SimulationParameters} from '@/store/SimulationParameters';
import LineChart from "@/components/LineChart.vue";

export default defineComponent({
  components: {
    LineChart,
    ParameterControls,
  },
  setup() {
    const simulationParameters = ref({...initialParams});
    const updateParameters = function(currentParameters: SimulationParameters) {
      simulationParameters.value = currentParameters;
    };

    const chartData = computed(() => {
      // TODO: Debounce, kill running simulation
      return new HandySimulator()
              .runSimulation(simulationParameters.value);
    });

    return {
      chartData,
      simulationParameters,
      updateParameters,
    }
  }
});
</script>

<style scoped>
    .controls {
        width: 65%;
        margin: 10px auto 10px auto;
    }
    .chart {
        width: 80%;
        margin: 10em auto 10px auto;
    }
</style>
