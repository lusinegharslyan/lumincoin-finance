const host = "http://localhost:3000";
const config = {
    host: host,
    api: host + '/api',
    operationTypes: {
        income: 'income',
        expense: 'expense',
    },
    intervals: [
        {
            interval: 'today',
            label: 'Сегодня',
        },
        {
            interval: 'week',
            label: 'Неделя',
        },
        {
            interval: 'month',
            label: 'Месяц',
        },
        {
            interval: 'year',
            label: 'Год',
        },
        {
            interval: 'all',
            label: 'Все',
        },
        {
            interval: 'interval',
            label: 'Интервал',
        },
    ]

}
export default config;