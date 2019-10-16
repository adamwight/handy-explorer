<template>
   <vue-slider :value="value" @change="emitChange" />
</template>

<script lang="ts">
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/material.css';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: { VueSlider },
})
export default class ParameterControls extends Vue {
    @Prop() private value!: number;

    private emitChange(value: number) {
        // TODO: debounce: drop if same, only update every e.g. 0.1s
        this.$emit('param1Change', value);
    }
}
</script>

<style scoped>

</style>