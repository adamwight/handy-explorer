export interface SimulationParameters {
    birthRateCommoners: number;
    birthRateElites: number;
    inequalityFactor: number;
    depletionPerWorker: number;
}

export const initialParams: SimulationParameters = {
    birthRateCommoners: 0.03,
    birthRateElites: 0.03,
    inequalityFactor: 10,
    // FIXME: depletion figure is a stolen guess.
    depletionPerWorker: 0.000007,
};
