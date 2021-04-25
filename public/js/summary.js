const eventNameInput = document.getElementById('event-name-input')
const eventNameSummary = document.getElementById('event-name');
const eventDateSummary = document.getElementById('event-date-summary');
const days = document.querySelectorAll('.calendar__day'); 
let selectedDay;

function dayListener(e){
    let XYZ = dayjs(e.target.dataset.date);
    console.log(XYZ);

    if(selectedDay === undefined){
        selectedDay = e.target;
        selectedDay.classList.add('calendar__day--selected');
    }
    else{
        selectedDay.classList.remove('calendar__day--selected');
        selectedDay = e.target;
        selectedDay.classList.add('calendar__day--selected');
    }
    eventDateSummary.innerHTML = XYZ.format('DD.MM.YYYY');
}

for(let day of days){
    day.addEventListener('click', dayListener);
}

eventNameInput.addEventListener('change', e => {
    eventNameSummary.innerHTML = e.target.value;
});