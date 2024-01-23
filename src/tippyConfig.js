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
  }
});



