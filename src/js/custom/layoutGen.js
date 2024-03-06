
const gridSize = 48;
const gridContainer = document.querySelector(".grid-container");
var roadSquares = [];

const cityLayout = generateCityLayout(gridSize);
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.classList.add(cityLayout[i][j]);
    gridContainer.appendChild(gridItem);
    gridItem.id = `gridsquare_${i}${j}`;
    gridItem.dataset.position = `${i},${j}`;

    if (cityLayout[i][j] === "road") {
      const isRoadAbove = i > 0 && cityLayout[i - 1][j] === "road";
      const isRoadBelow = i < gridSize - 1 && cityLayout[i + 1][j] === "road";
      const isRoadLeft = j > 0 && cityLayout[i][j - 1] === "road";
      const isRoadRight = j < gridSize - 1 && cityLayout[i][j + 1] === "road";

      const isIntersection = [isRoadAbove, isRoadBelow, isRoadLeft, isRoadRight].filter(Boolean).length > 2;

      if (isIntersection) {
        gridItem.classList.add("intersection");
        if (!isRoadAbove) {
          gridItem.classList.add("intersection-top");
        }
        if (!isRoadBelow) {
          gridItem.classList.add("intersection-bottom");
        }
        if (!isRoadLeft) {
          gridItem.classList.add("intersection-left");
        }
        if (!isRoadRight) {
          gridItem.classList.add("intersection-right");
        }
      } else {
        const isEnd = [isRoadAbove, isRoadBelow, isRoadLeft, isRoadRight].filter(Boolean).length === 1;
        if (isEnd) {
          if (isRoadAbove || isRoadBelow) {
            gridItem.classList.add("vertical");
            if (!isRoadAbove) {
              gridItem.classList.add("road-end-top");
            }
            if (!isRoadBelow) {
              gridItem.classList.add("road-end-bottom");
            }
          } else {
            gridItem.classList.add("horizontal");
            if (!isRoadLeft) {
              gridItem.classList.add("road-end-left");
            }
            if (!isRoadRight) {
              gridItem.classList.add("road-end-right");
            }
          }
        } else {
          if (isRoadAbove || isRoadBelow) {
            gridItem.classList.add("vertical");
          } else {
            gridItem.classList.add("horizontal");
          }
        }
      }
      // add each road square to the roadSquares array, along with its position
      if (cityLayout[i][j] === "road") {
        roadSquares.push([i, j]);
      }
    }
  }
}

