<template>
  <div class="parameter-controls">
    <vue-slider
      v-model="syncedBirthRateCommoners"
      :interval="0.001"
      :max="0.1"
      :min="0"
    >
      <p>Commoners birth rate<!-- FIXME: = {{ syncedBirthRateCommoners }} --></p>
    </vue-slider>
    <br>
    <vue-slider
      v-model="syncedBirthRateElites"
      :interval="0.001"
      :max="0.1"
      :min="0"
    >
      <p>Elites birth rate</p>
    </vue-slider>
    <br>
    <!-- TODO: slider should be logarithmic. -->
    <vue-slider
      v-model="syncedInequalityFactor"
      :interval="0.25"
      :max="100"
      :min="1"
    >
      <p>Inequality factor</p>
    </vue-slider>
    <br>
    <vue-slider
      v-model="syncedDepletionPerWorker"
      :interval="0.000001"
      :max=".00005"
      :min="0"
    >
      <p>Depletion per worker</p>
    </vue-slider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'vue-slider-component/theme/material.css'
import { SimulationParameters } from '@/store/SimulationParameters';

export default defineComponent({
    name: 'ParameterControls',
    props: {
      simulationParams: SimulationParameters
    }
      // FIXME: simulationParams: { type: SimulationParameters },
})
</script>

<style scoped>
div {
    margin: 10px auto 10px auto;
}
</style>
