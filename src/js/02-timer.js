import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector('input[type="text"]');
const buttonStart = document.querySelector('button[data-start]');
let dedline = 0;

buttonStart.setAttribute("disabled", "disabled");

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      
    if (selectedDates[0] <= Date.now()) {
      window.alert('Please choose a date in the future');

    } else {
      buttonStart.removeAttribute("disabled");
      dedline = selectedDates[0].getTime();
    }; 
    
   },
 };
 
 flatpickr(inputEl, options);


const timer = {
   intervalId: null,

   start() {
      this.intervalId = setInterval(() => {
         const now = Date.now();
         const ms = dedline - now;
         if (ms <= 0) {
            this.stop();
            return;
         }
         
         const { days, hours, minutes, seconds } = this.convertMs(ms);

         document.querySelector('span[data-days]').textContent = this.pad(days);
         document.querySelector('span[data-hours]').textContent = this.pad(hours);
         document.querySelector('span[data-minutes]').textContent = this.pad(minutes);
         document.querySelector('span[data-seconds]').textContent = this.pad(seconds);

      }, 1000)
   },

   stop() {
      clearInterval(this.intervalId);
   },


   convertMs(ms) {
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
    },

pad(value) {
   return String(value).padStart(2, 0);
 },

};

buttonStart.addEventListener('click', () => {
   timer.start() ;
})



