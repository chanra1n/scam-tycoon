function buyBuilding(buildingID, buildingBuyValue) {
    // check if player has enough money to buy building, and if they don't already own it
    // if they do, subtract the cost from their balance and add the building to their index
    // then, update the building's forSale value to false
    if (player.money >= buildingBuyValue && !player.buildingsIndex.includes(buildingID)) {
        updateBalance("subtract", buildingBuyValue);
        updateBuildingCount("add", 1, buildingID);
        // get the element with the data-building-id of the buildingID passed
        console.log(buildingID);
        var building = document.querySelector(`[data-name="${buildingID}"]`);
        // get the data-resale-value of this building
        var buildingResaleValue = building.dataset.resaleValue;
        console.log("building rsale value: " + buildingResaleValue);
        // detect what building this is based on its data-type attribute
        var buildingType = building.dataset.type;
        console.log("building type: " + buildingType);

        if (buildingType === "Call Center") {
            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "sellBuilding('${buildingID}', ${buildingResaleValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> SELL</h3>
        <hr class = "selectascamhr">
        <p class = "selectascam" >ACTIVE SCAM</p>
        <select class = "scam_options" id = "${buildingID}_scam_options">
        <option value="none">CHOOSE A SCAM</option>
        `+ unlockable_options + `
      </select>
        `;
        } else if (buildingType === "Office") {

            var employee_average_hire = Math.floor(Math.random() * 200) + 10;
            // this modifier should be a percentage between 0 and 0.5. rounded to 2 decimal places
            var employee_contributing_modifier = (Math.random()).toFixed(2);

            player.modifierRate += parseFloat(employee_contributing_modifier);

            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "sellBuilding('${buildingID}', ${buildingResaleValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> SELL</h3>
        <hr class = "selectascamhr">
        <p class = "selectascam" >BUILDING BONUS</p>
        <span class = "employee_bonus_text" > <i class = "ri-user-5-fill" ></i> <h1 id = "${buildingID}_emp_contribution" >+${employee_average_hire}</h1></span>
        <span class = "employee_bonus_text" > <i class="ri-discount-percent-fill"></i> <h1 id = "${buildingID}_mod_contribution" >+${employee_contributing_modifier}%</h1>
        `;

            updateEmployeeCount("add", employee_average_hire);

        } else {
            alert('Something went wrong, please try again later.');
        }


        building.style.animation = "pulse 1s infinite";
        document.getElementById('property_blurb').style.display = "none";
    } else {
        alert("You don't have enough money to buy this building!");
    }
}

function rentBuilding(buildingID, buildingRentValue) {
    // check if player has enough money to rent building, and if they don't already own it
    // if they do, subtract the cost from their balance and add the building to their index
    // then, update the building's forRent AND forSale value to false
    if (player.money >= buildingRentValue && !player.buildingsIndex.includes(buildingID)) {
        updateBalance("subtract", buildingRentValue);
        updateBuildingCount("add", 1, buildingID);
        addExpense(buildingRentValue);
        // get the element with the data-building-id of the buildingID passed
        console.log(buildingID);

        var building = document.querySelector(`[data-name="${buildingID}"]`);
        // detect what building this is based on its data-type attribute
        var buildingType = building.dataset.type;
        console.log("building type: " + buildingType);

        // get the data-resale-value of this building
        var buildingRentValue = building.dataset.rentValue;
        console.log("building rsale value: " + buildingRentValue);

        if (buildingType === "Call Center") {
            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "exitBuilding('${buildingID}', ${buildingRentValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> CANCEL RENT</h3>
        <hr class = "selectascamhr">
        <p class = "selectascam" >ACTIVE SCAM</p>
        <select class = "scam_options" id = "${buildingID}_scam_options">
        <option value="none">CHOOSE A SCAM</option>
        `+ unlockable_options + `
      </select>
        `;
        } else if (buildingType === "Office") {

            var employee_average_hire = Math.floor(Math.random() * 200) + 10;
            // this modifier should be a percentage between 0 and 0.5. rounded to 2 decimal places
            var employee_contributing_modifier = (Math.random()).toFixed(2);

            player.modifierRate += parseFloat(employee_contributing_modifier);

            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "exitBuilding('${buildingID}', ${buildingRentValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> CANCEL RENT</h3>
        <hr class = "selectascamhr">
        <p class = "selectascam" >BUILDING BONUS</p>
        <span class = "employee_bonus_text" > <i class = "ri-user-5-fill" ></i> <h1 id = "${buildingID}_emp_contribution" >+${employee_average_hire}</h1></span>
        <span class = "employee_bonus_text" > <i class="ri-discount-percent-fill"></i> <h1 id = "${buildingID}_mod_contribution" >+${employee_contributing_modifier}%</h1>
        `;

            updateEmployeeCount("add", employee_average_hire);

        } else {
            alert('Something went wrong, please try again later.');
        }
        building.style.animation = "pulse-rent 1s infinite";
        document.getElementById('property_blurb').style.display = "none";
    } else {
        alert("You can't afford rent!");
    }
}

