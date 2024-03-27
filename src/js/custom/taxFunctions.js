    function beginTaxEvent() {
      killTime();

      document.body.style.pointerEvents = "none";
      writeBanner('TIME TO FILE YOUR TAXES!');
      document.getElementById('world-map').style.filter = "blur(10px)";

      setTimeout(function () {

        document.getElementById('bannerText').style.transform = "translate(-50%,-50%) scaleY(0)";
        document.getElementById('bannerText').style.opacity = "0%";

        payrollTaxFraudCommittedThisYear = 0;
        accountingFraudCommittedThisYear = 0;
        nonDisclosureFraudCommittedThisYear = 0;
        propertyTaxFraudCommittedThisYear = 0;

        document.getElementById('worker-tax-count').placeholder = player.employees + player.interns + player.lawyers;
        document.getElementById('savings-tax-count').placeholder = player.money;
        document.getElementById('otherSavings-tax-count').placeholder = player.datapoints;
        document.getElementById('location-tax-count').placeholder = player.buildings;

        document.getElementById('user-desk').style.bottom = "-15%";
        document.getElementById('user-desk').style.pointerEvents = "auto";
        document.getElementById('sidebar').style.display = "none";
        document.body.style.pointerEvents = "auto";
      }, 2500);
    }

    function submitTaxForm() {



      // basically, take the values that the player entered, and compare them to their "true" values.
      // record how off they were from the true value, and add it to their reportingAccuracy object.

      var workerTaxCount = parseInt(document.getElementById('worker-tax-count').value);
      var savingsTaxCount = parseInt(document.getElementById('savings-tax-count').value);
      var otherSavingsTaxCount = parseInt(document.getElementById('otherSavings-tax-count').value);
      var locationTaxCount = parseInt(document.getElementById('location-tax-count').value);

      if (workerTaxCount == 0 || isNaN(workerTaxCount)) {
        workerTaxCount = player.employees + player.interns + player.lawyers;
      }

      if (savingsTaxCount == 0 || isNaN(savingsTaxCount)) {
        savingsTaxCount = player.money;
      }

      if (otherSavingsTaxCount == 0 || isNaN(otherSavingsTaxCount)) {
        otherSavingsTaxCount = player.datapoints;
      }

      if (locationTaxCount == 0 || isNaN(locationTaxCount)) {
        locationTaxCount = player.buildings;
      }

      var workerTaxDifference = Math.abs(player.employees - workerTaxCount);
      var savingsTaxDifference = Math.abs(player.money - savingsTaxCount);
      var otherSavingsTaxDifference = Math.abs(player.datapoints - otherSavingsTaxCount);
      var locationTaxDifference = Math.abs(player.buildings - locationTaxCount);

      player.reportingAccuracy.onWorkers = workerTaxDifference;
      player.reportingAccuracy.onSavings = savingsTaxDifference;
      player.reportingAccuracy.onOtherSavings = otherSavingsTaxDifference;
      player.reportingAccuracy.onLocations = locationTaxDifference;

      // let's generate some percentages


      // it's a crime if the player fails to report the amount of workers they have within 20% of the true value.
      if (workerTaxDifference > Math.round(player.employees * generatePercentage(0.2))) {
        player.payrollTaxFraudCounts++;
        payrollTaxFraudCommittedThisYear++;
        console.log('YOU COMMITTED A CRIME');
        console.log(player.payrollTaxFraudCounts);
      }

      // it's a crime if the player fails to report the amount of money they have within 25% of the true value.
      if (savingsTaxDifference > Math.round(player.money * generatePercentage(0.25))) {
        player.accountingFraudCounts++;
        accountingFraudCommittedThisYear++;
        console.log('YOU COMMITTED A CRIME');
        console.log(player.accountingFraudCounts);
      }

      // it's a crime if the player fails to report the amount of datapoints they have within 20% of the true value.
      if (otherSavingsTaxDifference > Math.round(player.datapoints * generatePercentage(0.20))) {
        player.nonDisclosureFraudCounts++;
        nonDisclosureFraudCommittedThisYear++;
        console.log('YOU COMMITTED A CRIME');
        console.log(player.nonDisclosureFraudCounts);
      }

      // it's a crime if the player fails to report the amount of buildings they have within 50% of the true value.
      if (locationTaxDifference > Math.round(player.buildings * generatePercentage(0.50))) {
        player.propertyTaxFraudCounts++;
        propertyTaxFraudCommittedThisYear++;
        console.log('YOU COMMITTED A CRIME');
        console.log(player.propertyTaxFraudCounts);
      }

      // let's calculate a tax rate.

      var workerTaxRate = Math.round(player.employees * 0.0765);
      var savingsTaxRate = Math.round(player.money * 0.10);
      var otherSavingsTaxRate = Math.round(player.datapoints * 0.15);
      var locationTaxRate = Math.round(player.buildings * 0.01);




      resumeTime();

      document.getElementById('world-map').style.filter = "none";
      document.getElementById('user-desk').style.bottom = "-150%";
      document.getElementById('user-desk').style.pointerEvents = "none";
      document.getElementById('sidebar').style.display = "block";


      setTimeout(function () {

        var totalFraudCountsCommittedThisYear = payrollTaxFraudCommittedThisYear + accountingFraudCommittedThisYear + nonDisclosureFraudCommittedThisYear + propertyTaxFraudCommittedThisYear;
        if (totalFraudCountsCommittedThisYear == 0) {
          sendMail('TAX FORM SUBMITTED', `Your tax form has been submitted. Thank you for your cooperation.`);
        } else if (totalFraudCountsCommittedThisYear == 1) {
          sendMail('TAX FORM SUBMITTED', `THIS IS A NOTICE. Some discrepancies were found in your tax form. Please be more careful in the future.`);
        } else if (totalFraudCountsCommittedThisYear == 2) {
          sendMail('TAX FORM SUBMITTED', `THIS IS A WARNING. Some discrepancies were found in your tax form. Please be more careful in the future.`);
        } else if (totalFraudCountsCommittedThisYear == 3) {
          sendMail('TAX FORM SUBMITTED', `YOU ARE BEING FINED. THIS IS A WARNING. Many discrepancies were found in your submitted tax form. You are being fined and are on notice. Please be more careful in the future.`
            `<button onclick = "updateBalance('subtract', 250000);removeMail(this.parentElement)"><i style = "float:none!important;font-size:12px!important;" class="ri-money-dollar-circle-fill"></i> PAY FINE [$250K]</button>`);
        } else {
          sendMail('TAX FORM SUBMITTED', `YOU ARE BEING FINED. THIS IS A WARNING. Many discrepancies were found in your submitted tax form. You are being fined and are on notice. Please insure that this does not happen again.
          <button onclick = "updateBalance('subtract', 500000);removeMail(this.parentElement)"><i style = "float:none!important;font-size:12px!important;" class="ri-money-dollar-circle-fill"></i> PAY FINE [$500K]</button>`);
        }

        updateBalance('subtract', workerTaxRate + savingsTaxRate + otherSavingsTaxRate + locationTaxRate);

        notifyPlayer('TAXES PAID: $' + (workerTaxRate + savingsTaxRate + otherSavingsTaxRate + locationTaxRate));

      }, 5000)



    }
