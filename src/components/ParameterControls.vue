<template>
  <template
    v-for="control in controls"
    :key="control.id"
  >
    <br>{{ control.title }}
    <Slider
      v-model="control.value"
      :step="control.step"
      :min="control.min"
      :max="control.max"
      :color="control.onColor"
      :track-color="control.offColor"
      tooltip-color="#999"
      :tooltip="true"
    />
  </template>
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

      const controls = [
        {
          title: "Workers birth rate",
          id: 'workers-birth',
          value: toRef(currentParameters, 'birthRateCommoners'),
          step: 0.001,
          min: 0,
          max: 0.1,
          onColor: "#9924f4",
          offColor: "#bc7af4",
        },
        {
          title: "Elites birth rate",
          id: 'elites-birth',
          value: toRef(currentParameters, 'birthRateElites'),
          step: 0.001,
          min: 0,
          max: 0.1,
          onColor: "#2b5bf1",
          offColor: "#a8b9f0",
        },
        {
          // TODO: slider should be logarithmic.
          title: "Inequality factor",
          id: 'inequality',
          value: toRef(currentParameters, 'inequalityFactor'),
          step: 0.25,
          min: 1,
          max: 100,
          onColor: "#decb12",
          offColor: "#f3eec1",
        },
        {
          title: "Depletion per worker",
          id: 'depletion',
          value: toRef(currentParameters, 'depletionPerWorker'),
          step: 0.000001,
          min: 0,
          max: 0.0005,
          onColor: "#8e842a",
          offColor: "#b3ad71",
        },
      ];

      return {
        controls,
      }
    }
})
</script>

<style lang="scss">
.vue3-slider .handle {
  transform: scale(1.0);

  &.hover {
     transform: scale(1.2);
  }
}
</style>
