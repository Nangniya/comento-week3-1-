const currentBatteryBox = document.querySelector("#current_battery");
const currentTimeBox = document.querySelector("#current_time");
const currentAlramBox = document.querySelector(".current_alram");
const powerBtn = document.querySelector("#power-btn");
const hourInput = document.querySelector("#hour");
const minuteInput = document.querySelector("#minute");
const secondInput = document.querySelector("#second");
const addButton = document.querySelector("#add_alram");
const alramList = document.querySelector("#current_alram");

let battery = 5;

function updateCurrentBattery() {
  if (battery > 0) {
    battery -= 1;
    currentBatteryBox.innerText = battery;
  } else {
    currentTimeBox.innerText = "";
    currentTimeBox.style.backgroundColor = "black";
    currentAlramBox.style.backgroundColor = "black";
    powerBtn.style.backgroundColor = "tomato";
  }
}

function powerOn() {
  if (battery === 0) {
    battery = 100;
    currentTimeBox.style.backgroundColor = "transparent";
    currentAlramBox.style.backgroundColor = "transparent";
    powerBtn.style.backgroundColor = "yellowgreen";
  }
}

function updateCurrentTime() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() <= 9
      ? "0" + currentDate.getMonth()
      : currentDate.getMonth()
  }-${
    currentDate.getDate() <= 9
      ? "0" + currentDate.getDate()
      : currentDate.getDate()
  } ${
    currentDate.getHours() <= 9
      ? "0" + currentDate.getHours()
      : currentDate.getHours()
  }:${
    currentDate.getMinutes() <= 9
      ? "0" + currentDate.getMinutes()
      : currentDate.getMinutes()
  }:${
    currentDate.getSeconds() <= 9
      ? "0" + currentDate.getSeconds()
      : currentDate.getSeconds()
  }`;
  currentTimeBox.innerText = formattedDate;
}

function addAlram() {
  if (alramList.childNodes.length >= 3) {
    alert("3개 이상 추가할 수 없습니다.");
    return;
  }
  let hours = hourInput.value;
  let minutes = minuteInput.value;
  let seconds = secondInput.value;
  if (hours === "" || minutes === "" || seconds === "") {
    alert("시/분/초를 모두 입력해주세요.");
    return;
  }
  let now = Date.now();
  let alramDate = new Date();
  alramDate.setHours(hours, minutes, seconds);
  if (alramDate - now < 0) {
    alramDate.setDate(alramDate.getDate() + 1);
  }
  const formattedHours =
    alramDate.getHours() <= 9
      ? "0" + alramDate.getHours()
      : alramDate.getHours();
  const formattedMinutes =
    alramDate.getMinutes() <= 9
      ? "0" + alramDate.getMinutes()
      : alramDate.getMinutes();
  const formattedSeconds =
    alramDate.getSeconds() <= 9
      ? "0" + alramDate.getSeconds()
      : alramDate.getSeconds();
  const alram = document.createElement("li");
  alramList.appendChild(alram);
  alram.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  hourInput.value = "";
  minuteInput.value = "";
  secondInput.value = "";
  let timeDiff = alramDate - now;
  let hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  let minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  let secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
  setTimeout(() => {
    alert("안녕하세요");
  }, timeDiff);
  alert(
    `${hoursDiff}시간 ${minutesDiff}분 ${secondsDiff}초 후에 알람이 울립니다.`
  );
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

currentBatteryBox.innerText = battery;
setInterval(updateCurrentBattery, 1000);

addButton.addEventListener("click", addAlram);
powerBtn.addEventListener("click", powerOn);
