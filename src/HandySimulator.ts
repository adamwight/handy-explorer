export class HandySimulator {
    private birthRateCommoners: number;
    private birthRateElites: number;
    private inequalityFactor: number;
    private depletionPerWorker: number;
    constructor(
        birthRateCommoners: number,
        birthRateElites: number,
        inequalityFactor: number,
        depletionPerWorker: number,
    ) {
        this.birthRateCommoners = birthRateCommoners;
        this.birthRateElites = birthRateElites;
        this.inequalityFactor = inequalityFactor;
        this.depletionPerWorker = depletionPerWorker;
    }

    // TODO: type for parametric deltas and type for snapshot of parameters
    public runSimulation(): object {
        const startMark = performance.now();
        // FIXME: This minimum consumption is a guess taken from other non-authors' HANDY
        // implementations.  But why would it be higher than the subsistence salary?  Are
        // they on different scales?
        const minimumRequiredConsumptionPerCapita = 0.005;
        const subsistenceSalaryPerCapita = 0.0005;
        const normalDeathRate = 0.0095;
        const famineDeathRate = 0.07;
        const natureCapacity = 100.0;
        const regenerationFactor = 0.01;
        const yearsToModel = 600;
        // TODO: const dataPoints = 100;
        // FIXME: Changing dt makes the model unstable.
        const dt = 1;

        let populationCommoners = 100;
        let populationElites = 1;
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

        for (let i = 0; i < yearsToModel; i += dt) {
            // Derived variables.
            const wealthThreshold = minimumRequiredConsumptionPerCapita
                * (populationCommoners + this.inequalityFactor * populationElites);
            const commonersConsumption = Math.min(1, wealth / wealthThreshold)
                * subsistenceSalaryPerCapita * populationCommoners;
            const elitesConsumption = Math.min(1, wealth / wealthThreshold)
                * this.inequalityFactor * subsistenceSalaryPerCapita * populationElites;
            // TODO: Should show periods of famine on the graph.
            const deathRateCommoners = normalDeathRate
                + Math.max(0, 1 - commonersConsumption / (subsistenceSalaryPerCapita * populationCommoners))
                    * (famineDeathRate - normalDeathRate);
            const deathRateElites = normalDeathRate
                + Math.max(0, 1 - elitesConsumption / (subsistenceSalaryPerCapita * populationElites))
                * (famineDeathRate - normalDeathRate);

            // Update main variables.
            const populationCommonersNext = Math.max(0, populationCommoners + dt * (
                populationCommoners * (this.birthRateCommoners - deathRateCommoners)));
            const populationElitesNext = Math.max(0, populationElites + dt * (
                populationElites * (this.birthRateElites - deathRateElites)));
            const natureNext = Math.max(0, nature + dt * (
                regenerationFactor * nature * (natureCapacity - nature)
                - this.depletionPerWorker * populationCommoners * nature));
            const wealthNext = Math.max(0, wealth + dt * (
                this.depletionPerWorker * populationCommoners * nature
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

        // TODO: This is a pity, we're about to reduce data points from the oversampled simulation output,
        // to speed up rendering.  Ideally we could show a debounce(100ms) outline of the curves while
        // dragging a control, then do a final render on endDrag at full resolution.
        const dataPoints = 300;
        const skipFilter = (element: any, index: number) => index % (yearsToModel / dataPoints);

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
