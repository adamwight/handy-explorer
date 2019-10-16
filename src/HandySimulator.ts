export class HandySimulator {
    private birthRateCommoners: number;
    private birthRateElites: number;
    constructor(birthRateCommoners: number, birthRateElites: number) {
        this.birthRateCommoners = birthRateCommoners;
        this.birthRateElites = birthRateElites;
    }

    public runSimulation(): object {
        // TODO: decouple return format from chart.js
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data One',
                    data: [40, 39, 10, 40, 39, 80, 40].map((val) => val + this.birthRateCommoners - this.birthRateElites),
                },
                {
                    label: 'Data Two',
                    data: [60, 55, 32, 10, 2, 12, 53],
                },
            ],
        };
    }
}