function sellBuilding(buildingID, buildingSellValue) {
    // check if player owns the building
    // if they do, add the sell value to their balance and remove the building from their index
    // then, update the building's forSale value to true
    if (player.buildingsIndex.includes(buildingID)) {
        updateBalance("add", buildingSellValue);
        updateBuildingCount("subtract", 1, buildingID);
        // get the element with the data-building-id of the buildingID passed
        var building = document.querySelector(`[data-name="${buildingID}"]`);
        // get the data-buy-value of this building
        var buildingBuyValue = building.dataset.buyValue;
        var buildingRentValue = building.dataset.rentValue;
        console.log("building buy value: " + buildingBuyValue);
        console.log("building rent value: " + buildingRentValue);
        // detect if this is a restaurant or not, from this building's classList
        var isResturant = Array.from(building.classList).some(cls => cls.includes('restaurant'));
        console.log(building.classList);
        if (isResturant) {
            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "buyBuilding('${buildingID}', ${buildingBuyValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> FOR SALE</h3>
        `;
        } else {
            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "rentBuilding('${buildingID}', ${buildingRentValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-line"></i> FOR RENT</h3>
        <h3 onclick = "buyBuilding('${buildingID}', ${buildingBuyValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> FOR SALE</h3>
        `;
        }
        building.style.animation = "none";
        // if the user has no buildings left, display the blurb again
        if (player.buildingsIndex.length === 0) {
            document.getElementById('property_blurb').style.display = "block";
        }
    } else {
        alert("You already sold this building!");
    }
}

function exitBuilding(buildingID, buildingRentValue) {
    // check if player owns the building
    // if they do, add the sell value to their balance and remove the building from their index
    // then, update the building's forSale value to true
    if (player.buildingsIndex.includes(buildingID)) {
        updateBuildingCount("subtract", 1, buildingID);
        removeExpense(buildingRentValue);
        // get the element with the data-building-id of the buildingID passed
        var building = document.querySelector(`[data-name="${buildingID}"]`);
        // get the data-buy-value of this building
        var buildingBuyValue = building.dataset.buyValue;
        var buildingRentValue = building.dataset.rentValue;
        console.log("building buy value: " + buildingBuyValue);
        console.log("building rent value: " + buildingRentValue);
        // detect if this is a restaurant or not, from this building's classList
        var isResturant = Array.from(building.classList).some(cls => cls.includes('restaurant'));
        console.log(building.classList);
        if (isResturant) {
            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "buyBuilding('${buildingID}', ${buildingBuyValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> FOR SALE</h3>
        `;
        } else {

            var buildingType = building.dataset.type;
            console.log("building type: " + buildingType);

            if (buildingType === "Office") {
                console.log(buildingID + "_emp_contribution");
                var employee_average_hire = parseFloat(document.getElementById(buildingID + "_emp_contribution").innerHTML.replace("+", ""));
                var employee_contributing_modifier = document.getElementById(buildingID + "_mod_contribution").innerHTML;
                updateEmployeeCount("subtract", employee_average_hire);
                player.modifierRate -= parseFloat(employee_contributing_modifier.replace("+", "").replace("%", ""));
            }

            document.getElementById(buildingID + "_player_options").innerHTML = `
        <h3 onclick = "rentBuilding('${buildingID}', ${buildingRentValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-line"></i> FOR RENT</h3>
        <h3 onclick = "buyBuilding('${buildingID}', ${buildingBuyValue})" style = "display:block;color:red;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> FOR SALE</h3>
        `;

        }
        building.style.animation = "none";
        // if the user has no buildings left, display the blurb again
        if (player.buildingsIndex.length === 0) {
            document.getElementById('property_blurb').style.display = "block";
        }
    } else {
        alert("You already sold this building!");
    }
}
