// VARIABLES
const dropZone = document.querySelectorAll("#dropZone li"),
      samplesInstruments = document.querySelectorAll("#samples-instruments li img"),
      playButton = document.querySelector("#play-button"),
      pauseButton = document.querySelector("#pause-button"),
      stopButton = document.querySelector("#stop-button"),
      resetButton = document.querySelector("#reset-button"),
	  sameSpot = document.querySelector('#same_spot'),
      songEl = document.querySelector("#sound-options-section div");
      currentSong = document.querySelector("#sound-options-section audio"),
      currentSongPlayed = false;

let instrumentsOn = [],
    draggedInstrument;
// END VARIABLES

// DRAG AND DROP
function startedDragging() {
    draggedInstrument = this;
}

function draggedOver(e) {
    e.preventDefault();
}

function dropped(e) {
    e.preventDefault();
   
    if (this.children.length == 0) {
        this.appendChild(draggedInstrument);
        playAudio(draggedInstrument.id, this);
    } else {
		sameSpot.style.opacity = 1;
		setTimeout(() => {
			sameSpot.style.opacity = 0;
		}, 3000);
	}
}
// END DRAG AND DROP

// CONTROL AUDIO
function playAudio(selectedInstrument, selectedDropzone) {
    let instrument = document.createElement("audio");    
    instrument.src = `audio/${selectedInstrument}.mp3`;
    instrument.load();
    selectedDropzone.appendChild(instrument);

    instrumentsOn.push(instrument);

    instrument.loop = true;
    instrument.play();
}

function playSong() {
    currentSong.play();
    currentSongPlayed = true;
}

function play() {
    instrumentsOn.forEach(instrument => instrument.play());
    if (currentSongPlayed) {
        currentSong.play();
    }
}

function pause() {
    instrumentsOn.forEach(instrument => instrument.pause());
    currentSong.pause();
}

function stop() {
    instrumentsOn.forEach(instrument => {
        instrument.pause();
        instrument.currentTime = 0;
    });
    currentSong.pause();
    currentSong.currentTime = 0;
    currentSongPlayed = false;
}

function reset() {
    location.reload();
}
// END CONTROL AUDIO



// EVENTLISTENERS
samplesInstruments.forEach(instrument => instrument.addEventListener("dragstart", startedDragging));
dropZone.forEach(zone => zone.addEventListener("dragover", draggedOver));
dropZone.forEach(zone => zone.addEventListener("drop", dropped));

songEl.addEventListener("click", playSong);

playButton.addEventListener("click", play);
pauseButton.addEventListener("click", pause);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
// END EVENTLISTENERS