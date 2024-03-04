
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
      if (layout[i][j] === "habitable") {
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






