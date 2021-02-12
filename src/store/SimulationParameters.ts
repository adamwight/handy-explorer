export interface SimulationParameters {
    birthRateCommoners: number;
    birthRateElites: number;
    inequalityFactor: number;
    depletionPerWorker: number;
    minimumRequiredConsumptionPerCapita: number;
    subsistenceSalaryPerCapita: number;
    normalDeathRate: number;
    famineDeathRate: number;
    natureCapacity: number;
    regenerationFactor: number;
    yearsToModel: number;
    initialPopulationCommoners: number;
    initialPopulationElites: number;
}

export const initialParams: SimulationParameters = {
    birthRateCommoners: 0.03,
    birthRateElites: 0.03,
    inequalityFactor: 10,
    // FIXME: depletion figure is a stolen guess.
    depletionPerWorker: 0.000007,
    // FIXME: This minimum consumption is a guess taken from other non-authors' HANDY
    // implementations.  But why would it be higher than the subsistence salary?  Are
    // they on different scales?
    minimumRequiredConsumptionPerCapita: 0.005,
    subsistenceSalaryPerCapita: 0.0005,
    normalDeathRate: 0.0095,
    famineDeathRate: 0.07,
    natureCapacity: 100.0,
    regenerationFactor: 0.01,
    yearsToModel: 600,
    initialPopulationCommoners: 100,
    initialPopulationElites: 1,
};
