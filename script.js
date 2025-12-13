// ----- STATE -----
let currentDate = new Date();
let selectedDate = null;
let events = JSON.parse(localStorage.getItem("calendarEvents") || "{}");

// ----- DOM -----
const monthYearEl = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarGrid");
const dayPanel = document.getElementById("dayPanel");
const selectedDateEl = document.getElementById("selectedDate");
const eventsList = document.getElementById("eventsList");
const addEventForm = document.getElementById("addEventForm");
const eventInput = document.getElementById("eventInput");
const themeSelect = document.getElementById("themeSelect");

// ----- THEME -----
themeSelect.value = localStorage.getItem("calendarTheme") || "light";
document.body.className = themeSelect.value;
themeSelect.addEventListener("change",()=>{
  document.body.className = themeSelect.value;
  localStorage.setItem("calendarTheme",themeSelect.value);
});

// ----- GENERATE CALENDAR -----
function generateCalendar(date){
  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  
  // blank slots for first day
  for(let i=0;i<firstDay;i++){
    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);
  }
  
  for(let day=1;day<=daysInMonth;day++){
    const dayEl = document.createElement("div");
    dayEl.className = "day";
    const thisDate = `${year}-${month+1}-${day}`;
    dayEl.textContent = day;
    
    if(isToday(year,month,day)) dayEl.classList.add("today");
    if(new Date(year,month,day) < new Date()) dayEl.classList.add("past");
    if(events[thisDate]) {
      const dot = document.createElement("div");
      dot.className="event-dot";
      dayEl.appendChild(dot);
    }
    
    dayEl.addEventListener("click",()=>openDayPanel(thisDate));
    
    calendarGrid.appendChild(dayEl);
  }
  
  monthYearEl.textContent = `${date.toLocaleString('default',{month:'long'})} ${year}`;
}

// ----- TODAY CHECK -----
function isToday(y,m,d){
  const today = new Date();
  return today.getFullYear()===y && today.getMonth()===m && today.getDate()===d;
}

// ----- PANEL -----
function openDayPanel(dateStr){
  selectedDate = dateStr;
  selectedDateEl.textContent = dateStr;
  renderEvents();
  dayPanel.classList.add("active");
}
document.getElementById("closePanel").addEventListener("click",()=>dayPanel.classList.remove("active"));

// ----- EVENTS -----
function renderEvents(){
  eventsList.innerHTML = "";
  if(events[selectedDate]){
    events[selectedDate].forEach((ev,i)=>{
      const div = document.createElement("div");
      div.textContent = ev;
      div.addEventListener("dblclick",()=>deleteEvent(i));
      eventsList.appendChild(div);
    });
  }
}

function deleteEvent(index){
  events[selectedDate].splice(index,1);
  if(events[selectedDate].length===0) delete events[selectedDate];
  localStorage.setItem("calendarEvents",JSON.stringify(events));
  renderEvents();
  generateCalendar(currentDate);
}

addEventForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  if(!events[selectedDate]) events[selectedDate]=[];
  events[selectedDate].push(eventInput.value);
  eventInput.value="";
  localStorage.setItem("calendarEvents",JSON.stringify(events));
  renderEvents();
  generateCalendar(currentDate);
});

// ----- MONTH NAV -----
document.getElementById("prevMonth").addEventListener("click",()=>{
  currentDate.setMonth(currentDate.getMonth()-1);
  generateCalendar(currentDate);
});
document.getElementById("nextMonth").addEventListener("click",()=>{
  currentDate.setMonth(currentDate.getMonth()+1);
  generateCalendar(currentDate);
});

// ----- INITIAL -----
generateCalendar(currentDate);
