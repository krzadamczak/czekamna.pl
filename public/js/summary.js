const eventNameInput = document.getElementById('event-name-input')
const eventNameSummary = document.getElementById('event-name');
const eventDateSummary = document.getElementById('event-date');
const calendarListener = document.querySelector('.calendar');
const saveButton = document.getElementById('save');
let eventObj = {};


calendarListener.addEventListener('daySelected', e => {
    eventObj.date = dayjs(`${e.target.dataset.date}`).format('DD.MM.YYYY');
    eventDateSummary.innerHTML = eventObj.date;
});

eventNameInput.addEventListener('change', e => {
    eventObj.name = e.target.value
    eventNameSummary.innerHTML = eventObj.name;
});

saveButton.addEventListener('click', e => {
    eventObj.url = Math.floor(((Math.random() * 10) * Date.now())).toString(16);
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventObj)
    }).then(res => res.json())
      .then(data => console.log(data))
      .then(window.location.href = `/${eventObj.url}`)
});