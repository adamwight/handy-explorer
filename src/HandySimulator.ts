import { SimulationParameters } from "@/store/SimulationParameters";

interface NormalizedSeries {
    normalized: number[];
    maximum: number;
}

export interface SimulationResults {
    datasets: Array<number[]>;
}

export class HandySimulator {

    // TODO: Clean up normalization.  Print scale for each line.
    private normalize(data: number[]): NormalizedSeries {
        const max = data.reduce(
            (previousValue: number, currentValue: number) => Math.max(previousValue, currentValue));

        return {
            normalized: data.map((unscaled: number) => unscaled / max),
            maximum: max,
        };
    }

    // TODO: types for parametric deltas and outputs
    public runSimulation(params: SimulationParameters): SimulationResults {
        //const startMark = performance.now();
        // TODO: const dataPoints = 100;
        // FIXME: Changing dt makes the model unstable.
        const dt = 1;

        let populationCommoners = params.initialPopulationCommoners;
        let populationElites = params.initialPopulationElites;
        let nature = 100;
        let wealth = 0;

        const recordPopulationCommoners: number[] = [];
        const recordPopulationElites: number[] = [];
        const recordNature: number[] = [];
        const recordWealth: number[] = [];
        const recordTime: number[] = [];

        for (let i = 0; i < params.yearsToModel; i += dt) {
            // Derived variables.
            const wealthThreshold = params.minimumRequiredConsumptionPerCapita
                * (populationCommoners + params.inequalityFactor * populationElites);
            const commonersConsumption = Math.min(1, wealth / wealthThreshold)
                * params.subsistenceSalaryPerCapita * populationCommoners;
            const elitesConsumption = Math.min(1, wealth / wealthThreshold)
                * params.inequalityFactor * params.subsistenceSalaryPerCapita * populationElites;
            const deathRateCommoners = params.normalDeathRate
                + Math.max(0, 1 - commonersConsumption / (params.subsistenceSalaryPerCapita * populationCommoners))
                    * (params.famineDeathRate - params.normalDeathRate);
            const deathRateElites = params.normalDeathRate
                + Math.max(0, 1 - elitesConsumption / (params.subsistenceSalaryPerCapita * populationElites))
                * (params.famineDeathRate - params.normalDeathRate);

            // Update main variables.
            const populationCommonersNext = Math.max(0, populationCommoners + dt * (
                populationCommoners * (params.birthRateCommoners - deathRateCommoners)));
            const populationElitesNext = Math.max(0, populationElites + dt * (
                populationElites * (params.birthRateElites - deathRateElites)));
            const natureNext = Math.max(0, nature + dt * (
                params.regenerationFactor * nature * (params.natureCapacity - nature)
                - params.depletionPerWorker * populationCommoners * nature));
            const wealthNext = Math.max(0, wealth + dt * (
                params.depletionPerWorker * populationCommoners * nature
                - commonersConsumption
                - elitesConsumption));
            populationCommoners = populationCommonersNext;
            populationElites = populationElitesNext;
            nature = natureNext;
            wealth = wealthNext;

            recordPopulationCommoners.push(populationCommoners);
            recordPopulationElites.push(populationElites);
            recordNature.push(nature);
            recordWealth.push(wealth);
            recordTime.push(Math.round(i));
        }

        const {normalized: normalizedCommoners, maximum: maximumPopulationCommoners} = this.normalize(recordPopulationCommoners);
        const {normalized: normalizedElites, maximum: maximumPopulationElites} = this.normalize(recordPopulationElites);
        const {normalized: normalizedNature} = this.normalize(recordNature);
        const {normalized: normalizedWealth} = this.normalize(recordWealth);

        // Un-normalize populations relative to one another.  FIXME: Wasteful, this transformation could be squashed with the default normalization.
        const maxPop = Math.max(maximumPopulationCommoners, maximumPopulationElites);
        const rescaledElites = normalizedElites.map((normalized: number) => normalized * maximumPopulationElites / maxPop);
        const rescaledCommoners = normalizedCommoners.map((normalized: number) => normalized * maximumPopulationCommoners / maxPop);

        // TODO: This is a pity, we're about to reduce data points from the oversampled simulation output,
        // to speed up rendering.  Ideally we could show a debounce(100ms) outline of the curves while
        // dragging a control, then do a final render on endDrag at full resolution.
        const dataPoints = 300;
        const skipFilter = (element: number, index: number) => index % (params.yearsToModel / dataPoints);

        //const endMark = performance.now();
        // console.debug('Simulation ran in', endMark - startMark, 'ms');

        return {
            datasets: [
                rescaledCommoners.filter(skipFilter),
                rescaledElites.filter(skipFilter),
                normalizedNature.filter(skipFilter),
                normalizedWealth.filter(skipFilter),
            ],
        };
    }
}
