<template>
  <div class="parameter-controls">
    <Slider
      :modelValue="simulationParameters.birthRateCommoners"
      :step="0.001"
      :max="0.1"
      :min="0"
    >
      <p>Commoners birth rate<!-- FIXME: = {{ syncedBirthRateCommoners }} --></p>
    </Slider>
    <br>
    <Slider
      :modelValue="simulationParameters.birthRateElites"
      :step="0.001"
      :max="0.1"
      :min="0"
    >
      <p>Elites birth rate</p>
    </Slider>
    <br>
    <!-- TODO: slider should be logarithmic. -->
    <Slider
      :modelValue="simulationParameters.inequalityFactor"
      :step="0.25"
      :max="100"
      :min="1"
    >
      <p>Inequality factor</p>
    </Slider>
    <br>
    <Slider
      :modelValue="simulationParameters.depletionPerWorker"
      :step="0.000001"
      :max=".00005"
      :min="0"
    >
      <p>Depletion per worker</p>
    </Slider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SimulationParameters } from "@/store/SimulationParameters";
import Slider from "vue3-slider";

export default defineComponent({
    name: 'ParameterControls',
    components: {
      Slider,
    },
    props: {
      simulationParameters: {
        type: Object as () => SimulationParameters,
        required: true,
      }
    },
})
</script>

<style scoped>
div {
    margin: 10px auto 10px auto;
}
</style>
