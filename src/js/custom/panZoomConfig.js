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
  maxZoom: 3.9,
  minZoom: 1,
  boundsPadding: 1,
  beforeWheel: function(e) {
    return !isHovering;
  },
  beforeMouseDown: function(e) {
    return !isHovering;
  },

});



panZoomController.on('zoom', function(e) {
  if (!isHovering) return;

  var zoomLevel = e.getTransform().scale;
  var element = document.getElementById('player');

  if (zoomLevel == 4) {
    panZoomModeEnabled = false;
    element.style.opacity = "100%";
    element.style.transform = "scale(1)";

    var gridSquares = document.getElementsByClassName('grid-item');

    for (var i = 0; i < gridSquares.length; i++) {

      gridSquares[i].style.pointerEvents = "none";
    }


  } else {
    panZoomModeEnabled = true;
    element.style.opacity = "0%";
    element.style.transform = "scale(0.5)";

    var gridSquares = document.getElementsByClassName('grid-item');

    for (var i = 0; i < gridSquares.length; i++) {

      gridSquares[i].style.pointerEvents = "auto";
    }

  }
});


// Get all the elements you want to observe
var elements = document.querySelectorAll('.grid-item');

// Create a new Intersection Observer instance
var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    // If the element is intersecting with the viewport
    if (entry.isIntersecting) {
      // Restore the original opacity value
      entry.target.style.opacity = entry.target.dataset.originalOpacity;
    } else {
      // Save the original opacity value
      if (getComputedStyle(entry.target).opacity !== '0') {
        entry.target.dataset.originalOpacity = getComputedStyle(entry.target).opacity;
        // Set the opacity to 0
        entry.target.style.opacity = '0';
      }
    }
  });
}, {
  // Configure the observer to trigger when the element is completely out of the viewport
  rootMargin: '0%'
});

// Start observing each element
elements.forEach(element => {
  observer.observe(element);
});

