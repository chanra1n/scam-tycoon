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
    }

function secondlyUpdate(){
  // this function should add a percentage of the player's income to the player's balance every second.
  // basically, take the players income, divide it by the number of employees, and add that amount to the player's balance.

  if (player.employees > 0) {

    var income = player.income;

    var employees = player.employees;

    var incomePerEmployee = (income / employees) / 10;


    updateBalance("add", incomePerEmployee);
  }

  if (player.interns>0) {
    var income = player.income;
    var interns = player.interns;
    var incomePerIntern = (income / interns) / 100;

    updateBalance("add", incomePerIntern);
  }


}