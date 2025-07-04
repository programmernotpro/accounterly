const graph = document.getElementById("expense-results");
const income = document.getElementById("income-input");
const expenses = document.getElementById("expense-input");
const form = document.getElementById("expenses-form");

let chart; 

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
        if (chart) chart.destroy();

        chart = new Chart (graph, {
            type:'bar',
            data: {
                labels: expenseArr.map((_, i) => `Expense ${i + 1}`),
                datasets: [{
                    label:'Income',
                    data:Array(expenseArr.length).fill(incomeVal),
                    type:'line',
                    borderColor:'red',
                    borderWidth: 4, 
                    pointRadius:0,
                    fill:false
                },
                {
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
                    y: {
                        beginAtZero:true
                    }
                }
            }

        });

        if (incomeVal > expenses.value){
            const comparisonPar = document.createElement("p")

        }
        


    } else {
        alert("Please enter a valid income (e.g. 1000) and expenses (e.g. 10,20,30)")
    }

        
});
