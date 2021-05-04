const eventNameInput = document.getElementById('event-name-input')
const eventNameSummary = document.getElementById('event-name');
const eventDateSummary = document.getElementById('event-date-summary');
const calendarListener = document.querySelector('.calendar');
let eventObj = {};


calendarListener.addEventListener('daySelected', e => {
    eventObj.date = dayjs(`${e.target.dataset.date}`).format('DD.MM.YYYY');
    eventDateSummary.innerHTML = eventObj.date;
});

eventNameInput.addEventListener('change', e => {
    eventObj.name = e.target.value
    eventNameSummary.innerHTML = eventObj.name;
});