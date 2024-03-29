var monthlyMillisecondValue = 300000;

var yearlyMillisecondValue = monthlyMillisecondValue * 12;

var dailyMillisecondValue = monthlyMillisecondValue / 30;

var day_counter = 0;
var currentMonth = 1; // Assuming January as the starting month
var currentYear = 0;

var suspiciousIncomeCounter = 0;

function dailyUpdate() {

  console.log("DAILY FIRE")

  day_counter++;
  if (day_counter % 7 === 0) {
    sendTradeOffers();
  }

  if (day_counter % 5 == 0) {
    decideWeather();
  }

  player.income = 0;

  // Define the number of times to run scams in a day
  var dailyScamRuns = 5;

  for (var i = 0; i < dailyScamRuns; i++) {
    for (var key in scamOptions) {
      // if the player owns the building, and the scam option is not "none", run the scam
      if (player.buildingsIndex.includes(key) && scamOptions[key] !== "none") {
        runScam(scamOptions[key]);
      }
    }
  }

  player.income = player.income + (player.income * player.modifierRate);


  document.getElementById('current_daily_income_display').innerHTML = `+ $${player.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/day`;
  document.getElementById('current_monthly_income_display').innerHTML = `$${((player.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) * 30).toFixed(2)}/mo.`;


  // keep track of the current day
  var currentDay = document.getElementById("calendar_day").innerHTML;
  var currentDayInt = parseInt(currentDay);

// if it's the last day of the month, reset the day to 1 and increment the month
if (currentDayInt >= 30) {
  currentDayInt = 1;
  currentMonth += 1;
  // if it's the last month of the year, reset the month to 1 and increment the year
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear += 1;
  }
} else {
  currentDayInt += 1;
}

// if it's the first day of the year, log it to the console
if (currentDayInt === 1 && currentMonth === 1) {

  beginTaxEvent();

}

  //update the calendar widget, make sure that there's at least two digits for the day
  document.getElementById("calendar_day").innerHTML = currentDayInt.toString().padStart(2, '0');
  // After running scams, add the income to dailyIncomeData
  dailyIncomeData.push(player.income);

  // Update the chart's data
  income_myChart.data.labels.push(`Day ${dailyIncomeData.length}`);
  income_myChart.data.datasets[0].data.push(player.income);

  modifierData.push(player.modifierRate);
  employeeData.push(player.employees);

  // Update the chart's data
  modifier_myChart.data.labels.push(`Day ${modifierData.length}`);
  modifier_myChart.data.datasets[0].data.push(player.modifierRate);
  modifier_myChart.data.datasets[1].data.push(player.employees);
  modifier_myChart.update();

  // Update the chart
  income_myChart.update();
  police.awareness += Math.random() * 0.5;
  dictatePoliceActions();

  if (player.income > 1000000) {
    suspiciousIncomeCounter+=1;
  }

  if (player.income > 500000) {
    suspiciousIncomeCounter+=0.5;
  }

  if (player.income < 500000) {
    suspiciousIncomeCounter-=1;
  }

  if (suspiciousIncomeCounter < 0) {
    suspiciousIncomeCounter = 0;
  }

  if (suspiciousIncomeCounter > 30) {
    sendMail('NOTICE OF ILLEGAL ACTIVITY', `YOU ARE BEING FINED. THIS IS A WARNING. Your business has been reported for illegal activity. You are being fined and are on notice. Please insure that this does not happen again.
    <button onclick = "updateBalance('subtract', 30000000);removeMail(this.parentElement)"><i style = "float:none!important;font-size:12px!important;" class="ri-money-dollar-circle-fill"></i> PAY FINE [$30M]</button>`);
  suspiciousIncomeCounter = 0;
  }

  if (suspiciousIncomeCounter > 15){
    sendMail('NOTICE OF SUSPICIOUS ACTIVITY', `THIS IS A WARNING. Your business has been reported for suspicious activity. You are on notice. Please insure that this does not happen again.`);
  }
  

}

