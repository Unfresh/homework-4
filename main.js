'use strict';

let money,
    time;

// Бюджет на месяц...............
function start () {
    money = +prompt("Ваш бюджет на месяц?");
    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
    }
    time = prompt("Введите дату в формате YYYY-MM-DD", "2020-10-05");
}
// ...............Бюджет на месяц

start();

let appData = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let monthCost = prompt("Введите стятью расходов в этом месяце"),
                totalCost = +prompt("Во сколько обойдется?");
                if ( (typeof(monthCost) === 'string') && (monthCost != ' ') && (totalCost != ' ') && (typeof(monthCost) != null) && (typeof(totalCost) != null) && monthCost.length !== 0) {
                    console.log("Прошла запись");
                    appData.expenses[monthCost] = totalCost;
                } else {
                    alert('Введены неверные данные. Начнем заново.');
                    i--;
                }
        }
    },
    detectDayBudget: function() {
        let costPerDay = +(money/30).toFixed();
        appData.moneyPerDay = costPerDay;
        alert("Ежедневный бюджет: " + costPerDay);
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            alert("У вас минимальный уровень достатка");
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 1000) {
            alert("У вас средний уровень достатка");
        } else if (appData.moneyPerDay >= 1000) {
            alert("У вас высокий уровень достатка");
        } else {
            alert("Что то пошло не так");
        }
    },
    checkSavings: function() {
        let deposit = confirm("Есть ли у вас накопления?");
        if (deposit) {
            appData.savings = deposit;
            if(appData.savings) {
                let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");
                appData.monthIncome = +(save/100/12*percent).toFixed();
                alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
            }
        } else {
        alert("У вас нету подушки безопасности.");
        }
    },
    chooseOptExpenses: function() {
        for (let i = 1; i < 4; i++) {
            let otherCosts = prompt("Статья необязательных расходов");
            let numberQuest = i;
            if ( (typeof(otherCosts) === 'string') && (typeof(otherCosts) != null) && (otherCosts != " ") ) {
                appData.optionalExpenses[numberQuest] = otherCosts;
            } else {
                alert("Произошел сбой.... Попробуйте снова.");
                i--;
            }
        }
    },
    chooseIncome: function() {
        let items = prompt('Какой дополнительный доход у вас есть? (Перечислите через запятую)', '');
        let cloneItems;
        if ( (typeof(items) === 'string') ) {
            cloneItems = items
            items = +items;
            if(isNaN(items)) {
                items = cloneItems;
                appData.income = items.split(', ');
            } else {
                alert('Введена неверная информация, попробуйте снова.');
                this.chooseIncome ();
            }
        } else {
            alert('Введена неверная информация, попробуйте снова.');
            this.chooseIncome ();
        }

        let addItems = prompt('Может что то еще?');
        if ( (typeof(addItems) === 'string') && (typeof(addItems) != null) && (addItems !== " ") && (addItems.length !== 0) ) {
            console.log('проверка на доп данные');
            appData.income.push(addItems);
            appData.income.sort();
        } else {
            console.log('проверка на пустоту');
            appData.income.sort();
            return;
        }

        appData.income.forEach(function(elem, i ) {
            alert('Способы доп. заработка: ' + (++i) + ') ' + elem);
        });
    }
};

console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
    // список данных ключей
    console.log('- ' + key);

    //список данных ключ + значение
    // console.log(appData[key]);
}
