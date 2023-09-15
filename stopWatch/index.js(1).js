const watch = document.querySelector("#watch");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let priveusTime = 0;
let currentTime = 0;
let pause = true;
let intervalId;
let hers = 0;
let mins = 0;
let secs = 0;

startBtn.addEventListener("click", () => {
    if(pause){
        pause = false;
        startTime = Date.now() - priveusTime;
        intervalId = setInterval(updateTime, 1000);
    }
})

pauseBtn.addEventListener("click", () => {
    if(!pause){
        pause = true;
        priveusTime = Date.now() - startTime
        clearInterval(intervalId);
    }
})

resetBtn.addEventListener("click", () => {
    pause = true;
    clearInterval(intervalId);
    startTime = 0;
    priveusTime = 0;
    currentTime = 0;
    hers = 0;
    secs = 0; 
    mins = 0;

    watch.textContent = "00:00:00";
})

function updateTime(){
    priveusTime = Date.now() - startTime;

    secs = Math.floor((priveusTime / 1000) % 60);
    mins = Math.floor((priveusTime / 1000 / 60) % 60);
    hers = Math.floor((priveusTime / 1000 / 60 / 60) % 60);

    secs = pad(secs);
    mins = pad(mins);
    hers = pad(hers);

    watch.textContent = `${hers}:${mins}:${secs}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}