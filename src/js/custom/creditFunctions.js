
//loan shark
var bank1 = {
  name: "L0n3$hArKz.com",
  spendingLimit: 5000000,
  interestRate: 0.25,
  minimumCreditScore: 150,
  pageElement: "bank1_listing_item",
  debtOnRecord: 0
};

//dank of abearica
var bank2 = {
  name: "Dank of Abearica",
  spendingLimit: 1000000,
  interestRate: 0.10,
  minimumCreditScore: 450,
  pageElement: "bank2_listing_item",
  debtOnRecord: 0
};

//wastercurd
var bank3 = {
  name: "Wastercurd",
  spendingLimit: 750000,
  interestRate: 0.07,
  minimumCreditScore: 650,
  pageElement: "bank3_listing_item",
  debtOnRecord: 0
};

//meesa inc
var bank4 = {
  name: "Meesa Inc.",
  spendingLimit: 2500000,
  interestRate: 0.05,
  minimumCreditScore: 900,
  pageElement: "bank4_listing_item",
  debtOnRecord: 0
};

var banks = [bank1, bank2, bank3, bank4];
var playerHasSelectedBank = false;

function selectCreditLine(creditLine, button) {
  playerHasSelectedBank = true;
  // Check if the player has already selected a bank
  if (player.selectedBanks.length > 0) {
    alert("You can only open one account.");
    return;
  }

  console.log(creditLine);
  console.log(creditLine.name);
  console.log(creditLine.spendingLimit);
  console.log(creditLine.interestRate);
  player.spendingLimit += creditLine.spendingLimit;
  player.interestRate += creditLine.interestRate;
  console.log(player.spendingLimit);

  document.getElementById('credit-readout-list').style.display = "block";

  document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('current_interest').innerHTML = (player.interestRate * 100).toFixed(0) + "%";

  button.innerHTML = "CANCEL ACCOUNT";
  button.onclick = function () {
    cancelCreditLine(creditLine, button);
  };

  player.selectedBanks.push(creditLine);

  // Set the other banks pageElement to none
  banks.forEach(bank => {
    if (bank !== creditLine) {
      document.getElementById(bank.pageElement).style.display = "none";
    }
  });
}

function cancelCreditLine(creditLine, button) {

  playerHasSelectedBank = false;

  player.spendingLimit = Math.max(0, player.spendingLimit - creditLine.spendingLimit);
  player.interestRate -= creditLine.interestRate;

  // If there is a balance, it is removed when the account is closed
  var balance = parseFloat(document.getElementById('total_to_pay').innerHTML.replace("$", "").replace(/,/g, ""));
  if (balance > 0) {
    player.creditScore -= 100;
    document.getElementById('total_to_pay').innerHTML = "$0.00";
  } else {
    player.creditScore += 1;
  }

  document.getElementById('spending_limit').innerHTML = "$" + player.spendingLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('current_interest').innerHTML = (player.interestRate * 100).toFixed(0) + "%";

  button.innerHTML = "OPEN ACCOUNT";
  button.onclick = function () {
    selectCreditLine(creditLine, button);
  };


  player.selectedBanks = player.selectedBanks.filter(bank => bank !== creditLine);
}

function creditCashOut(amount) {

  player.creditScore -= 2.5;

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

  // check if there is a balance on the account
  if (amountToPay > 0) {
    // if there is a balance, the player's credit score drops by 10
    player.creditScore -= 10;
  } else {
    // if there isn't, it rises by 1
    player.creditScore += 1;
  }
};

function payOffDebt() {

  player.creditScore += 10;

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
