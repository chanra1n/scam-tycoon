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

        if (player.money < 7500 * amount) {
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

    function fireExtraWorkers(workerType, amount) {
      if (workerType === "employee") {

        if (player.employees < amount) {
          alert("You don't have enough employees to fire this many!");
        } else {
          updateEmployeeCount("subtract", amount);
          removeExpense(3000 * amount);
        }

      } else if (workerType === "intern") {

        if (player.interns < amount) {
          alert("You don't have enough interns to fire this many!");
        } else {

          updateInternCount("subtract", amount);
          removeExpense(1000 * amount);
        }

      } else if (workerType === "lawyer") {

        if (player.lawyers < amount) {
          alert("You don't have enough lawyers to fire this many!");
        } else {

          updateLawyerCount("subtract", amount);
          removeExpense(7500 * amount);
        }
      } else {
        console.log("error");

      }
    }
