    function initToolbars() {
      document.getElementById("topbar").style.top = "0px";
      document.getElementById("world-map").style.filter = "blur(0px)";
      makeItRain();
      dayNightCycle();
      dayNightCycle();
      render();
    }

    function initIntervals() {
      setInterval(monthlyInterval);
      setInterval(dailyInterval);
      setInterval(secondlyInterval);
    }

    function initTime() {
      var date = new Date();
      var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      // if it's day time, do nothing. if it's night time, execute dayNightCycle

      if (time > "18:00:00" || time < "06:00:00") {
        dayNightCycle();
        console.log("It's night time, so we're executing dayNightCycle");
      }

    }
