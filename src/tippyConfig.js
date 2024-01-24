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

      // Get the dimensions of the reference element
      let rect = instance.reference.getBoundingClientRect();

      // Set the maxWidth and maxHeight of the tooltip based on the dimensions of the reference element
      instance.popper.style.maxWidth = rect.width * panZoomController.getZoom() + 'px';
      instance.popper.style.maxHeight = rect.height * panZoomController.getZoom() + 'px';
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