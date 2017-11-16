import Chart from 'chart.js'
export default {
    install(V) {
        V.prototype.$Chart = Chart
    }
}