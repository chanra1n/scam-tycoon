    // create 5 third-party companies that will occasionally offer datapoint trades to the player.
    // these companies will have a random chance of offering a trade every 7 days (in-game time)
    // there are 3 classes of trades: 
    // 1. high payout, offered for a very limited amount of time (only lasts 7 days)
    // 2. medium trade, offered for a medium amount of time (lasts 14 days)
    // 3. low trade, offered for a long amount of time (lasts one month)
    // 4. rare payout, offered until the end of the month (no matter what day it currently is)

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
            name: "MichaelSoft",
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
            name: "MichaelSoft",
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
