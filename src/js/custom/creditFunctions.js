
    //loan shark
    var bank1 = {
      name: "L0n3$hArKz.com",
      spendingLimit: 5000000,
      interestRate: 0.25,
    };

    //dank of abearica
    var bank2 = {
      name: "Dank of Abearica",
      spendingLimit: 1000000,
      interestRate: 0.10,
    };

    //wastercurd
    var bank3 = {
      name: "Wastercurd",
      spendingLimit: 500000,
      interestRate: 0.07,
    };

    //meesa inc
    var bank4 = {
      name: "Meesa Inc.",
      spendingLimit: 100000,
      interestRate: 0.05,
    };

    var banks = [bank1, bank2, bank3, bank4];

    function selectCreditLine(creditLine, button) {
      console.log(creditLine);
      console.log(creditLine.name);
      console.log(creditLine.spendingLimit);
      console.log(creditLine.interestRate);
      player.spendingLimit += creditLine.spendingLimit;
      player.interestRate += creditLine.interestRate;
      console.log(player.spendingLimit);

      document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById('current_interest').innerHTML = (player.interestRate * 100).toFixed(0) + "%";

      button.innerHTML = "CANCEL ACCOUNT";
      button.onclick = function () {
        cancelCreditLine(creditLine, button);
      };

      button.parentElement.style.opacity = "100%";

      player.selectedBanks.push(creditLine);

    }

    function cancelCreditLine(creditLine, button) {
      player.spendingLimit -= creditLine.spendingLimit;
      player.interestRate -= creditLine.interestRate;

      document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById('current_interest').innerHTML = (player.interestRate * 100).toFixed(0) + "%";

      button.innerHTML = "OPEN ACCOUNT";
      button.onclick = function () {
        selectCreditLine(creditLine, button);
      };

      button.parentElement.style.opacity = "50%";

      player.selectedBanks = player.selectedBanks.filter(bank => bank !== creditLine);

    }

    function creditCashOut(amount) {
      if (player.spendingLimit < amount) {
        alert("You don't have enough credit to cash out this amount!");
      } else {
        var numberAmount = parseFloat(amount);
        console.log(numberAmount);
        updateBalance("add", numberAmount);
        player.spendingLimit -= numberAmount;
        document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('amount_to_pay').innerHTML = "$" + numberAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('total_to_pay').innerHTML = "$" + parseFloat(numberAmount + (numberAmount * player.interestRate)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        $('#credit-input-dialog').dialog('close');
      }
    }

    function resetCreditLineMonthly() {
      // get the banks that the player has selected
      var selectedBanks = player.selectedBanks;
      // for each bank, get the spending limit from that bank
      var spendingLimits = selectedBanks.map(bank => bank.spendingLimit);
      // add up all of the spending limits
      var totalSpendingLimit = spendingLimits.reduce((a, b) => a + b, 0);
      // set the player.spendingLimit to the totalSpendingLimit
      player.spendingLimit = totalSpendingLimit;
      document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      // now, let's take the outstanding balance from the element #total_to_pay, and write that value to amount_to_pay. then, add the interest rate to that, to get the new total for #total_to_pay.
      var amountToPay = parseFloat(document.getElementById('total_to_pay').innerHTML.replace("$", "").replace(/,/g, ""));
      document.getElementById('amount_to_pay').innerHTML = "$" + amountToPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById('total_to_pay').innerHTML = "$" + parseFloat(amountToPay + (amountToPay * player.interestRate)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    };

    function payOffDebt() {

      document.getElementById('payoffbutton').style.opacity = "50%";
      document.getElementById('payoffbutton').style.pointerEvents = "none";

      var debt = parseFloat(document.getElementById('total_to_pay').innerHTML.replace("$", "").replace(/,/g, ""));

      if (player.money < debt) {
        // the player does not have enough money to pay off the debt.
        // spend all of their money, and set the remaining debt to a variable called "remaining debt".

        var remainingDebt = debt - player.money;
        updateBalance("subtract", player.money);
        player.spendingLimit += remainingDebt;
        document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('amount_to_pay').innerHTML = "$" + remainingDebt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('total_to_pay').innerHTML = "$" + parseFloat(remainingDebt + (remainingDebt * player.interestRate)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      } else {
        var amountToPay = parseFloat(document.getElementById('total_to_pay').innerHTML.replace("$", "").replace(/,/g, ""));
        updateBalance("subtract", amountToPay);
        document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('amount_to_pay').innerHTML = "$0.00";
        document.getElementById('total_to_pay').innerHTML = "$0.00";
        resetCreditLineMonthly();
      }
    }
