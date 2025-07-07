// --- Start of showDay function --- //
function showDay() {

  const Days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const Month = ['January','February','March','April','May','June','July','August','September','October','November','December',];
  const Day = new Date();

  let day = Days[Day.getDay()];
  let dd = Day.getDate();
  let month = Month[Day.getMonth()];
  let year = Day.getFullYear();

  const currentDate = `${day}<br>${dd} ${month} ${year}`;
  const days = document.getElementById('day');
  days.innerHTML = currentDate;
  days.style.fontSize = '1.6454rem';
  days.style.fontWeight = '600'

}
// Call function to display Date
showDay();

// --- End of showDay function --- //

function Clock() {

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
  
  const clock = document.getElementById('clock');
  clock.textContent = timeString
  clock.style.fontSize = '1.6454rem';
  clock.style.fontWeight = '600'

}

// Update clock immediately and every second
Clock(); // First call
setInterval(Clock, 1000); // Repeat every 1000ms (1 second)

