function runTechSupportScam() {
    const classRoll = Math.random();
    const isPoor = classRoll < 0.4;
    const isRich = classRoll < 0.3;
  
    const person = {
      class: isPoor ? "poor" : isRich ? "rich" : "middle",
      money: Math.floor(Math.random() * (isPoor ? 1000 : isRich ? 30000 : 8000) + (isPoor ? 250 : isRich ? 10000 : 1500)), // Halved monetary values
      defense: Math.floor(Math.random() * (isPoor ? 10 : 20)) + 1 // Halved defense values
    };
  
    person.defense = Math.max(0, person.defense - person.defense * (player.persuasiveness * 0.15));
  
    const randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * (player.persuasiveness * 2)));
    const scamSucceeded = randomNumbers.some(num => num >= person.defense); // Changed comparison to >=
  
    if (scamSucceeded) {
      const cut = person.money;
      const datapoints = cut * 0.1;
      updateBalance("add", Math.ceil(cut - datapoints));
      updateDatapoints("add", Math.ceil(datapoints));
      player.persuasiveness +=1 / Math.log(player.persuasiveness + 2);
      player.income += Math.ceil(cut-datapoints);
      return `scam succeeded, player got ${cut - datapoints} dollars and ${datapoints} datapoints`;
    } else {
      const consolation = (person.money / 10) * 0.01 * Math.exp(-player.money / 10000);
      const datapoints = consolation * 0.1;
      player.persuasiveness+= 0.0025 / Math.log(player.persuasiveness + 2);
      player.income += Math.ceil(consolation-datapoints);
      updateBalance("add", Math.floor(consolation - datapoints));
      updateDatapoints("add", Math.floor(datapoints));
      return `scam failed, player got ${consolation - datapoints} dollars and ${datapoints} datapoints`;
    }
  }


function runCreditCardScam() {
  const classRoll = Math.random();
  const isPoor = classRoll < 0.4; // Lowered chance of poor person
  const isRich = classRoll < 0.25; // Lowered chance of rich person

  const person = {
    class: isPoor ? "poor" : isRich ? "rich" : "middle",
    money: Math.floor(Math.random() * (isPoor ? 2000 : isRich ? 30000 : 8000) + (isPoor ? 500 : isRich ? 10000 : 3000)),
    defense: Math.floor(Math.random() * (isPoor ? 20 : 40)) + 1 // Lowered maximum defense score
  };

  person.defense = Math.max(0, person.defense - person.defense * (player.persuasiveness * 0.15)); // Increased impact of persuasiveness

  const randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * (player.persuasiveness * 2)) ); // Increased range of random numbers
  const scamSucceeded = randomNumbers.some(num => num > person.defense);

  if (scamSucceeded) {
    const cut = person.money;
    updateBalance("add", Math.ceil(cut));
    player.income += Math.ceil(cut);
    if (player.persuasiveness > 5) {
      player.persuasiveness += 0.01 / Math.log(player.persuasiveness+2);
    } else {
    player.persuasiveness +=0.075 / Math.log(player.persuasiveness+2);
    }
    return `scam succeeded, player got ${cut} dollars`;
  } else {
    const consolation = (person.money / 10) * 0.01 * Math.exp(-player.money / 10000);
    player.persuasiveness+= 0.0025 / Math.log(player.persuasiveness + 2);
    player.income += Math.floor(consolation);
    updateBalance("add", Math.floor(consolation));
    return `scam failed, player got ${consolation} dollars`;
  }
}


