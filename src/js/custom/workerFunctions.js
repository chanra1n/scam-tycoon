    function hireExtraWorkers(workerType, amount) {
      if (workerType === "employee") {

        if (player.money < 3000 * amount) {
          alert("You don't have enough money to hire this many employees!");
        } else {
          updateEmployeeCount("add", amount);
          addExpense(3000 * amount);
          updateBalance("subtract", 3000 * amount);
        }

      } else if (workerType === "intern") {

        if (player.money < 1000 * amount) {
          alert("You don't have enough money to hire this many interns!");
        } else {

          updateInternCount("add", amount);
          addExpense(1000 * amount);
          updateBalance("subtract", 1000 * amount);
        }

      } else if (workerType === "lawyer") {

        if (player.lawyers >= 6) {
          alert("You cannot hire more than 6 lawyers!");
        } else if (player.money < 7500 * amount) {
          alert("You don't have enough money to hire this many lawyers!");
        } else {

          updateLawyerCount("add", amount);
          addExpense(7500 * amount);
          updateBalance("subtract", 7500 * amount);
        }

      } else {
        console.log("error");

      }

      document.getElementById('employee-count').innerHTML = `<i class="ri-user-5-fill"></i> ${player.employees + player.interns + player.lawyers}`;

    }