function generateCityLayout(size) {
  const layout = [];
  const quarters = ["residential", "industrial", "natural", "water"];
  shuffle(quarters);
  const roadInterval = Math.floor((Math.random() * 1.5) + (Math.random() * 1.5)) + 4; // Randomize the density of the roads
  const turnChance = Math.random() * 0.2 + 0.1; // Randomize the chance of a road turning


  // Create a grid of "residential", "industrial", "natural", and "water" areas
  for (let i = 0; i < size; i++) {
    layout[i] = [];
    for (let j = 0; j < size; j++) {
      const quarter = quarters[Math.floor(i / (size / (2 + Math.random()))) * 2 + Math.floor(j / (size / (2 + Math.random())))];
      layout[i][j] = quarter;
      // alternate natural squares between the classes natural_1, natural_2, and natural
      if (quarter === "natural") {
        if (Math.random() < 0.4) {
          layout[i][j] = "natural_1";
        } else if (Math.random() > 0.4) {
          layout[i][j] = "natural_2";
          // make random natural squares have the background-image "tree_1.png"
            if (Math.random() < 0.2) { 
            layout[i][j] = "natural_2_pos_1";
            } else if (Math.random() < 0.4) {
            layout[i][j] = "natural_2_pos_2";
            } else if (Math.random() < 0.6) {
            layout[i][j] = "natural_2_pos_3";
            } else if (Math.random() < 0.8) {
            layout[i][j] = "natural_2_pos_4";
            } else if (Math.random() <= 1.0) {
            layout[i][j] = "natural_2_pos_5";
            }
        } else {
          layout[i][j] = "natural";
        }
      }
    }
  }



  // Create roads based on the type of the area
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const areaType = layout[i][j];
      if (areaType !== "water") { // Add this line
        if (areaType === "residential" || areaType === "industrial") {
          // Create tightly packed roads for "residential" and "industrial" areas
          if (i % roadInterval === 0 || j % roadInterval === 0) {
            layout[i][j] = "road";
          }
        } else if (areaType === "natural") {
          // Create winding roads for "natural" areas
          if ((i % (2 * roadInterval) < roadInterval && j % roadInterval === 0) ||
            (i % (2 * roadInterval) >= roadInterval && i % roadInterval === 0)) {
            layout[i][j] = "road";
            // Randomly turn the road
            if (Math.random() < turnChance) {
              if (i % (2 * roadInterval) < roadInterval) {
                // The road is currently horizontal, so turn it vertical
                for (let k = i; k < size; k++) {
                  layout[k][j] = "road";
                }
              } else {
                // The road is currently vertical, so turn it horizontal
                for (let k = j; k < size; k++) {
                  layout[i][k] = "road";
                }
              }
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const areaType = layout[i][j];
      if (areaType !== "road" && areaType !== "water" && areaType !== "natural") {
        if ((i > 0 && layout[i - 1][j] === "road") ||
          (j > 0 && layout[i][j - 1] === "road") ||
          (i < size - 1 && layout[i + 1][j] === "road") ||
          (j < size - 1 && layout[i][j + 1] === "road")) {
          layout[i][j] = "habitable";
        }
      }
    }
  }
  
  

  

  // Post-processing to add beach squares
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (layout[i][j] === "water") {
        const isEdgeOfWaterZone = (
          (i > 0 && layout[i - 1][j] !== "water") ||
          (j > 0 && layout[i][j - 1] !== "water") ||
          (i < size - 1 && layout[i + 1][j] !== "water") ||
          (j < size - 1 && layout[i][j + 1] !== "water")
        );

        if (isEdgeOfWaterZone) {
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (i + di >= 0 && i + di < size && j + dj >= 0 && j + dj < size) { // Check that the square is within the grid
                if (layout[i + di][j + dj] !== "water" && layout[i + di][j + dj] !== "road") {
                  layout[i + di][j + dj] = "beach";
                  // make random beach squares have the background-image "sand_1.png"
                  if (Math.random() < 0.1) {
                    layout[i + di][j + dj] = "beach_1";
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  const buildingTypes = ["office-building", "gas-station", "library", "police-station", "fire-station", "admin-buildings", "restaurants", "homes"];
  const buildingLimits = {
    "gas-station": 10,
    "library": 2,
    "police-station": 5,
    "fire-station": 3,
    "restaurants": 10
  };
  const buildingCounts = {
    "gas-station": 0,
    "library": 0,
    "police-station": 0,
    "fire-station": 0,
    "restaurants": 0
  };

  // Generate a list of all habitable locations
  const habitableLocations = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (layout[i][j] && layout[i][j].indexOf("habitable") !== -1) {
        habitableLocations.push([i, j]);
      }
    }
  }

  // Shuffle the habitable locations
  shuffle(habitableLocations);

  // Assign buildings to the habitable locations
  for (const [i, j] of habitableLocations) {
    if (Math.random() < 0.7) { // Only assign a building 70% of the time
      let buildingType;
      do {
        buildingType = buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
      } while (buildingLimits[buildingType] && buildingCounts[buildingType] >= buildingLimits[buildingType]);
      if (buildingType) { // Check that a building type was found
        layout[i][j] = buildingType;
        if (buildingCounts[buildingType] !== undefined) {
          buildingCounts[buildingType]++;
        }
      }
    }
  }

  // Post-processing check for roads
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (layout[i][j] === "road") {
        const neighbors = [
          layout[i - 1] && layout[i - 1][j],
          layout[i + 1] && layout[i + 1][j],
          layout[i][j - 1],
          layout[i][j + 1]
        ].filter(Boolean); // Filter out undefined neighbors
        const nonRoadNeighbors = neighbors.filter(neighbor => neighbor !== "road");
        if (nonRoadNeighbors.length === neighbors.length && nonRoadNeighbors[0]) { // All neighbors are not roads and there is at least one non-road neighbor
          layout[i][j] = nonRoadNeighbors[0]; // Change the road to match its neighbors
        }
      }
    }

  }

  // Post-processing to add beach squares
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (layout[i][j] === "water") {
        const isEdgeOfWaterZone = (
          (i > 0 && layout[i - 1][j] !== "water") ||
          (j > 0 && layout[i][j - 1] !== "water") ||
          (i < size - 1 && layout[i + 1][j] !== "water") ||
          (j < size - 1 && layout[i][j + 1] !== "water")
        );

        if (isEdgeOfWaterZone) {
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (i + di >= 0 && i + di < size && j + dj >= 0 && j + dj < size) { // Check that the square is within the grid
                if (layout[i + di][j + dj] === "empty") {
                  layout[i + di][j + dj] = "beach";
                }
              }
            }
          }
        }
      }
    }
  }


  // Post-processing to ensure no beach or water squares are disconnected
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (layout[i][j] === "beach" || layout[i][j] === "water") {
        const neighbors = [
          layout[i - 1] && layout[i - 1][j],
          layout[i + 1] && layout[i + 1][j],
          layout[i][j - 1],
          layout[i][j + 1]
        ].filter(Boolean); // Filter out undefined neighbors

        const sameTypeNeighbors = neighbors.filter(neighbor => neighbor === layout[i][j]);

        if (sameTypeNeighbors.length === 0) { // If there are no neighbors of the same type
          layout[i][j] = "industrial"; // Change the square to a different type
        }
      }
    }
  }
  // post processing to check for undefined squares
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!layout[i][j]) {
        layout[i][j] = "industrial";
      }
    }
  }
  return layout;
}

