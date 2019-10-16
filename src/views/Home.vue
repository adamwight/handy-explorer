<template>
  <div class="home">
    <ParameterControls
        @update:birthRateCommoners="handleBirthRateCommoners"
        @update:birthRateElites="handleBirthRateElites"
    />
    <br />
    <LineChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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
    private birthRateCommoners: number = 0;
    private birthRateElites: number = 0;

    private handleBirthRateCommoners(value: number) {
        this.birthRateCommoners = value;
    }

    private handleBirthRateElites(value: number) {
        this.birthRateElites = value;
    }

    get chartData() {
        return new HandySimulator(this.birthRateCommoners, this.birthRateElites).runSimulation();
    }
}
</script>