function monthlyUpdate() {
  updateBalance("subtract", player.expenses);
  
  dictatePoliceActions();


  console.log("MONTHLY FIRE");
  notifyPlayer('EXPENSES PAID: $' + player.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

  // keep track of the current month
  var currentMonth = document.getElementById("calendar_month").innerHTML;
  var currentMonthInt = 0;

  // get the current month's index
  var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  for (var i = 0; i < months.length; i++) {
    if (currentMonth === months[i]) {
      currentMonthInt = i;
    }
  }

  // increment the month
  currentMonthInt += 1;
  if (currentMonthInt > 11) { // if it's December
    currentMonthInt = 0; // reset to January
    currentYear += 1; // increment the year
  }

  //update the calendar widget
  document.getElementById("calendar_month").innerHTML = months[currentMonthInt];
  resetCreditLineMonthly();
}

function secondlyUpdate() {
  // this function should add a percentage of the player's income to the player's balance every second.
  // basically, take the players income, divide it by the number of employees, and add that amount to the player's balance.

  if (player.employees > 0) {

    var income = player.income;

    var employees = player.employees;

    var incomePerEmployee = (income / employees) / 5;


    updateBalance("add", incomePerEmployee);
  }

  if (player.interns > 0) {
    var income = player.income;
    var interns = player.interns;
    var incomePerIntern = (income / interns) / 10;

    updateBalance("add", incomePerIntern);
  }

  if (player.money < 10000) {
    document.getElementById('hire_10_interns_button').style.opacity = "50%";
    document.getElementById('hire_10_interns_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_10_interns_button').style.opacity = "100%";
    document.getElementById('hire_10_interns_button').style.pointerEvents = "auto";
  }

  if (player.money < 50000) {
    document.getElementById('hire_50_interns_button').style.opacity = "50%";
    document.getElementById('hire_50_interns_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_50_interns_button').style.opacity = "100%";
    document.getElementById('hire_50_interns_button').style.pointerEvents = "auto";
  }

  if (player.money < 100000) {
    document.getElementById('hire_100_interns_button').style.opacity = "50%";
    document.getElementById('hire_100_interns_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_100_interns_button').style.opacity = "100%";
    document.getElementById('hire_100_interns_button').style.pointerEvents = "auto";
  }

  if (player.money < 30000) {
    document.getElementById('hire_10_employees_button').style.opacity = "50%";
    document.getElementById('hire_10_employees_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_10_employees_button').style.opacity = "100%";
    document.getElementById('hire_10_employees_button').style.pointerEvents = "auto";
  }

  if (player.money < 150000) {
    document.getElementById('hire_50_employees_button').style.opacity = "50%";
    document.getElementById('hire_50_employees_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_50_employees_button').style.opacity = "100%";
    document.getElementById('hire_50_employees_button').style.pointerEvents = "auto";
  }

  if (player.money < 300000) {
    document.getElementById('hire_100_employees_button').style.opacity = "50%";
    document.getElementById('hire_100_employees_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_100_employees_button').style.opacity = "100%";
    document.getElementById('hire_100_employees_button').style.pointerEvents = "auto";
  }

  
  // get all of the banks - bank1, bank2, bank3, bank4.
  // for each bank, compare its minimum credit score with the player's credit score.
  // if the player's is greater, log it to the console for now.
  // if the player's is less, disable the button and set the opacity to 50%.

  
  if (!playerHasSelectedBank) {

    document.getElementById('credit-readout-list').style.display = "none";

  var banks = [bank1, bank2, bank3, bank4];
  for (var i = 0; i < banks.length; i++) {
    var bank = banks[i];
    if (player.creditScore >= bank.minimumCreditScore) {
      document.getElementById(bank.pageElement).style.display = "block";
    } else {
      document.getElementById(bank.pageElement).style.display = "none";
    }
  }
} else {
  document.getElementById('credit-readout-list').style.display = "block";
}


  var totalToPay = parseFloat(document.getElementById('total_to_pay').innerHTML.replace("$", "").replace(/,/g, ""));

  if (totalToPay == 0) {
    document.getElementById('payoffbutton').style.opacity = "50%";
    document.getElementById('payoffbutton').style.pointerEvents = "none";
  } else {
    document.getElementById('payoffbutton').style.opacity = "100%";
    document.getElementById('payoffbutton').style.pointerEvents = "auto";
  }


  var spendingLimit = parseFloat(document.getElementById('spending_limit').innerHTML.replace("$", "").replace(/,/g, ""));

  if (spendingLimit == 0) {
    document.getElementById('cashoutcreditbutton').style.opacity = "50%";
    document.getElementById('cashoutcreditbutton').style.pointerEvents = "none";
  } else {
    document.getElementById('cashoutcreditbutton').style.opacity = "100%";
    document.getElementById('cashoutcreditbutton').style.pointerEvents = "auto";
  }


}

function killTime(){
  clearInterval(monthlyInterval);
  clearInterval(dailyInterval);
  clearInterval(secondlyInterval);
}

function resumeTime(){
  monthlyInterval = setInterval(monthlyUpdate, monthlyMillisecondValue);
  dailyInterval = setInterval(dailyUpdate, dailyMillisecondValue);
  secondlyInterval = setInterval(secondlyUpdate, secondlyRate);
}

