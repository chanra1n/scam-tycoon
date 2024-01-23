let buildingMode = false;

    document.getElementById('toggle-building-mode').addEventListener('click', () => {
      buildingMode = !buildingMode;

      if (buildingMode) {
        document.getElementById('toggle-building-mode').style.backgroundColor = "#00ff00";
      } else {
        document.getElementById('toggle-building-mode').style.backgroundColor = "transparent";
      }
    });

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      item.addEventListener('click', () => {
        if (buildingMode && item.classList.contains('habitable')) {
          const buildingType = document.getElementById('building-select').value;
          item.classList.remove('habitable');
          item.classList.add(buildingType);
        }
      });
    });