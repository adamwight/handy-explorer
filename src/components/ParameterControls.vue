<template>
  <template
    v-for="control in controls"
    :key="control.key"
  >
    <br>{{ control.title }}
    <Slider
      v-model="currentParameters[control.key]"
      :step="control.step"
      :min="control.min"
      :max="control.max"
      :color="control.onColor"
      :track-color="control.offColor"
      tooltip-color="#999"
      :tooltip="true"
      @update:modelValue="$emit('change', currentParameters)"
    />
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {SimulationParameters} from "@/store/SimulationParameters";
import Slider from "vue3-slider";

const controls = [
  {
    title: "Workers birth rate",
    key: 'birthRateCommoners',
    step: 0.001,
    min: 0,
    max: 0.1,
    onColor: "#9924f4",
    offColor: "#bc7af4",
  },
  {
    title: "Elites birth rate",
    key: 'birthRateElites',
    step: 0.001,
    min: 0,
    max: 0.1,
    onColor: "#2b5bf1",
    offColor: "#a8b9f0",
  },
  {
    // TODO: slider should be logarithmic.
    title: "Inequality factor",
    key: 'inequalityFactor',
    step: 0.25,
    min: 1,
    max: 100,
    onColor: "#decb12",
    offColor: "#f3eec1",
  },
  {
    title: "Depletion per worker",
    key: 'depletionPerWorker',
    step: 0.000001,
    min: 0,
    max: 0.0005,
    onColor: "#8e842a",
    offColor: "#b3ad71",
  },
];

export default defineComponent({
  name: 'ParameterControls',
  components: {
    Slider,
  },
  props: {
    initialParameters: {
      required: true,
      type: Object as () => SimulationParameters,
    }
  },
  emits: [ "change" ],
  setup() {
    return {
      controls,
    }
  },
  data() {
    return {
      currentParameters: this.initialParameters,
    };
  },
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
