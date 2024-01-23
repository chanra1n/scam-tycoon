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
          buildingOptions.innerHTML = ownedBuildingOptions;
        }
      },1);
      }
    });