// get the roadSquares array, and generate a path for the cars to follow

function generatePath() {
  if (!roadSquares.length) {
    throw new Error('roadSquares array is empty');
  }

  const path = [];
  let last = roadSquares[Math.floor(Math.random() * roadSquares.length)];
  path.push(last);

  while (path.length < roadSquares.length) {
    const next = roadSquares[Math.floor(Math.random() * roadSquares.length)];
    const [i, j] = last;
    const [nextI, nextJ] = next;

    if (i === nextI) {
      // The next square is on the same row
      const step = j < nextJ ? 1 : -1;
      for (let k = j + step; k !== nextJ; k += step) {
        const gridItem = document.getElementById(`gridsquare_${i}${k}`);
        if (gridItem.classList.contains("road")) {
          path.push([i, k]);
        }
      }
    } else {
      // The next square is on the same column
      const step = i < nextI ? 1 : -1;
      for (let k = i + step; k !== nextI; k += step) {
        const gridItem = document.getElementById(`gridsquare_${k}${j}`);
        if (gridItem.classList.contains("road")) {
          path.push([k, j]);
        }
      }
    }

    last = next;
  }

  return path;
}




// create a function that identifies the corners of the block
// here are the rules for the corners:
// top-left-corner - a square where the current square is habitable, the square above it is a road, and the square to the left of it is a road.
// top-right-corner - a square where the current square is habitable, the square above it is a road, and the square to the right of it is a road.
// bottom-left-corner - a square where the current square is habitable, the square below it is a road, and the square to the left of it is a road.
// bottom-right-corner - a square where the current square is habitable, the square below it is a road, and the square to the right of it is a road.

