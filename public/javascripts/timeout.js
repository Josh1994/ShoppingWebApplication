var IDLE_TIMEOUT = 60; //seconds
var idleSecondsTimer = null;
var idleSecondsCounter = 0;

document.onclick = function() {
    idleSecondsCounter = 0;
};

document.onmousemove = function() {
    idleSecondsCounter = 0;
};

document.onkeypress = function() {
    idleSecondsCounter = 0;
};

idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);

function CheckIdleTime() {
     idleSecondsCounter++;
     var oPanel = document.getElementById("SecondsUntilExpire");
     if (oPanel)
         oPanel.innerHTML = (IDLE_TIMEOUT - idleSecondsCounter) + "";
    if (idleSecondsCounter >= IDLE_TIMEOUT) {
        window.clearInterval(idleSecondsTimer);
        alert("You have been logged off!");

        document.location.href = "/logout";
    }
}