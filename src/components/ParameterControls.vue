<template>
   <vue-slider v-model="syncedParam1" />
</template>

<script lang="ts">
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/material.css';
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component({
    components: { VueSlider },
})
export default class ParameterControls extends Vue {
    @PropSync('param1') private syncedParam1!: number;
}
</script>

<style scoped>

</style>