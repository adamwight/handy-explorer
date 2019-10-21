<template>
    <div class="parameter-controls">
        <vue-slider :interval="0.01" :max="1" :min="0" v-model="syncedBirthRateCommoners">
            <p>Commoners birth rate</p>
        </vue-slider>
        <br />
        <vue-slider :interval="0.01" :max="1" :min="0" v-model="syncedBirthRateElites">
            <p>Elites birth rate</p>
        </vue-slider>
        <br />
        <vue-slider :max="1000" :min="1" v-model="syncedInequalityFactor">
            <p>Inequality factor</p>
        </vue-slider>
        <br />
        <vue-slider :interval="0.01" :max="1" :min="0" v-model="syncedDepletionPerWorker">
            <p>Depletion per worker</p>
        </vue-slider>
    </div>
</template>

<script lang="ts">
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/material.css';
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component({
    components: { VueSlider },
})
export default class ParameterControls extends Vue {
    @PropSync('birthRateCommoners', { default: 0.03 }) private syncedBirthRateCommoners!: number;
    @PropSync('birthRateElites', { default: 0.03 }) private syncedBirthRateElites!: number;
    @PropSync('inequalityFactor', { default: 10 }) private syncedInequalityFactor!: number;
    @PropSync('depletionPerWorker', { default: 1.0 }) private syncedDepletionPerWorker!: number;
}
</script>

<style scoped>

</style>