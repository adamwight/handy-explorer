<template>
  <div class="home">
    <ParameterControls @update:param1="handleParam1" />
    <LineChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LineChart from '../components/LineChart';
import ParameterControls from '../components/ParameterControls.vue';
import { HandySimulator } from '../HandySimulator';


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
    private param1: number = 0;

    private handleParam1(value: number) {
        this.param1 = value;
        // TODO force update?
    }

    get chartData() {
        return new HandySimulator(this.param1).runSimulation();
    }
}
</script>