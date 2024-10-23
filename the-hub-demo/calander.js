const monthYear = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();
let selectedDate = null;

export function renderCalendar() {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  // Today's date for comparison
  const today = new Date();

  // Set month and year in the header
  monthYear.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  // Clear previous days
  calendarDays.innerHTML = '';

  // Get the first and last day of the current month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  // Add blank days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const blankDay = document.createElement('div');
    calendarDays.appendChild(blankDay);
  }

  // Add days of the month
  for (let day = 1; day <= lastDateOfMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('w-fit', 'px-3', 'py-2', 'rounded', 'hover:bg-blue-200', 'cursor-pointer', 'flex', 'items-center', 'justify-center', 'rounded-tr-3xl', 'text-[.4vw]');
    dayElement.innerText = day;

    const currentLoopDate = new Date(year, month, day);

    // Disable past dates
    if (currentLoopDate < today.setHours(0, 0, 0, 0)) {
      dayElement.classList.add('text-gray-400', 'cursor-not-allowed');
    } else {
      // Add click event for selectable dates
      dayElement.addEventListener('click', function() {
        if (selectedDate) {
          selectedDate.classList.remove('bg-red-400', 'text-white'); // Remove previous selection
        }
        dayElement.classList.add('bg-red-400', 'text-white'); // Highlight selected day
        selectedDate = dayElement; // Update selected date
      });
    }

    // Highlight today's date
    if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      dayElement.classList.add('bg-blue-500', 'text-white');
    }

    calendarDays.appendChild(dayElement);
  }
}

// Event listeners for previous and next month
prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();
