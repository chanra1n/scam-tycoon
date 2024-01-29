var day_counter = 0;

function dailyUpdate(){

  day_counter++;
  if (day_counter % 7 === 0) {
    sendTradeOffers();
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
      document.getElementById('current_monthly_income_display').innerHTML = `$${((player.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))*30).toFixed(2)}/mo.`;


      // keep track of the current day
      var currentDay = document.getElementById("calendar_day").innerHTML;
      var currentDayInt = parseInt(currentDay);

      // if it's the last day of the month, reset the day to 1
      if (currentDayInt >= 30) {
        currentDayInt = 1;
      } else {
        currentDayInt += 1;
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

    }

function monthlyUpdate(){
              // Monthly operations here...

      updateBalance("subtract", player.expenses);

      // keep track of the current month
      var currentMonth = document.getElementById("calendar_month").innerHTML;
      var currentYear = 0;
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

function secondlyUpdate(){
  // this function should add a percentage of the player's income to the player's balance every second.
  // basically, take the players income, divide it by the number of employees, and add that amount to the player's balance.

  if (player.employees > 0) {

    var income = player.income;

    var employees = player.employees;

    var incomePerEmployee = (income / employees) / 5;


    updateBalance("add", incomePerEmployee);
  }

  if (player.interns>0) {
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



  if (player.money < 75000) {
    document.getElementById('hire_10_lawyers_button').style.opacity = "50%";
    document.getElementById('hire_10_lawyers_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_10_lawyers_button').style.opacity = "100%";
    document.getElementById('hire_10_lawyers_button').style.pointerEvents = "auto";
  }

  if (player.money < 375000) {
    document.getElementById('hire_50_lawyers_button').style.opacity = "50%";
    document.getElementById('hire_50_lawyers_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_50_lawyers_button').style.opacity = "100%";
    document.getElementById('hire_50_lawyers_button').style.pointerEvents = "auto";
  }

  if (player.money < 750000) {
    document.getElementById('hire_100_lawyers_button').style.opacity = "50%";
    document.getElementById('hire_100_lawyers_button').style.pointerEvents = "none";
  } else {
    document.getElementById('hire_100_lawyers_button').style.opacity = "100%";
    document.getElementById('hire_100_lawyers_button').style.pointerEvents = "auto";
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

