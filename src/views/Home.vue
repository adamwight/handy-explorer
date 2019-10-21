<template>
  <div class="home">
    <ParameterControls
        @update:birthRateCommoners="handleBirthRateCommoners"
        @update:birthRateElites="handleBirthRateElites"
        @update:inequalityFactor="handleInequalityFactor"
        @update:depletionPerWorker="handleDepletionPerWorker"
    />
    <p>
        <LineChart :chart-data="chartData" :options="chartOptions" />
    </p>
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
                responsive: true,
                maintainAspectRatio: false,
            };
        },
    },
})
export default class Home extends Vue {
    private birthRateCommoners: number = 0.03;
    private birthRateElites: number = 0.03;
    private inequalityFactor: number = 10;
    private depletionPerWorker: number = 0.01;

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
        this.birthRateElites = value;
    }

    get chartData() {
        return new HandySimulator(
            this.birthRateCommoners,
            this.birthRateElites,
            this.inequalityFactor,
            this.depletionPerWorker,
        ).runSimulation();
    }
}
</script>