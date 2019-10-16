export class HandySimulator {
    private param1: number;
    constructor(param1: number) {
        this.param1 = param1;
    }

    public runSimulation(): object {
        // TODO: decouple return format from chart.js
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data One',
                    data: [40, 39, 10, 40, 39, 80, 40].map((val) => val + this.param1),
                },
                {
                    label: 'Data Two',
                    data: [60, 55, 32, 10, 2, 12, 53],
                },
            ],
        };
    }
}
