var policeBuildings = [];

class Building {
  constructor(name, type, resaleValue, buyValue, rentValue, location, forSale, forRent) {
    this.name = name;
    this.type = type;
    this.resaleValue = resaleValue;
    this.buyValue = buyValue;
    this.rentValue = rentValue;
    this.location = location;
    this.forSale = forSale;
    this.forRent = forRent;
  }

      // make an embed for the rent status
      get isforrent() {
        if (this.forRent == true) {
          return `<h3 onclick = "rentBuilding('${this.name}', ${this.rentValue})" style = "display:block;color:green;vertical-align:middle"><i style = "vertical-align:top" class="ri-money-dollar-circle-line"></i> FOR RENT</h3>`;
        } else {
          return ``;
        }
      }

      // make an embed for the sale status
      get isforsale() {
        if (this.forSale == true) {
          return `<h3 onclick = "buyBuilding('${this.name}', ${this.buyValue})"" style = "display:block;color:green;vertical-align:middle"> <i style = "vertical-align:top" class="ri-money-dollar-circle-fill"></i> FOR SALE</h3>`;
        } else {
          return ``;
        }
      }

      getInfo() {

        if (this.type === "Call Center" || this.type === "Office") {


          return `
    <span style = "font-size:8px" ><i>#</i> ${this.name.replace('gridsquare_', '')}</span><hr>
    <i style = "font-weight:100;vertical-align:middle" class="ri-building-4-fill"></i> <span style = "vertical-align:middle;">${this.type}</span><br>
    <i title = "Rent [Monthly]" style="font-weight:100;vertical-align:middle" class="ri-money-dollar-circle-line"></i> <span title = "Rent [Monthly]" style="vertical-align:middle;">${(parseFloat(this.rentValue) / 1000).toFixed(1)}K/mo.</span><br>
    <i title = "Property Value" style="font-weight:100;vertical-align:middle" class="ri-money-dollar-circle-fill"></i> <span title = "Property Value" style="vertical-align:middle;">${(parseFloat(this.buyValue) / 1000000).toFixed(1)}M</span><br>
    <i title = "Resale Value" style="font-weight:100;vertical-align:middle;opacity:50%;" class="ri-discount-percent-line"></i> <span title = "Resale Value" style="vertical-align:middle;opacity:50%;">${(parseFloat(this.resaleValue) / 1000000).toFixed(1)}M</span><br>
    <i style = "font-weight:100;vertical-align:middle" class="ri-map-pin-2-fill"></i> <span style = "vertical-align:middle;">${this.location}</span><br>
    <div id = "${this.name}_player_options">
    ${this.isforrent}
    ${this.isforsale}
    </div>
    `;

        } else if (this.type === "Restaurant") {
          // no rent value for restaurants
          return `
    <span style = "font-size:8px" ><i>#</i> ${this.name.replace('gridsquare_', '')}</span><hr>
    <i style = "font-weight:100;vertical-align:middle" class="ri-building-4-fill"></i> <span style = "vertical-align:middle;">${this.type}</span><br>
    <i style="font-weight:100;vertical-align:middle" class="ri-money-dollar-circle-fill"></i> <span style="vertical-align:middle;">${parseFloat(this.buyValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><br>
    <i style = "opacity:50%;font-weight:100;vertical-align:middle" class="ri-discount-percent-line"></i> <span style = "opacity:50%;vertical-align:middle;">${parseFloat(this.resaleValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><br>
    <i style = "font-weight:100;vertical-align:middle" class="ri-map-pin-2-fill"></i> <span style = "vertical-align:middle;">${this.location}</span><br>
    <div id = "${this.name}_player_options">
    ${this.isforsale}
    </div>
    `;

        } else {

          return `
    <span style = "font-size:8px" ><i>#</i> ${this.name.replace('gridsquare_', '')}</span><hr>
    <i style = "font-weight:100;vertical-align:middle" class="ri-building-4-fill"></i> <span style = "vertical-align:middle;">${this.type}</span><br>
    <i style = "font-weight:100;vertical-align:middle" class="ri-map-pin-2-fill"></i> <span style = "vertical-align:middle;">${this.location}</span><br>
    `;

        }

      }
    }

    gridItems.forEach((item, index) => {
      var buildingType;
      var prefix;


      if (Array.from(item.classList).some(cls => cls.includes('admin'))) {
        buildingType = "Call Center";
        prefix = 'C';
        numba = index;
        item.dataset.forSale = true;
        item.dataset.forRent = true;
      } else if (Array.from(item.classList).some(cls => cls.includes('office'))) {
        buildingType = "Office";
        prefix = 'O';
        numba = index;
        item.dataset.forSale = true;
        item.dataset.forRent = true;
      } else if (Array.from(item.classList).some(cls => cls.includes('gas'))) {
        buildingType = "Gas Station";
        prefix = 'G';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('library'))) {
        buildingType = "Library";
        prefix = 'L';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('police'))) {
        buildingType = "Police Station";
        prefix = 'P';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
        policeBuildings.push(item.id);
      } else if (Array.from(item.classList).some(cls => cls.includes('fire'))) {
        buildingType = "Fire Station";
        prefix = 'F';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('restaurant'))) {
        buildingType = "Restaurant";
        prefix = 'R';
        numba = index;
        item.dataset.forSale = true;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('home'))) {
        buildingType = "Home";
        prefix = 'H';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('empty'))) {
        buildingType = "****";
        prefix = '';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('beach'))) {
        buildingType = "****";
        prefix = '';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('road'))) {
        buildingType = "****";
        prefix = '';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('natural'))) {
        buildingType = "****";
        prefix = '';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else if (Array.from(item.classList).some(cls => cls.includes('water'))) {
        buildingType = "Water";
        prefix = 'W';
        numba = index;
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      } else {
        buildingType = "****";
        prefix = '****';
        numba = '';
        item.dataset.forSale = false;
        item.dataset.forRent = false;
      }

      // Create a new building object

      if (buildingType === "Restaurant") {
        // generate a random number between 300,000 and 600,000. the average should be around 400,000
        var buyValue; do { buyValue = Math.round(400000 + Math.random() * Math.sqrt(-2.0 * Math.log(Math.random())) * Math.sin(2.0 * Math.PI * Math.random()) * 50000); } while (buyValue < 300000 || buyValue > 600000);

      } else if (buildingType === "Call Center") {

        // generate a random number between 1.5mil and 3mil. the average should be around 2mil 
        var buyValue; do { buyValue = Math.round(2000000 + Math.random() * Math.sqrt(-2.0 * Math.log(Math.random())) * Math.sin(2.0 * Math.PI * Math.random()) * 50000); } while (buyValue < 1500000 || buyValue > 3000000);
        // generate a random number between 50k and 100k. the average should be around 75k
        var rentValue; do { rentValue = Math.round(75000 + Math.random() * Math.sqrt(-2.0 * Math.log(Math.random())) * Math.sin(2.0 * Math.PI * Math.random()) * 50000); } while (rentValue < 50000 || rentValue > 100000);

      } else if (buildingType === "Office") {
        // generate a random number between 3.5mil and 4mil. the average should be around 3.75mil
        var buyValue; do { buyValue = Math.round(3750000 + Math.random() * Math.sqrt(-2.0 * Math.log(Math.random())) * Math.sin(2.0 * Math.PI * Math.random()) * 50000); } while (buyValue < 3500000 || buyValue > 4000000);
        // generate a random number between 100k and 150k. the average should be around 110k
        var rentValue; do { rentValue = Math.round(110000 + Math.random() * Math.sqrt(-2.0 * Math.log(Math.random())) * Math.sin(2.0 * Math.PI * Math.random()) * 50000); } while (rentValue < 100000 || rentValue > 150000);
      } else {
        var buyValue = Math.floor(Math.random() * 1000000) + 1000000;
      }

      let building = new Building(
        item.id,
        buildingType,
        // resale value should be 60% of the buy value
        buyValue * 0.6,
        buyValue,
        rentValue,
        `[` + item.dataset.position + `]`,
        JSON.parse(item.dataset.forSale), // Convert to boolean
        JSON.parse(item.dataset.forRent)  // Convert to boolean
      );

      // Store the building info in a data attribute
      item.dataset.info = building.getInfo();
      // parse info into different attributes
        item.dataset.name = building.name;
        item.dataset.type = building.type;
        item.dataset.resaleValue = building.resaleValue;
        item.dataset.buyValue = building.buyValue;
        item.dataset.rentValue = building.rentValue;
        item.dataset.location = building.location;
        item.dataset.forSale = building.forSale;
        item.dataset.forRent = building.forRent;

        // set a random delay for the opacity transition
        item.style.transitionDelay = Math.floor(Math.random() * 1000) + "ms";
        // if item is a house, the opacity should be 0.75
        item.style.transform = "scale(1)"
        if (buildingType === "Home") {;
          item.style.opacity = 0.75;
        } else {
          item.style.opacity = 1;
        }


        // then, let's remove the transition delay 
        setTimeout(function () {
          item.style.transitionDelay = "0ms";
        }, 1000);

    });

