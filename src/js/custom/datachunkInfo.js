// create 5 third-party companies that will occasionally offer datapoint trades to the player.
// these companies will have a random chance of offering a trade every 7 days (in-game time)
// there are 3 classes of trades: 
// 1. high payout, offered for a very limited amount of time (only lasts 7 days)
// 2. medium trade, offered for a medium amount of time (lasts 14 days)
// 3. low trade, offered for a long amount of time (lasts one month)
// 4. rare payout, offered until the end of the month (no matter what day it currently is)

var activeTradeCount = 0;

function randomizePayout(payout) {
  var variance = payout * 0.1; // Adjust this value to change the range
  var min = payout - variance;
  var max = payout + variance;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var thirdPartyCompanies = [
  {
    name: "FauxBook",
    trades: [
      {
        name: "FauxBook",
        description: `Hey there [COMPANY]! We're looking for some datachunks to help us improve our VR/AR offerings.
            If you can provide us with some personal info- I mean, datachunks, we'd be happy to provide payment.`,
        payout: randomizePayout(50000),
        cost: 10000,
        duration: 7,
        rarity: "high",
        offered: false,
      },
      {
        name: "FauxBook",
        description: `Greetings [COMPANY]! At Fauxbook, we're always looking to improve our services. With a few of
            your datachunks, we can continue to provide our users with the best experience possible.`,
        payout: randomizePayout(10000),
        cost: 1000,
        duration: 14,
        rarity: "medium",
        offered: false,
      },
      {
        name: "Fauxbook",
        description: `Hello [COMPANY]! We'd like to offer you a chance to earn some money by providing us with your datachunks.`,
        payout: randomizePayout(5000),
        cost: 500,
        duration: 30,
        rarity: "low",
        offered: false,
      },
      {
        name: "Mark Puckerzerg",
        description: `Hey [COMPANY]! It's Mark Puckerzerg, CEO of Fauxbook. Please help me, 
            I wasted my money on this VR thing and it hasn't panned out too well.`,
        payout: randomizePayout(1000000),
        cost: 100000,
        duration: 3,
        rarity: "rare",
        offered: false,
      },
    ],
  },
  {
    name: "Ex Corp.",
    trades: [
      {
        name: "Ex Corp.",
        description: `Formerly known as Xitter. Anyway, we're looking to shill some datachunks to our users. Got any to spare?`,
        payout: randomizePayout(100000),
        cost: 10000,
        duration: 7,
        rarity: "high",
        offered: false,
      },
      {
        name: "Ex Corp.",
        description: `Hey [COMPANY]! We're totally hip with the kids, show us your dankest datachunks!`,
        payout: randomizePayout(50000),
        cost: 1000,
        duration: 14,
        rarity: "medium",
        offered: false,
      },
      {
        name: "Ex Corp.",
        description: `We both know you can't hold onto those datachunks for long. Why not sell them to us?`,
        payout: randomizePayout(25000),
        cost: 500,
        duration: 30,
        rarity: "low",
        offered: false,
      },
      {
        name: "Ex Corp.",
        description: `We'd like to purchase your company. Actually, just kidding. We just want your datachunks.`,
        payout: randomizePayout(1000000),
        cost: 100000,
        duration: 3,
        rarity: "rare",
        offered: false,
      },
    ],
  },

  {
    name: "Pear",
    trades: [
      {
        name: "Pear",
        description: `Hello from Pear! We're looking to purchase some datachunks from you.`,
        payout: randomizePayout(100000),
        cost: 10000,
        duration: 7,
        rarity: "low",
        offered: false,
      },
      {
        name: "Pear",
        description: `We're always looking to improve our products with your datachunks.`,
        payout: randomizePayout(50000),
        cost: 1000,
        duration: 14,
        rarity: "medium",
        offered: false,
      },
      {
        name: "Pear",
        description: `The plot thins. Add your datachunks to the story - consider our offer to purchase them.`,
        payout: randomizePayout(25000),
        cost: 500,
        duration: 30,
        rarity: "high",
        offered: false,
      },
      {
        name: "Pear",
        description: `One more thing... we'd like to make you an offer that's revolutionary.`,
        payout: randomizePayout(1000000),
        cost: 100000,
        duration: 3,
        rarity: "rare",
        offered: false,
      },
    ],
  }, {
    name: "GooGoo!",
    trades: [
      {
        name: "GooGoo!",
        description: `Hello! We're looking to purchase some datachunks from you.`,
        payout: randomizePayout(100000),
        cost: 10000,
        duration: 7,
        rarity: "high",
        offered: false,
      },
      {
        name: "GooGoo!",
        description: `We're looking to improve our products with your datachunks.`,
        payout: randomizePayout(50000),
        cost: 1000,
        duration: 14,
        rarity: "medium",
        offered: false,
      },

      {
        name: "GooGoo!",
        description: `We're looking to improve our products with your datachunks.`,
        payout: randomizePayout(25000),
        cost: 500,
        duration: 30,
        rarity: "low",
        offered: false,
      },
      {
        name: "GooGoo!",
        description: `Sell us your datachunks, and you could win big!`,
        payout: randomizePayout(1000000),
        cost: 100000,
        duration: 3,
        rarity: "rare",
        offered: false,
      },
    ],
  }, {
    name: "Michaelsoft",
    trades: [
      {
        name: "Michaelsoft",
        description: `Hey there [COMPANY]! We're looking for some datachunks to help us improve our products.`,
        payout: randomizePayout(100000),
        cost: 10000,
        duration: 7,
        rarity: "high",
        offered: false,
      },
      {
        name: "Michaelsoft",
        description: `We'd like to improve MichaelSoft Office 365 for everyone.
            Support our endeavors by selling us your datachunks.`,
        payout: randomizePayout(50000),
        cost: 1000,
        duration: 14,
        rarity: "medium",
        offered: false,
      },
      {
        name: "Michaelsoft",
        description: `We're looking to improve our range of services with your datachunks.`,
        payout: randomizePayout(25000),
        cost: 500,
        duration: 30,
        rarity: "low",
        offered: false,
      },
      {
        name: "Bob Grapes",
        description: `Hey [COMPANY]! It's Bob Grapes, CEO of Michaelsoft.
            My wife left me, and I'm looking to buy some datachunks to numb the pain.`,
        payout: randomizePayout(1000000),
        cost: 100000,
        duration: 3,
        rarity: "rare",
        offered: false,
      },
    ],
  },
];



function removeTrade() {
  activeTradeCount--;
  if (activeTradeCount === 0) {
    document.getElementById('datachunk_blurb').style.display = "block";
  } else {
    document.getElementById('datachunk_blurb').style.display = "none";
  }
}

function sendTradeOffer(company) {
  document.getElementById('datachunk_blurb').style.display = "none";
  activeTradeCount++;
  // get a random trade from the company's trades array
  var randomTrade = company.trades[Math.floor(Math.random() * company.trades.length)];
  // check if the player has already been offered this trade
  if (!randomTrade.offered) {
    // if not, add it to the list
    document.getElementById("datapoint-trade-list").innerHTML += `
    <div class = "datapoint_trade_listing_item" id = "${randomTrade.name.replace(/\s/g, '')}">
    <span>${randomTrade.name}</span>
    <h3>${randomTrade.description}</h3>
    <h4><i class = "ri-money-dollar-circle-fill"></i> ${randomTrade.payout}</h4>
    <h4><i class="ri-time-fill"></i> ${randomTrade.duration} DAYS</h4>
    <button onclick = "acceptTrade('${randomTrade.name.replace(/\s/g, '')}', ${randomTrade.payout}, ${randomTrade.cost})" ><i class="ri-database-2-fill"></i> ${randomTrade.cost} - ACCEPT</button>
    <button style = "color:green;background-color:transparent" onclick = "document.getElementById('${randomTrade.name.replace(/\s/g, '')}').remove();removeTrade();" ><i class="ri-close-fill"></i> DECLINE</button>
    </div>
    `;
    // mark the trade as offered
    randomTrade.offered = true;

    // set a timeout to remove the trade from the list after the duration has passed

    setTimeout(function () {
      document.getElementById(randomTrade.name.replace(/\s/g, '')).remove();
    }, randomTrade.duration * dailyMillisecondValue);

  } else {
    // if the trade has already been offered, don't add it to the list
    console.log("trade already offered");
  }



}

function sendTradeOffers() {

  // get a random number between 2 and 3, at the very most.
  var numberOfOffers = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  // get a random number between 0 and 4
  var randomCompanyIndex = Math.floor(Math.random() * (4 - 0 + 1) + 0);
  // get a random company from the thirdPartyCompanies array
  var randomCompany = thirdPartyCompanies[randomCompanyIndex];
  // send a trade offer from the random company
  for (var i = 0; i < numberOfOffers; i++) {
    sendTradeOffer(randomCompany);
  }

  // give the #player-datapoints element a pulsing animation to indicate new trades available
  document.getElementById('player-datapoints').style.animation = "pulse-notif 1s infinite";

}

function acceptTrade(name, payout, cost) {
  // check if the player has enough datapoints to accept the trade
  if (player.datapoints >= cost) {
    // if they do, add the payout to their balance and subtract the cost from their datapoints
    updateBalance("add", payout);
    updateDatapoints("subtract", cost);
    // remove the trade from the list
    document.getElementById(name).remove();
    // mark the trade as not offered
    var company = thirdPartyCompanies.find(company => company.name === name);
    var trade = company.trades.find(trade => trade.name === name);
    trade.offered = false;
  } else {
    alert("You don't have enough datachunks to accept this trade!");
  }
}

