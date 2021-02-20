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

<style>
  .home {
    display: grid;
  }

  @media (min-width: 768px) {
    /* Target devices wider than 768px. */
    .chart {
      margin: 10px auto;
    }
  }

  @media (max-width: 767px) {
    /* Target devices narrower than 768px. */
  }

  @media all and (orientation: landscape) {
    .home {
      grid-template-columns: 1fr 2fr;
      grid-auto-rows: minmax(auto, 100vh);
    }
  }

  @media all and (orientation: portrait) {
    .home {
      grid-template-rows: 1fr 2fr;
    }
  }
</style>
