import Vue from 'vue';
import App from './App.vue';
import LineChart from './components/LineChart';
import router from './router';

Vue.config.productionTip = false;

Vue.component('line-chart', LineChart);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

/*
components: {
    'line-chart': LineChart,
},
 */
