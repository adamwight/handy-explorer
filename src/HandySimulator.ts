export class HandySimulator {
    private birthRateCommoners: number;
    private birthRateElites: number;
    private depletionPerWorker: number;
    private inequalityFactor: number;
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
        // FIXME: This minimum consumption is a guess taken from another non-author's HANDY implementation.
        const minimumRequiredConsumptionPerCapita = 0.005;
        const subsistenceSalaryPerCapita = 0.0005;
        const normalDeathRate = 0.0095;
        const famineDeathRate = 0.07;
        const natureCapacity = 100.0;
        const regenerationFactor = 0.01;

        let populationCommoners = 100.0;
        let populationElites = 1.0;
        let nature = 100.0;
        let wealth = 0.0;

        let recordPopulationCommoners: number[] = [];
        let recordPopulationElites: number[] = [];
        let recordNature: number[] = [];
        let recordWealth: number[] = [];
        let maximumPopulationCommoners: number;
        let maximumPopulationElites: number;
        let maximumNature: number;
        let maximumWealth: number;

        console.log('Begin sim:',
            nature,
            regenerationFactor,
            natureCapacity,
            populationCommoners);

        // TODO: make dt configurable.
        for (let i = 0; i < 300; i++) {
            // Derived variables.
            const wealthThreshold = minimumRequiredConsumptionPerCapita
                * (populationCommoners + this.inequalityFactor * populationElites);
            const commonersConsumption = Math.min(1, wealth / wealthThreshold)
                * subsistenceSalaryPerCapita * populationCommoners;
            const elitesConsumption = Math.min(1, wealth / wealthThreshold)
                * this.inequalityFactor * subsistenceSalaryPerCapita * populationElites;
            // TODO: Should show when we hit the logistic section.
            const deathRateCommoners = normalDeathRate
                + Math.max(0, 1 - commonersConsumption / (subsistenceSalaryPerCapita * populationCommoners))
                    * (famineDeathRate - normalDeathRate);
            const deathRateElites = normalDeathRate
                + Math.max(0, 1 - elitesConsumption / (subsistenceSalaryPerCapita * populationElites))
                * (famineDeathRate - normalDeathRate);

            // console.log(wealthThreshold, commonersConsumption, elitesConsumption, deathRateCommoners, deathRateElites);

            // Update main variables.
            populationCommoners = Math.max(0, populationCommoners
                + populationCommoners * (this.birthRateCommoners - deathRateCommoners));
            populationElites = Math.max(0, populationElites
                + populationElites * (this.birthRateElites - deathRateElites));
            nature = Math.max(0, nature
                + regenerationFactor * nature * (natureCapacity - nature)
                - this.depletionPerWorker * populationCommoners * nature);
            wealth = Math.max(0, wealth
                + this.depletionPerWorker * populationCommoners * nature
                - commonersConsumption
                - elitesConsumption);

            recordPopulationCommoners.push(populationCommoners);
            recordPopulationElites.push(populationElites);
            recordNature.push(nature);
            recordWealth.push(wealth);
        }

        // TODO: Clean up normalization.  Print scale for each line.
        function normalize(list: number[]): [number[], number] {
            const min = list.reduce(
                (previousValue: number, currentValue: number) => Math.min(previousValue, currentValue));
            const max = list.reduce(
                (previousValue: number, currentValue: number) => Math.max(previousValue, currentValue));

            return [
                list.map((unscaled: number) => (unscaled - min) / (max - min)),
                max,
            ];
        }
        [recordPopulationCommoners, maximumPopulationCommoners] = normalize(recordPopulationCommoners);
        [recordPopulationElites, maximumPopulationElites] = normalize(recordPopulationElites);
        [recordNature, maximumNature] = normalize(recordNature);
        [recordWealth, maximumWealth] = normalize(recordWealth);

        // TODO: decouple return format from chart.js
        return {
            labels: Array.from(Array(300).keys()),
            datasets: [
                {
                    label: 'Commoners population (max ' + Math.round(maximumPopulationCommoners) + ')',
                    data: recordPopulationCommoners,
                    borderColor: 'rgb(255,0,0)',
                    backgroundColor: 'rgb(255,0,0)',
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: 'Elites population (max ' + Math.round(maximumPopulationElites) + ')',
                    data: recordPopulationElites,
                    borderColor: 'rgb(0,0,255)',
                    backgroundColor: 'rgb(0,0,255)',
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: 'Nature',
                    data: recordNature,
                    borderColor: 'rgb(0,255,0)',
                    backgroundColor: 'rgb(0,255,0)',
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: 'Wealth',
                    data: recordWealth,
                    borderColor: 'rgb(255,255,0)',
                    backgroundColor: 'rgb(255,255,0)',
                    fill: false,
                    pointRadius: 0,
                },
            ],
        };
    }
}
