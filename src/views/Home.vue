<template>
  <div class="home">
      <div class="controls">
        <ParameterControls
            @update:birthRateCommoners="handleBirthRateCommoners"
            @update:birthRateElites="handleBirthRateElites"
            @update:inequalityFactor="handleInequalityFactor"
            @update:depletionPerWorker="handleDepletionPerWorker"
        />
      </div>
      <div class="chart">
        <LineChart :chart-data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HandySimulator } from '@/HandySimulator'

export default defineComponent({
    computed: {
        chartData() {
            // TODO: kill running simulation on any changed parameter.
            return new HandySimulator(
                this.birthRateCommoners,
                this.birthRateElites,
                this.inequalityFactor,
                this.depletionPerWorker,
            ).runSimulation();
        }
    },
})
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
