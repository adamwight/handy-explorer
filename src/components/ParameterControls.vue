<template>
  <div class="parameter-controls">
    <Slider
      v-model="currentParameters.birthRateCommoners"
      :step="0.001"
      :max="0.1"
      :min="0"
      color="#9924f4"
      track-color="#bc7af4"
      :tooltip="true"
    />
    <p>Commoners birth rate</p>
    <br>
    <Slider
      v-model="currentParameters.birthRateElites"
      :step="0.001"
      :max="0.1"
      :min="0"
      color="#2b5bf1"
      track-color="#a8b9f0"
      :tooltip="true"
    />
    <p>Elites birth rate</p>
    <br>
    <!-- TODO: slider should be logarithmic. -->
    <Slider
      v-model="currentParameters.inequalityFactor"
      :step="0.25"
      :max="100"
      :min="1"
      color="#decb12"
      track-color="#f3eec1"
      :tooltip="true"
    />
    <p>Inequality factor</p>
    <br>
    <Slider
      v-model="currentParameters.depletionPerWorker"
      :step="0.000001"
      :max=".00005"
      :min="0"
      color="#8e842a"
      track-color="#b3ad71"
      :tooltip="true"
    />
    <p>Depletion per worker</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRef, watch} from 'vue'
import {SimulationParameters} from "@/store/SimulationParameters";
import Slider from "vue3-slider";

export default defineComponent({
    name: 'ParameterControls',
    components: {
      Slider,
    },
    props: {
      initialParameters: {
        type: Object as () => SimulationParameters,
        required: true,
      }
    },
    emits: [ "change" ],
    setup(props, {emit}) {
      // Any parameter changes cause a full chart refresh.
      const currentParameters = reactive({...props.initialParameters});
      watch(
        [
          toRef(currentParameters, "birthRateCommoners"),
          toRef(currentParameters, "birthRateElites"),
          toRef(currentParameters, "inequalityFactor"),
          toRef(currentParameters, "depletionPerWorker"),
        ],
        () => emit("change", currentParameters)
      )

      return {
        currentParameters
      }
    }
})
</script>

<style scoped>
div {
    margin: 10px auto 10px auto;
}
</style>

<style lang="scss">
.vue3-slider .handle {
  transform: scale(1.0);

  &.hover {
     transform: scale(1.2);
  }
}
</style>
