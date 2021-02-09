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
        <vue-slider :interval="0.25" :max="100" :min="1" v-model="syncedInequalityFactor">
            <p>Inequality factor</p>
        </vue-slider>
        <br />
        <vue-slider :interval="0.000001" :max=".00005" :min="0" v-model="syncedDepletionPerWorker">
            <p>Depletion per worker</p>
        </vue-slider>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'vue-slider-component/theme/material.css'

export default defineComponent({
    name: 'ParameterControls',
    props: {
        birthRateCommoners: {
            type: Number,
            default: 0.03,
        },
        birthRateElites: {
            type: Number,
            default: 0.03,
        },
        inequalityFactor: {
            type: Number,
            default: 10
        },
        // FIXME: depletion figure is a stolen guess.
        depletionPerWorker: {
            type: Number,
            default: 0.000007
        },
    }
})
</script>

<style scoped>
div {
    margin: 10px auto 10px auto;
}
</style>
