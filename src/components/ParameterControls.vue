<template>
    <div>
        <vue-slider v-model="syncedBirthRateCommoners">
            <p>Commoners birth rate</p>
        </vue-slider>
        <br />
        <vue-slider v-model="syncedBirthRateElites">
            <p>Elites birth rate</p>
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
    @PropSync('birthRateCommoners') private syncedBirthRateCommoners!: number;
    @PropSync('birthRateElites') private syncedBirthRateElites!: number;
}
</script>

<style scoped>

</style>