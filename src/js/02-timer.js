import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysAmount: document.querySelector('[data-days]'),
  hoursAmount: document.querySelector('[data-hours]'),
  minutesAmount: document.querySelector('[data-minutes]'),
  secondsAmount: document.querySelector('[data-seconds]'),
  daysText: document.querySelector('[data-days-text]'),
  hoursText: document.querySelector('[data-hours-text]'),
  minutesText: document.querySelector('[data-minutes-text]'),
  secondsText: document.querySelector('[data-seconds-text]'),
};

refs.btnStart.setAttribute('disabled', 'true');
refs.btnStart.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.info('', '"Please choose a date in the future."', 'Okay');
    }

    if (selectedDates[0].getTime() > Date.now()) {
      refs.btnStart.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr(refs.inputEl, options);

function startTimer() {
  let timerId = setInterval(() => {
    const currentTime = Date.now();
    const goalTime = fp.selectedDates[0].getTime();

    if (goalTime < currentTime) {
      clearInterval(timerId);
      return;
    }
    const timeTimer = convertMs(goalTime - currentTime);
    updateTimeTimer(timeTimer);
    updateTextTimer();
  }, 1000);
}

function updateTimeTimer(time) {
  const { days, hours, minutes, seconds } = time;
  refs.daysAmount.textContent = addLeadingZero(days);
  refs.hoursAmount.textContent = addLeadingZero(hours);
  refs.minutesAmount.textContent = addLeadingZero(minutes);

  refs.secondsAmount.textContent = addLeadingZero(seconds);
}

function updateTextTimer() {
  if (refs.daysAmount.textContent === '01') {
    refs.daysText.textContent = 'Day';
  } else {
    refs.daysText.textContent = 'Days';
  }

  if (refs.hoursAmount.textContent === '01') {
    refs.hoursText.textContent = 'Hour';
  } else {
    refs.hoursText.textContent = 'Hours';
  }

  if (refs.minutesAmount.textContent === '01') {
    refs.minutesText.textContent = 'Minute';
  } else {
    refs.minutesText.textContent = 'Minutes';
  }

  if (refs.secondsAmount.textContent === '01') {
    refs.secondsText.textContent = 'Second';
  } else {
    refs.secondsText.textContent = 'Seconds';
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
