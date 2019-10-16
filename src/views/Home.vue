<template>
  <div class="home">
    <ParameterControls @param1Change="handleParam1" />
    <LineChart :chart-data="displaydatacollection" :options="chartoptions" />
  </div>
</template>
<script lang="ts">
import LineChart from '../components/LineChart';
import ParameterControls from '../components/ParameterControls.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {LineChart, ParameterControls},
    computed: {
        displaydatacollection() {
            return {
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
            };
        },

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

    handleParam1(value: number) {
        console.log(value);
        this.param1 = value;
    }
};
</script>