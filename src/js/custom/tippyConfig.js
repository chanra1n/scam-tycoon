// Create a global object to store the scam options
var scamOptions = {};
var modifierOptions = {};

tippy('.grid-item:not(.road):not(.water):not(.natural):not(.empty):not(.beach):not(.residential):not(.industrial)', {
  trigger: 'click',
  interactive: true,
  content(reference) {
    return reference.dataset.info;
  },
  allowHTML: true,
  onShow(instance) {
    setTimeout(function(){


      let buildingId = instance.reference.dataset.name;
      let selectBox = document.getElementById(buildingId+"_scam_options");
      let modifierBox = document.getElementById(buildingId+"_modifier_options");
      if (selectBox) {
        // Store the value in the global object
        scamOptions[buildingId] = selectBox.value;
      }

      if (modifierBox) {
        // Store the value in the global object
        modifierOptions[buildingId] = modifierBox.value;
      }

      let buildingOptions = document.getElementById(buildingId+"_player_options");
      if (player.buildingsIndex.includes(buildingId)) {
        //buildingOptions.innerHTML = ownedBuildingOptions;
      }

    },1);


  },
  onHide(instance) {
    let buildingId = instance.reference.dataset.name;
    let selectBox = document.getElementById(buildingId + "_scam_options");
    let modifierBox = document.getElementById(buildingId + "_modifier_options");
    if (selectBox) {
      // Update the value in the global object
      scamOptions[buildingId] = selectBox.value;
    }
    if (modifierBox) {
      // Update the value in the global object
      modifierOptions[buildingId] = modifierBox.value;
    }
  }
});