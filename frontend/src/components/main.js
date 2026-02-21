import Chart from 'chart.js/auto';

export class Main {
    constructor() {
        this.findElements();
        this.init();
    }

    findElements() {
        this.incomeChartElement = document.getElementById('incomes-chart');
        this.expansesChartElement = document.getElementById('expenses-chart');
    }

    init() {
        const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
        const bgColors = ['#DC3545', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD',];
        new Chart(this.incomeChartElement, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100, 80, 200],
                    backgroundColor: bgColors,
                    hoverOffset: 4
                }]
            }
        });
        new Chart(this.expansesChartElement, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: [30, 150, 90, 300, 200],
                    backgroundColor: bgColors,
                    hoverOffset: 4
                }]
            }
        })
    }
}