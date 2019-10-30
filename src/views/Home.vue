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
import { Component, Vue } from 'vue-property-decorator';

import LineChart from '@/components/LineChart';
import ParameterControls from '@/components/ParameterControls.vue';
import { HandySimulator } from '@/HandySimulator';


@Component({
    components: {LineChart, ParameterControls},
    computed: {
        chartOptions() {
            return {
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
            };
        },
    },
})
export default class Home extends Vue {
    // FIXME: defaults are duplicated in ParameterControls.
    private birthRateCommoners: number = 0.03;
    private birthRateElites: number = 0.03;
    private inequalityFactor: number = 10;
    private depletionPerWorker: number = 0.000007;

    private handleBirthRateCommoners(value: number) {
        this.birthRateCommoners = value;
    }

    private handleBirthRateElites(value: number) {
        this.birthRateElites = value;
    }

    private handleInequalityFactor(value: number) {
        this.inequalityFactor = value;
    }

    private handleDepletionPerWorker(value: number) {
        this.depletionPerWorker = value;
    }

    get chartData() {
        // TODO: kill running simulation on any changed parameter.
        return new HandySimulator(
            this.birthRateCommoners,
            this.birthRateElites,
            this.inequalityFactor,
            this.depletionPerWorker,
        ).runSimulation();
    }
}
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
