<template>
    <div class="parameter-controls">
        <vue-slider interval="0.01" max="1" min="0" v-model="syncedBirthRateCommoners">
            <p>Commoners birth rate</p>
        </vue-slider>
        <br />
        <vue-slider interval="0.01" max="1" min="0" v-model="syncedBirthRateElites">
            <p>Elites birth rate</p>
        </vue-slider>
        <br />
        <vue-slider interval="0.01" max="1" min="0" v-model="syncedRegenerationFactor">
            <p>Regeneration factor</p>
        </vue-slider>
        <br />
        <vue-slider max="100" min="0" v-model="syncedNatureCapacity">
            <p>Nature's capacity</p>
        </vue-slider>
        <br />
        <vue-slider interval="0.01" min="0" max="1" v-model="syncedDepletionPerWorker">
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
    @PropSync('birthRateCommoners') private syncedBirthRateCommoners: number = 0.03;
    @PropSync('birthRateElites') private syncedBirthRateElites: number = 0.03;
    @PropSync('regenerationFactor') private syncedRegenerationFactor: number = 0.01;
    @PropSync('natureCapacity') private syncedNatureCapacity: number = 100.0;
    @PropSync('depletionPerWorker') private syncedDepletionPerWorker: number = 0.01;
}
</script>

<style scoped>

</style>