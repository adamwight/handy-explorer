<template>
  <div class="parameter-controls">
    <Slider
      :value="simulationParameters.birthRateCommoners"
      :interval="0.001"
      :max="0.1"
      :min="0"
    >
      <p>Commoners birth rate<!-- FIXME: = {{ syncedBirthRateCommoners }} --></p>
    </Slider>
    <br>
    <Slider
      :value="simulationParameters.birthRateElites"
      :interval="0.001"
      :max="0.1"
      :min="0"
    >
      <p>Elites birth rate</p>
    </Slider>
    <br>
    <!-- TODO: slider should be logarithmic. -->
    <Slider
      :value="simulationParameters.inequalityFactor"
      :interval="0.25"
      :max="100"
      :min="1"
    >
      <p>Inequality factor</p>
    </Slider>
    <br>
    <Slider
      :value="simulationParameters.depletionPerWorker"
      :interval="0.000001"
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
import Slider from "@vueform/slider";

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
