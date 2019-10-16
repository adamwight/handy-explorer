<template>
  <div class="home">
    <ParameterControls @param1Change="handleParam1" />
    <LineChart :chart-data="chartData" :options="chartoptions" />
  </div>
</template>
<script lang="ts">
import LineChart from '../components/LineChart';
import ParameterControls from '../components/ParameterControls.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {LineChart, ParameterControls},
    computed: {
        chartoptions() {
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
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data One',
                    data: [40, 39, 10, 40, 39, 80, 40].map((val) => val + this.param1),
                },
                {
                    label: 'Data Two',
                    data: [60, 55, 32, 10, 2, 12, 53],
                },
            ],
        };
    }
}
</script>