function generateBlockCorners() {
  const blockCorners = {
    topLeft: [],
    topRight: [],
    bottomLeft: [],
    bottomRight: []
  };

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const gridItem = document.getElementById(`gridsquare_${i}${j}`);
      if (gridItem.classList.contains("habitable")) {
        const isRoadAbove = i > 0 && document.getElementById(`gridsquare_${i - 1}${j}`).classList.contains("road");
        const isRoadBelow = i < gridSize - 1 && document.getElementById(`gridsquare_${i + 1}${j}`).classList.contains("road");
        const isRoadLeft = j > 0 && document.getElementById(`gridsquare_${i}${j - 1}`).classList.contains("road");
        const isRoadRight = j < gridSize - 1 && document.getElementById(`gridsquare_${i}${j + 1}`).classList.contains("road");

        if (isRoadAbove && isRoadLeft) {
          blockCorners.topLeft.push([i, j]);
        }
        if (isRoadAbove && isRoadRight) {
          blockCorners.topRight.push([i, j]);
        }
        if (isRoadBelow && isRoadLeft) {
          blockCorners.bottomLeft.push([i, j]);
        }
        if (isRoadBelow && isRoadRight) {
          blockCorners.bottomRight.push([i, j]);
        }
      }
    }
  }

  return blockCorners;
}



// now, append an img element with the class .streetlamp to each of the elements in the blockCorners arrays

function addStreetLamps() {
  const blockCorners = generateBlockCorners();

  for (const [cornerType, corner] of Object.entries(blockCorners)) {
    for (const [i, j] of corner) {
      const img = document.createElement("img");
      img.src = "sprites/streetlamp.png";
      img.classList.add("streetlamp");
      img.id = `streetlamp_${i}${j}`;
      console.log(img.id);

      // Set the position based on the corner type
      switch(cornerType) {
        case 'topLeft':
          img.style.top = '0';
          img.style.left = '0';
          break;
        case 'topRight':
          img.style.top = '0';
          img.style.right = '0';
          break;
        case 'bottomLeft':
          img.style.bottom = '0';
          img.style.left = '0';
          break;
        case 'bottomRight':
          img.style.bottom = '0';
          img.style.right = '0';
          break;
      }

      const gridSquare = document.getElementById(`gridsquare_${i}${j}`);
      // if grid is water, do not place streetlamp
      if (gridSquare.classList.contains("water")) {
        continue;
      }
      gridSquare.appendChild(img);
    }
  }
}

// generate a function that adds boats to water squares if they meet these conditions - 
// 1. the square is water
// 2. there are at least 3 water squares to its top, left, right, or bottom
// 3. there are no boats within 3 spaces of the current square
// 4. there are 4 spaces between the border of the grid and the current square


function addBoats() {
  const waterSquares = [];
  let boatGenerated = false;
  for (let i = 4; i < gridSize - 4; i++) {
    for (let j = 4; j < gridSize - 4; j++) {
      const gridItem = document.getElementById(`gridsquare_${i}${j}`);
      if (gridItem.classList.contains("water")) {
        waterSquares.push([i, j]);
      }
    }
  }

  for (const [i, j] of waterSquares) {
    const neighbors = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1]
    ].filter(([i, j]) => i >= 0 && i < gridSize && j >= 0 && j < gridSize);

    const waterNeighbors = neighbors.filter(([i, j]) => {
      const gridItem = document.getElementById(`gridsquare_${i}${j}`);
      return gridItem.classList.contains("water");
    });

    const boatNeighbors = [];
    for (let x = i - 3; x <= i + 3; x++) {
      for (let y = j - 3; y <= j + 3; y++) {
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          const gridItem = document.getElementById(`gridsquare_${x}${y}`);
          if (gridItem.querySelector(".boat")) {
            boatNeighbors.push([x, y]);
          }
        }
      }
    }

    if (waterNeighbors.length >= 3 && !boatNeighbors.length && !boatGenerated) {
      const img = document.createElement("img");
      img.src = "sprites/boat.png";
      img.classList.add("boat");
      img.id = `boat_${i}${j}`;
      const gridSquare = document.getElementById(`gridsquare_${i}${j}`);
      const rect = gridSquare.getBoundingClientRect();
      img.style.position = 'absolute';
      img.style.left = `${rect.left}px`;
      img.style.top = `${rect.top}px`;
      document.getElementById('world-map').appendChild(img);
      boatGenerated = true;
      break;
    }
    
    if (boatGenerated) {
    break;
    }

  if (!boatGenerated) {
    console.log("No boats");
  }
}
}

addStreetLamps();
addBoats();