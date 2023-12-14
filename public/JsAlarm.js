var sound = new Audio("./Audio.mp3");
var h2 = document.getElementById('clock');
const setAlarm = document.getElementById("setButton");
const alarmHrs = document.getElementById("alarmhrs");
const alarmMin = document.getElementById("alarmmins");
const alarmSec = document.getElementById("alarmsecs");
const alarmAmpm = document.getElementById("ampm");
let alarmsArray = [];

let alarmIndex = 0;
let hours, minutes, seconds, ampm;

// display current time by the second
var currentTime = setInterval(function () {
	var date = new Date();
	hours = ((date.getHours()));
	minutes = date.getMinutes();
	seconds = date.getSeconds();
	ampm = hours < 12 ? 'AM' : 'PM';

	if (hours > 12) {
		hours = hours - 12;
	} else if (hours == 0) {
		hours = 12;
	} else {
		hours = hours;
	}
	h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;

	alarmsArray.forEach((alarm, index) => {
		if (`${alarm.alarmHour}:${alarm.alarmMinute}:${alarm.alarmSecond} ${alarm.AmPm}` === `${hours}:${minutes}:${seconds} ${ampm}`) {
			sound.play();
			sound.loop = true;
		}
	});
}, 1000);

function addZero(time) {
	return (time < 10) ? "0" + time : time;
}

function hoursMenu() {
	var select = document.getElementById('alarmhrs');
	var hrs = 12
	for (i = 1; i <= hrs; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
hoursMenu();

function minMenu() {
	var select = document.getElementById('alarmmins');
	var min = 59;
	for (i = 0; i <= min; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
minMenu();

function secMenu() {
	var select = document.getElementById('alarmsecs');
	var sec = 59;
	for (i = 0; i <= sec; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
secMenu();

const createAlarm = ((alarmObj) => {
	const { alarmHour, alarmMinute, alarmSecond, AmPm } = alarmObj;
	
  // Get reference to alarmDiv
  const alarmDiv = document.getElementById("alarmDiv");

  // Clear existing content of alarmDiv
  alarmDiv.innerHTML = '';

  // Loop through alarmsArray and create elements dynamically
  alarmsArray.forEach(alarm => {
    // Create container div for each alarm and button pair
    const alarmContainer = document.createElement('div');
    alarmContainer.classList.add('alarmContainer');

    // Create p element for alarm text
    const alarmText = document.createElement('p');
	let hr = addZero(alarm.alarmHour);
	let min = addZero(alarm.alarmMinute);
	let sec = addZero(alarm.alarmSecond);
	alarmText.textContent = `${hr}:${min}:${sec}:${alarm.AmPm}`;

    // Create button element for delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
	deleteButton.classList.add('deleteButton');

	deleteButton.addEventListener("click", () => {
		// Remove the alarm and its container from the array and DOM
		alarmsArray.splice(alarmObj, 1);
		alarmDiv.removeChild(alarmContainer);
		sound.loop = false;
	})
    // Append p and button elements to the container div
    alarmContainer.appendChild(alarmText);
    alarmContainer.appendChild(deleteButton);

    // Append the container div to alarmDiv
    alarmDiv.appendChild(alarmContainer);
  });

})

setAlarm.addEventListener("click", () => {
	alarmIndex += 1;

	let alarmObj = {};
	alarmObj.alarmHour = alarmHrs.value;
	alarmObj.alarmMinute = alarmMin.value;
	alarmObj.alarmSecond = alarmSec.value;
	alarmObj.AmPm = alarmAmpm.value;
	alarmObj.alarmHour.value = addZero();
	alarmObj.alarmMinute.value = addZero();
	alarmObj.alarmSecond.value = addZero();
	alarmsArray.push(alarmObj);
	createAlarm(alarmObj);
});
