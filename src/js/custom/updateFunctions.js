function addExpense(amount) {
    player.expenses += amount;
  }

  function removeExpense(amount) {
    player.expenses -= amount;
  }

function updateBalance(operation, amount) {

    if (operation === "add") {
        player.money += amount + (amount * player.modifierRate);
        // display player expenses in the current_monthly_expenses_display
        document.getElementById("current_monthly_expenses_display").innerHTML = `- $${player.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo.`;
    } else if (operation === "subtract") {
        player.money -= amount;
    } else {
        console.log("error");
    }
    // show the amount that's been added or subtracted
    document.getElementById("player-money").innerHTML = `<i class="ri-money-dollar-circle-fill"></i> ${player.money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function updateDatapoints(operation, amount) {

    if (operation === "add") {
        player.datapoints += amount + (amount * player.modifierRate);;
    } else if (operation === "subtract") {
        player.datapoints -= amount;
    } else {
        console.log("error");
    }
    // show the amount that's been added or subtracted
    document.getElementById("player-datapoints").innerHTML = `<i class="ri-database-2-fill"></i> ${Math.floor(player.datapoints)}`;
}

function updateLevel() {
    player.level += 1;
    document.getElementById("player-level").innerHTML = `<i class="ri-shield-fill"></i> ${player.level}`;
}

function updateEmployeeCount(operation, amount) {
    if (operation === "add") {
        player.employees += amount;

    } else if (operation === "subtract") {
        player.employees -= amount;

    } else {
        console.log("error");
    }
    document.getElementById("employee-count").innerHTML = `<i class="ri-user-5-fill"></i> ${player.employees}`;
    document.getElementById("current_employee_count").innerHTML = `EMPLOYEES: <span>${player.employees}</span>`;
    //document.getElementById("current_modifier_rate").innerHTML = "+"+player.modifierRate.toFixed(2) + "%";
}

function updateInternCount(operation, amount) {
    if (operation === "add") {
        player.interns += amount;

    } else if (operation === "subtract") {
        player.interns -= amount;

    } else {
        console.log("error");
    }
    document.getElementById("current_intern_count").innerHTML = `INTERNS: <span>${player.interns}</span>`;

}

function updateLawyerCount(operation, amount) {
    if (operation === "add") {
        player.lawyers += amount;

    } else if (operation === "subtract") {
        player.lawyers -= amount;

    } else {
        console.log("error");
    }
    document.getElementById("current_lawyer_count").innerHTML = `LAWYERS: <span>${player.lawyers}</span>`;

}

function updateBuildingCount(operation, amount, buildingID) {
    if (operation === "add") {
        player.buildings += amount;
        player.buildingsIndex.push(buildingID); // Add buildingID to the index
        // get the background image's url from the buildingID square
        var building = document.querySelector(`[data-name="${buildingID}"]`);
        console.log(building.style.backgroundImage);
        document.getElementById("building-index-list").innerHTML += `
    <div class = "building_index_listing_item" id = "${buildingID}_index_listing">
    <img src = "${building.style.backgroundImage.replace('url("', '')}" class = "listing_image">
    <p class = "listing_id" ><i>#</i> ${buildingID.replace('gridsquare_', '')}</p>
    <hr>
    <h2><i class = "ri-building-4-fill" ></i> ${building.dataset.type}</h2>
    <h2> <i title = "Rent [Monthly]" style="font-weight:100;vertical-align:middle;font-size:12px" class="ri-money-dollar-circle-line"></i> <span title = "Rent [Monthly]" style="vertical-align:middle;">-${(parseFloat(building.dataset.rentValue) / 1000).toFixed(1)}K/mo.</span><br</h2>
    </div>
    `;
    } else if (operation === "subtract") {
        player.buildings -= amount;
        const index = player.buildingsIndex.indexOf(buildingID);
        if (index > -1) {
            player.buildingsIndex.splice(index, 1); // Remove buildingID from the index
            // remove the building from the building index list
            document.getElementById(buildingID + "_index_listing").remove();
        }
    } else {
        console.log("error");
    }
    document.getElementById("building-count").innerHTML = `<i class="ri-hotel-fill"></i> ${player.buildings}`;
}
