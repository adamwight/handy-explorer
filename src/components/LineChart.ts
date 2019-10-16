import Vue from 'vue';
import {Component, Mixins} from 'vue-property-decorator';
import { Line, mixins } from 'vue-chartjs';


@Component({
    extends: Line,
})
export default class LineChart extends Mixins(Line) {
    private mounted() {
        this.renderChart(
            {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#FC2525',
                        data: [40, 39, 10, 40, 39, 80, 40],
                    },
                    {
                        label: 'Data Two',
                        backgroundColor: '#05CBE1',
                        data: [60, 55, 32, 10, 2, 12, 53],
                    },
                ],
            },
            {
                responsive: true,
                maintainAspectRatio: false,
            },
        );
    }
}
