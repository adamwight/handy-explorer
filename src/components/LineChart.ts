import { Component, Mixins, Prop } from 'vue-property-decorator';
import { Line, mixins } from 'vue-chartjs';


@Component({
    extends: Line,
    mixins: [ mixins.reactiveProp ],
    props: [ 'chartData', 'options' ],
})
export default class LineChart extends Mixins(Line) {
    @Prop() private chartData!: object;
    @Prop() private options!: object;
    private mounted() {
        this.renderChart(this.chartData, this.options);
    }
}
