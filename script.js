const graph = document.getElementById("expense-results");
const income = document.getElementById("income-input");
const expenses = document.getElementById("expense-input");
const form = document.getElementById("expenses-form");

let expensesChart;
let incomeToExpensesChart; 

form.addEventListener("submit",(e) => {
    e.preventDefault();

    const expenseRegex = /^\d+(\.\d+)?(,\d+(\.\d+)?)*$/;
    const incomeRegex =  /^\d+(\.\d+)?$/;
    if (expenseRegex.test(expenses.value) && incomeRegex.test(income.value)) {
        let expenseArr = expenses.value.split(",").map(Number);
        let incomeVal = Number(income.value);

        let maxExpense  = Math.max(...expenseArr);
        let result = incomeVal - maxExpense;
        let resultPar = document.createElement("p");
        let currencyInputVal = document.getElementById("currency").value;
        resultPar.innerText = `According to your data, your maximum expense is ${result} ${currencyInputVal.trim().length > 0 ? currencyInputVal : "" } away from reaching your income!`
        document.getElementById("result-div").appendChild(resultPar);
        let remainingArr = expenseArr.map(exp => incomeVal - exp);
        if (expensesChart) expensesChart.destroy();
        if (incomeToExpensesChart) incomeToExpensesChart.destroy();

        expensesChart = new Chart(graph, {
            type:'bar',
            data: {
                labels: expenseArr.map((_, i) => `Expense ${i + 1}`),
                datasets: [{
                    label: 'Expenses',
                    data: expenseArr,
                    backgroundColor: 'blue',
                    borderColor: 'black',
                    borderWidth: 1,
                    type: 'bar',
                    fill: false
                
                }]
            },

            options: {
                scales: {
                    x: {
                        ticks: { color: 'white' },
                        grid: { color: 'white' }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: 'white' },
                        grid: { color: 'white' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: 'white' }
                    }
                }
            }
        });
        
        const avgExpense = expenseArr.reduce((a, b) => a + b, 0) / expenseArr.length;
        const lineLabels = expenseArr.map((_, i) => `Expense ${i + 1}`);

incomeToExpensesChart = new Chart(document.getElementById("income-to-expenses-results"), {
    type: 'bar',
    data: {
        labels: ['Income vs Avg Expense'],
        datasets: [
            {
                label: 'Income',
                data: [incomeVal],
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1
            },
            {
                label: 'Average Expense',
                data: [avgExpense],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'white' }
            },
            y: {
                beginAtZero: true,
                ticks: { color: 'white' },
                grid: { color: 'white' }
            }
        },
        plugins: {
            legend: {
                labels: { color: 'white' }
            },
            title: {
                display: true,
                text: 'Income vs Average Expense',
                color: 'white',
                font: {
                    size: 16
                }
            }
        }
    }
});

    } else {
        alert("Please enter a valid income (e.g. 1000) and expenses (e.g. 10,20,30)")
    }

        
});
