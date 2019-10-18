export class HandySimulator {
    private birthRateCommoners: number;
    private birthRateElites: number;
    private regenerationFactor: number = 0;
    private natureCapacity: number = 0;
    private depletionPerWorker: number = 0;
    constructor(
        birthRateCommoners: number,
        birthRateElites: number,
        regenerationFactor: number,
        natureCapacity: number,
        depletionPerWorker: number,
    ) {
        this.birthRateCommoners = birthRateCommoners;
        this.birthRateElites = birthRateElites;
        this.regenerationFactor = regenerationFactor;
        this.natureCapacity = natureCapacity;
        this.depletionPerWorker = depletionPerWorker;
    }

    // TODO: type for parametric deltas and type for snapshot of parameters

    public runSimulation(): object {
        const minimumRequiredConsumptionPerCapita = 1.0;
        const inequalityFactor = 10.0;
        const subsistenceSalaryPerCapita = 0.0005;
        const normalDeathRate = 0.0095;
        const famineDeathRate = 0.07;

        let populationCommoners = 100.0;
        let populationElites = 1.0;
        let nature = 100.0;
        let wealth = 0.0;

        const recordPopulationCommoners: number[] = [];
        const recordPopulationElites: number[] = [];
        const recordNature: number[] = [];
        const recordWealth: number[] = [];

        // TODO: make dt configurable.
        for (let i = 0; i < 300; i++) {
            // Derived variables.
            const wealthThreshold = minimumRequiredConsumptionPerCapita
                * (populationCommoners + inequalityFactor * populationElites);
            const commonersConsumption = Math.min(1, wealth / wealthThreshold)
                * subsistenceSalaryPerCapita * populationCommoners;
            const elitesConsumption = Math.min(1, wealth / wealthThreshold)
                * inequalityFactor * subsistenceSalaryPerCapita * populationElites;
            const deathRateCommoners = normalDeathRate
                + Math.max(0, 1 - commonersConsumption / (subsistenceSalaryPerCapita * populationCommoners))
                    * (famineDeathRate - normalDeathRate);
            const deathRateElites = normalDeathRate
                + Math.max(0, 1 - elitesConsumption / (subsistenceSalaryPerCapita * populationElites))
                * (famineDeathRate - normalDeathRate);

            // Update main variables.
            populationCommoners = populationCommoners
                + populationCommoners * (this.birthRateCommoners - deathRateCommoners);
            populationElites = populationElites
                + populationElites * (this.birthRateElites - deathRateElites);
            nature = this.regenerationFactor * nature * (this.natureCapacity - nature)
                - this.depletionPerWorker * populationCommoners * nature;
            wealth = this.depletionPerWorker * populationCommoners * nature - commonersConsumption - elitesConsumption;

            recordPopulationCommoners.push(populationCommoners);
            recordPopulationElites.push(populationElites);
            recordNature.push(nature);
            recordWealth.push(wealth);
        }
        // TODO: decouple return format from chart.js
        return {
            labels: Array.from(Array(300).keys()),
            datasets: [
                {
                    label: 'Commoners population',
                    data: recordPopulationCommoners,
                },
                {
                    label: 'Elites population',
                    data: recordPopulationElites,
                },
                {
                    label: 'Nature',
                    data: recordNature,
                },
                {
                    label: 'Wealth',
                    data: recordWealth,
                },
            ],
        };
    }
}
