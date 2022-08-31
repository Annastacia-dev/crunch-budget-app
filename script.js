document.addEventListener("DOMContentLoaded", () =>{



    const expensesForm = document.querySelector('#expenses')
    const categoryErrorMessage = document.querySelector('#expenses-category-error')
    const amountErrorMessage = document.querySelector('#expenses-amount-error')
    const expensesButton = document.querySelector('#expenses-button')
    const expensesCategory = document.querySelector('#expenses-name')
    const expensesAmount = document.querySelector('#expenses-amount')
    const expensesList = document.querySelector('#expenses-list')
    const totalExpensesAmount = document.querySelector('#total-expenses-amount')
    const balanceAmount = document.querySelector('#balance-amount')
    let total;
    
    
    
    // Submit data from form to outputs Total expenses and Balance the append the expense category to expense list
    expensesButton.addEventListener('click', addToList)
    
    function addToList(e){
        e.preventDefault()
    
        // Condition to ensure expense amount is not empty or less than 0
    
        if(expensesAmount.value < 0 || expensesAmount.value === '' ){
            amountErrorMessage.classList.remove('hide')
        }else {
            amountErrorMessage.classList.add('hide')
            calculateExpenses()
            }
    
        // Fetch income from income.json
    
        const incomeLink = 'http://localhost:3000/income'
    
        const totalIncome = fetch(incomeLink)
        .then(res => res.json())
        .then (json => {
            let incomeAmount = Object.values(json)
            const reducer = (accumulator, curr) => accumulator + curr;
            let totalIncome= incomeAmount.reduce(reducer)
            // console.log(totalIncome)
            return totalIncome
        })
        const fetchAmount = () => {
            totalIncome.then((totalIncome) => {
                balanceAmount.innerHTML=totalIncome - calculateExpenses()
            //   console.log(totalIncome);
            });
        };
        fetchAmount()
       
    // Accumulate prices of expenses
    
    function calculateExpenses(){
                let expense = parseInt(expensesAmount.value)
                let total = parseInt(totalExpensesAmount.innerHTML) + expense;
                return total;
            }
            // console.log(calculateExpenses())
        
            // Display accumulated prices
        totalExpensesAmount.innerHTML = calculateExpenses()
            
        // Condition to check that expense category name is not empty
        if(expensesCategory.value === 0 || expensesCategory.value === ''){
            categoryErrorMessage.classList.remove('hide')
        }else {
                appendExpense()
            }
        
            // Append expense category name to expenses list
        function appendExpense(){
            categoryErrorMessage.classList.add('hide')
            const list = document.createElement('li')
            list.textContent = expensesCategory.value
            expensesList.appendChild(list);
        }
        }
    })

