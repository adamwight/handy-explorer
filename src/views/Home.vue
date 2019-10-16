<template>
  <div class="home">
    <ParameterControls />
    <LineChart :chart-data="displaydatacollection" :options="chartoptions" @param1Change="handleParam1" />
  </div>
</template>
<script lang="ts">
import LineChart from '../components/LineChart';
import ParameterControls from '../components/ParameterControls.vue';
export default {
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
    methods: {
        handleParam1(value: number) {
            console.log('foo', value);
        },
    },
};
</script>