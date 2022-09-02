document.addEventListener("DOMContentLoaded", () =>{



    
    const categoryErrorMessage = document.querySelector('#expenses-category-error')
    const amountErrorMessage = document.querySelector('#expenses-amount-error')
    const expensesButton = document.querySelector('#expenses-button')
    const expensesCategory = document.querySelector('#expenses-name')
    const expensesAmount = document.querySelector('#expenses-amount')
    const expensesList = document.querySelector('#expenses-list')
    const amountList = document.querySelector('#amount-list')
    const totalExpensesAmount = document.querySelector('#total-expenses-amount')
    const balanceAmount = document.querySelector('#balance-amount')
    
    
    
    
    // Submit data from form to outputs Total expenses and Balance the append the expense category to expense list
    expensesButton.addEventListener('click', addToList)
    
    function addToList(e){
        e.preventDefault()
        
    
        // Condition to ensure expense amount is not empty or less than 0 then append amount to list
    
        if(expensesAmount.value < 0 || expensesAmount.value === '' ){
            amountErrorMessage.classList.remove('hide')
        }else {
            amountErrorMessage.classList.add('hide')
            const amount = document.createElement('p')
            amount.textContent = `${expensesAmount.value}`
            amountList.appendChild(amount);
            calculateExpenses()
            
            
            }
        // Fetch income from income.json
    
        const incomeLink = 'https://annastacia-dev.github.io/income-api/income.json'
       
    
        const totalIncome = fetch(incomeLink)
        .then(res => res.json())
        .then (json => {
            let objectArray = json.income
            let incomeAmount = Object.values(objectArray)
           
            const reducer = (accumulator, curr) => accumulator + curr;
            let totalIncome= incomeAmount.reduce(reducer)
            
            return totalIncome
        })
        const fetchAmount = () => {
            totalIncome.then((totalIncome) => {
                balanceAmount.innerHTML=totalIncome - totalExpensesAmount.innerHTML
                expensesAmount.value = ''
                if (balanceAmount.innerHTML < 0){
                    alert('Your income has run out')
                    balanceAmount.innerHTML = 'error'
                    totalExpensesAmount.innerHTML = 'error'
                }
            
            });
        };
        fetchAmount()
       
    // Accumulate prices of expenses
    
    function calculateExpenses(){
                let expense = parseInt(expensesAmount.value)
                let total = parseInt(totalExpensesAmount.innerHTML) + expense;
                return total;
            }
            
        
            // Display accumulated prices
        totalExpensesAmount.innerHTML = calculateExpenses()
        
            
        // Condition to check that expense category name is not empty
        if( /^[a-zA-Z]+$/.test(expensesCategory.value) === false || expensesCategory.value === ''){
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
            expensesCategory.value = ''
            
        }
        
        }
    })

