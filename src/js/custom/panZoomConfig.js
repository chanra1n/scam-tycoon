var worldMap = document.getElementById('world-map');
var isHovering = false;

worldMap.addEventListener('mouseover', function() {
  isHovering = true;
});

worldMap.addEventListener('mouseout', function() {
  isHovering = false;
});

var panZoomController = panzoom(worldMap, {
  bounds: true,
  maxZoom: 4,
  minZoom: 1,
  boundsPadding: 1,
  beforeWheel: function(e) {
    return !isHovering;
  },
  beforeMouseDown: function(e) {
    return !isHovering;
  },
});

panZoomController.on('panstart', function(e) {
  if (!isHovering) return;

});

panZoomController.on('pan', function(e) {
  if (!isHovering) return;

});

panZoomController.on('panend', function(e) {
  if (!isHovering) return;

});

panZoomController.on('zoom', function(e) {
  if (!isHovering) return;

});

panZoomController.on('zoomend', function(e) {
  if (!isHovering) return;

});

panZoomController.on('transform', function(e) {
  if (!isHovering) return;

});