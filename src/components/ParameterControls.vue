<template>
    <div class="parameter-controls">
        <vue-slider :interval="0.001" :max="0.1" :min="0" v-model="syncedBirthRateCommoners">
            <p>Commoners birth rate<!-- FIXME: = {{ syncedBirthRateCommoners }} --></p>
        </vue-slider>
        <br />
        <vue-slider :interval="0.001" :max="0.1" :min="0" v-model="syncedBirthRateElites">
            <p>Elites birth rate</p>
        </vue-slider>
        <br />
        <!-- TODO: slider should be logarithmic. -->
        <vue-slider :interval="0.1" :max="100" :min="0" v-model="syncedInequalityFactor">
            <p>Inequality factor</p>
        </vue-slider>
        <br />
        <vue-slider :interval="0.0001" :max=".01" :min="0" v-model="syncedDepletionPerWorker">
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
    // FIXME: depletion figure is a stolen guess.
    @PropSync('depletionPerWorker', { default: 0.000007 }) private syncedDepletionPerWorker!: number;
}
</script>

<style scoped>
div {
    margin: 10px auto 10px auto;
}
</style>