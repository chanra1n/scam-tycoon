
const adminBuildingImages = [
  'sprites/admin_building_1.png',
];

const restaurantBuildingImages = [
  'sprites/rest_1.png',
  'sprites/rest_2.png',
];

const houseBuildingImages = [
  'sprites/house_1.png',
  'sprites/house_2.png',
  'sprites/house_3.png',
];

const officeBuildingImages = [
  'sprites/office_building_1.png',
];

document.querySelectorAll('.admin-buildings').forEach((building) => {
  const randomImage = adminBuildingImages[Math.floor(Math.random() * adminBuildingImages.length)];
  building.style.backgroundImage = `url('${randomImage}')`;
  building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
});

document.querySelectorAll('.restaurants').forEach((building) => {
  const randomImage = restaurantBuildingImages[Math.floor(Math.random() * restaurantBuildingImages.length)];
  building.style.backgroundImage = `url('${randomImage}')`;
  building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
});

document.querySelectorAll('.homes').forEach((building) => {
  const randomImage = houseBuildingImages[Math.floor(Math.random() * houseBuildingImages.length)];
  building.style.backgroundImage = `url('${randomImage}')`;
  building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
});

document.querySelectorAll('.office-building').forEach((building) => {
  const randomImage = officeBuildingImages[Math.floor(Math.random() * officeBuildingImages.length)];
  building.style.backgroundImage = `url('${randomImage}')`;
  building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
});



function initBuildingAppearance () {
document.querySelectorAll('.admin-buildings').forEach((building) => {
        const randomImage = adminBuildingImages[Math.floor(Math.random() * adminBuildingImages.length)];
        building.style.backgroundImage = `url('${randomImage}')`;
        building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      });

      document.querySelectorAll('.restaurants').forEach((building) => {
        const randomImage = restaurantBuildingImages[Math.floor(Math.random() * restaurantBuildingImages.length)];
        building.style.backgroundImage = `url('${randomImage}')`;
        building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      });

      document.querySelectorAll('.homes').forEach((building) => {
        const randomImage = houseBuildingImages[Math.floor(Math.random() * houseBuildingImages.length)];
        building.style.backgroundImage = `url('${randomImage}')`;
        building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      });

      document.querySelectorAll('.office-building').forEach((building) => {
        const randomImage = officeBuildingImages[Math.floor(Math.random() * officeBuildingImages.length)];
        building.style.backgroundImage = `url('${randomImage}')`;
        building.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      });
    }