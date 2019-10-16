<template>
    <div class="parameter-controls">
        <vue-slider v-model="syncedBirthRateCommoners">
            <p>Commoners birth rate</p>
        </vue-slider>
        <br />
        <vue-slider v-model="syncedBirthRateElites">
            <p>Elites birth rate</p>
        </vue-slider>
        <br />
        <vue-slider v-model="syncedRegenerationFactor">
            <p>Regeneration factor</p>
        </vue-slider>
        <br />
        <vue-slider v-model="syncedNatureCapacity">
            <p>Nature's capacity</p>
        </vue-slider>
        <br />
        <vue-slider v-model="syncedDepletionPerWorker">
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
    @PropSync('birthRateCommoners') private syncedBirthRateCommoners!: number;
    @PropSync('birthRateElites') private syncedBirthRateElites!: number;
    @PropSync('regenerationFactor') private syncedRegenerationFactor!: number;
    @PropSync('natureCapacity') private syncedNatureCapacity!: number;
    @PropSync('depletionPerWorker') private syncedDepletionPerWorker!: number;
}
</script>

<style scoped>

</style>