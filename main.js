var content = document.querySelector('#content');
var toggleCompleted = document.querySelector('#toggle-complete');

window.onload = populate();

toggleCompleted.addEventListener('change', function(){
  var allCompleted = document.querySelectorAll('.race.complete');

  if(this.checked) {
    for(var i=0; i<allCompleted.length; i++) {
      allCompleted[i].style.display = 'block';
    }
  }

  else {
    for(var j=0; j<allCompleted.length; j++) {
      allCompleted[j].style.display = 'none';
    }
  }

});

function populate() {
  for(var i=0; i<allRaces.length; i++) {

    var raceContainer = this.document.createElement('div');
    raceContainer.className = 'race';

    var raceNameP = this.document.createElement('p');
    raceNameP.classList.add('race-item');
    raceNameP.classList.add('race-name');
    raceNameP.innerHTML = allRaces[i].name;

    var raceDateP = this.document.createElement('p');
    raceDateP.classList.add('race-item');
    raceDateP.classList.add('race-date');
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var raceStartDate = new Date(allRaces[i].start).toLocaleDateString("en-US", options);
    var today = new Date().toLocaleDateString("en-US", options);

    if(raceStartDate === today) {
      raceDateP.innerHTML = 'today';
      raceContainer.classList.add('ongoing');
    } 
    
    else {
      raceDateP.innerHTML = raceStartDate.replace(', 2018', '');
    }

    var raceCountdownP = this.document.createElement('p');
    raceCountdownP.classList.add('race-item');
    raceCountdownP.classList.add('race-countdown');
    
    if(allRaces[i].end !== '') {
      var raceEnd = new Date(allRaces[i].end);
      var raceStart = new Date(allRaces[i].start);
      var current = new Date();

      if(current <= raceEnd && current >= raceStart) {
        raceContainer.classList.add('ongoing');
        raceDateP.innerHTML = 'ongoing';

        var stage = (current - raceStart) / 1000 / 60 / 60 / 24;
        var remaining = (raceEnd - current) / 1000 / 60 / 60 / 24;
        remaining = Math.floor(remaining)+1;
        stage = Math.floor(stage) + 1;

        raceCountdownP.innerHTML = 'stage ' + stage + ' ('+remaining+' left)';
      }

      else if(raceEnd < current) {
        raceDateP.innerHTML = 'complete';
        raceCountdownP.innerHTML = 'stage race';
        raceContainer.classList.add('complete');
      }

      else if(current < raceStart) {
        var days = (raceStart - current) / 1000 / 60 / 60 / 24;
        days = Math.floor(days);
        raceCountdownP.innerHTML = days + ' days';
      }
    }

    else {
      var oneDayRaceStart = allRaces[i].start+' 23:59:59';
      oneDayRaceStart = new Date(oneDayRaceStart);
      var oneDayCurrent = new Date();

      if (oneDayRaceStart < oneDayCurrent) {
        raceDateP.innerHTML = 'complete';
        raceContainer.classList.add('complete');
        raceCountdownP.innerHTML = 'one day race';
      }

      else if (oneDayRaceStart > oneDayCurrent) {
        var daysToStart = (oneDayRaceStart - oneDayCurrent) / 1000 / 60 / 60 / 24;
        daysToStart = Math.floor(daysToStart);

        if(daysToStart !== 0) {
          raceCountdownP.innerHTML = daysToStart + ' days';
        }

        else {
          raceCountdownP.innerHTML = 'one day race';
        }
      }
    }

    raceContainer.appendChild(raceNameP);
    raceContainer.appendChild(raceDateP);
    raceContainer.appendChild(raceCountdownP);

    content.appendChild(raceContainer);

  }
}
