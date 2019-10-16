"use strict";

// Get the clock face
const faceGradient = document.querySelector('#g1')
// Distribute the lines
const theLines = document.querySelectorAll('.line')
for (let i = 0; i < theLines.length; i++){
  theLines[i].classList.add(`line${i}`)
}
// Get the hands
const hands = {
  hours: {
    hand: 'hours',
    angle: date => {return (360 * getHours12(date) / 12) + (date.getMinutes() / 2)},
    element: document.querySelector('#hours')
  },
  minutes: {
    hand: 'minutes',
    angle: date => {return (360 * date.getMinutes() / 60) + (date.getSeconds() / 10)},
    element: document.querySelector('#minutes')
  },
  seconds: {
    hand: 'seconds',
    angle: date => { return (360 * date.getSeconds() / 60)},
    element: document.querySelector('#seconds')
  },
};
// Get the date display area
const dateDisplay = document.querySelector('#date')

function getHours12(date) {
  return (date.getHours() + 24) % 12 || 12
}

function timeToHue(hands, date) {
  let angle = hands.hours.angle(date)
  if (angle > 360) {
    angle -= 360
  }
  return angle
}

function update() {
  let date = new Date()
  hands.hours.element.style.transform = `rotateZ(${hands.hours.angle(date)}deg)`
  hands.minutes.element.style.transform = `rotateZ(${hands.minutes.angle(date)}deg)`
  hands.seconds.element.style.transform = `rotateZ(${hands.seconds.angle(date)}deg)`
  dateDisplay.innerHTML = `<span class="year">${date.getFullYear()}</span>
    <span class="month">${(date.getMonth()+1).toString().padStart(2,'0')}</span>
    <span class="day">${date.getDate().toString().padStart(2,'0')}</span>`
  let hue = hands.hours.angle(date)
  faceGradient.innerHTML = `<stop stop-color="hsla(${hue},50%,33%,90%)" offset="0%"/>
    <stop stop-color="hsla(${hue-30},50%,33%,15%)" offset="100%"/>`
}

update()
setInterval(() => {
  update()
}, 250);

