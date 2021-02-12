import { SimulationParameters } from "@/store/SimulationParameters";

export default class {

    // TODO: type for parametric deltas and type for snapshot of parameters
    public runSimulation(params: SimulationParameters): object {
        const startMark = performance.now();
        // TODO: const dataPoints = 100;
        // FIXME: Changing dt makes the model unstable.
        const dt = 1;

        let populationCommoners = params.initialPopulationCommoners;
        let populationElites = params.initialPopulationElites;
        let nature = 100;
        let wealth = 0;

        let recordPopulationCommoners: number[] = [];
        let recordPopulationElites: number[] = [];
        let recordNature: number[] = [];
        let recordWealth: number[] = [];
        const recordTime: number[] = [];
        let maximumPopulationCommoners: number;
        let maximumPopulationElites: number;
        let maximumNature: number;
        let maximumWealth: number;

        for (let i = 0; i < params.yearsToModel; i += dt) {
            // Derived variables.
            const wealthThreshold = params.minimumRequiredConsumptionPerCapita
                * (populationCommoners + params.inequalityFactor * populationElites);
            const commonersConsumption = Math.min(1, wealth / wealthThreshold)
                * params.subsistenceSalaryPerCapita * populationCommoners;
            const elitesConsumption = Math.min(1, wealth / wealthThreshold)
                * params.inequalityFactor * params.subsistenceSalaryPerCapita * populationElites;
            // TODO: Should show periods of famine on the graph.
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

        // TODO: Clean up normalization.  Print scale for each line.
        function normalize(list: number[]): [number[], number] {
            const max = list.reduce(
                (previousValue: number, currentValue: number) => Math.max(previousValue, currentValue));

            return [
                list.map((unscaled: number) => unscaled / max),
                max,
            ];
        }
        [recordPopulationCommoners, maximumPopulationCommoners] = normalize(recordPopulationCommoners);
        [recordPopulationElites, maximumPopulationElites] = normalize(recordPopulationElites);
        [recordNature, maximumNature] = normalize(recordNature);
        [recordWealth, maximumWealth] = normalize(recordWealth);

        // Un-normalize populations relative to one another.  FIXME: Wasteful.
        const maxPop = Math.max(maximumPopulationCommoners, maximumPopulationElites);
        recordPopulationElites = recordPopulationElites.map((normalized: number) => normalized * maximumPopulationElites / maxPop);
        recordPopulationCommoners = recordPopulationCommoners.map((normalized: number) => normalized * maximumPopulationCommoners / maxPop);

        // TODO: This is a pity, we're about to reduce data points from the oversampled simulation output,
        // to speed up rendering.  Ideally we could show a debounce(100ms) outline of the curves while
        // dragging a control, then do a final render on endDrag at full resolution.
        const dataPoints = 300;
        const skipFilter = (element: any, index: number) => index % (params.yearsToModel / dataPoints);

        const endMark = performance.now();
        // console.debug('Simulation ran in', endMark - startMark, 'ms');

        // TODO: decouple return format from chart.js
        return {
            // TODO: Only needs a handful of labels to give the scale.
            labels: recordTime.filter(skipFilter),
            datasets: [
                {
                    label: 'Commoners population (max ' + Math.round(maximumPopulationCommoners) + ')',
                    data: recordPopulationCommoners.filter(skipFilter),
                    borderColor: 'rgb(255,0,0)',
                    backgroundColor: 'rgb(255,0,0)',
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: 'Elites population (max ' + Math.round(maximumPopulationElites) + ')',
                    data: recordPopulationElites.filter(skipFilter),
                    borderColor: 'rgb(0,0,255)',
                    backgroundColor: 'rgb(0,0,255)',
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: 'Nature',
                    data: recordNature.filter(skipFilter),
                    borderColor: 'rgb(0,255,0)',
                    backgroundColor: 'rgb(0,255,0)',
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: 'Wealth',
                    data: recordWealth.filter(skipFilter),
                    borderColor: 'rgb(255,255,0)',
                    backgroundColor: 'rgb(255,255,0)',
                    fill: false,
                    pointRadius: 0,
                },
            ],
        };
    }
}
