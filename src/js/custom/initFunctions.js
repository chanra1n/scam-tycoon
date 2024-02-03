    function initToolbars() {
      document.getElementById("topbar").style.top = "0px";
      document.getElementById("world-map").style.filter = "blur(0px)";
      makeItRain();
      dayNightCycle();
      dayNightCycle();
    }

    function initIntervals() {
      setInterval(monthlyInterval);
      setInterval(dailyInterval);
      setInterval(secondlyInterval);
    }