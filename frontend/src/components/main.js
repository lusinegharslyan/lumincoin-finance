import Chart from 'chart.js/auto';
import {AuthUtils} from "../utils/auth-utils";
import {CommonUtils} from "../utils/common-utils";
import {OperationsService} from "../services/operations-service";
import config from "../config/config";

export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.findElements();
        this.initIntervalToolbar().then();
        this.getOperations().then();
    }

    findElements() {
        this.incomeChartElement = document.getElementById('incomes-chart');
        this.expansesChartElement = document.getElementById('expenses-chart');
        this.intervalToolbar = document.getElementById('interval-toolbar');
    }

    async getOperations(period = 'today', dateFrom = null, dateTo = null) {
        const response = await OperationsService.getOperations(period, dateFrom, dateTo);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        await this.calculateCharts(response.operations);
    }

    async calculateCharts(operations) {
        const groupedOperations = this.getGroupedOperations(operations);
        this.init(this.incomeChartElement, groupedOperations.incomes)
        this.init(this.expansesChartElement, groupedOperations.expenses)

    }

    getGroupedOperations(operations) {
        const incomeOperations = operations.filter((operation) => {
            return operation.type === config.operationTypes.income
        });
        const expenseOperations = operations.filter((operation) => {
            return operation.type === config.operationTypes.expense
        });
        const groupedIncomes = this.getGroupedCategoriesAndTotals(incomeOperations);
        const groupedExpenses = this.getGroupedCategoriesAndTotals(expenseOperations);
        return {
            incomes: groupedIncomes,
            expenses: groupedExpenses,
        }
    }

    getGroupedCategoriesAndTotals(operations) {
        return Object.entries(
            operations.reduce((acc, operation) => {
                const category = operation.category;

                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += operation.amount;
                return acc;
            }, {})
        ).map(([category, total]) => ({category, total}));
    }

    async initIntervalToolbar() {
        const intervalsBlock = CommonUtils.generateIntervalsBlock();
        this.intervalToolbar.appendChild(intervalsBlock);
        const toolbarButtons = this.intervalToolbar.querySelectorAll('button');
        const customIntervalToolbar = document.getElementById('custom-date-interval');
        const dateInputs = customIntervalToolbar.querySelectorAll('input');
        const intervalDateFromElement = document.getElementById('interval-start-date');
        const intervalDateToElement = document.getElementById('interval-end-date');
        dateInputs.forEach(input => {
            input.addEventListener('input', async() => {
                  await this.getOperations('interval', intervalDateFromElement.value, intervalDateToElement.value);
            })
        })

        toolbarButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                toolbarButtons.forEach(buttonEl => {
                    buttonEl.classList.remove('selected');
                });

                const clickedButton = e.currentTarget;
                clickedButton.classList.add('selected');
                if (clickedButton.id === 'interval') {
                    customIntervalToolbar.style.display = 'flex';
                } else {
                    customIntervalToolbar.style.display = 'none';
                    await this.getOperations(clickedButton.id);
                }
            });
        });
    }

    init(chartElement, operations) {
        const existingChart = Chart.getChart(chartElement);
        if (existingChart) {
            existingChart.destroy();
        }
        const labels = operations.map(x => x.category).slice();
        const amounts = operations.map(x => Number(x.total)).slice();
        const bgColors = labels.map((_, i) => {
            const hue = (i * 360) / labels.length;
            return `hsl(${hue}, 70%, 60%)`;
        });

        new Chart(chartElement, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Сумма',
                    data: amounts,
                    backgroundColor: bgColors,
                    hoverOffset: 4
                }]
            }
        });
    }
}