const hoursForm = document.getElementById('hours');
const minutesForm = document.getElementById('minutes');
const eventNameInput = document.getElementById('event-name-input')
const eventNameSummary = document.getElementById('event-name');
const eventDateSummary = document.getElementById('event-date');
const calendarListener = document.querySelector('.calendar');
const saveButton = document.getElementById('save');
const timeFormColon = document.querySelector('.time-form__colon');
let eventObj = {};
let tempEventObj = dayjs().endOf('day').startOf('minute');

function validateTime(e, max){
    let selection = e.target.selectionStart;
    e.target.value.length === 3 ? e.target.value = e.target.value.slice(0, -1) : null;
    e.target.setSelectionRange(selection, selection);
    if(e.target.selectionStart >= 2){
        if(e.target.id === 'hours'){
            minutesForm.focus();
            minutesForm.setSelectionRange(0, 0);
        }
        if(parseInt(e.target.value) > max){
            e.target.value = max;
        }
    }
}

timeFormColon.addEventListener('click', () => hoursForm.focus());

hoursForm.addEventListener('input', e => {
    validateTime(e, 23);
    tempEventObj = tempEventObj.hour(parseInt(e.target.value));
    eventObj.date = tempEventObj.format();
    eventDateSummary.innerHTML = tempEventObj.format('DD.MM.YYYY [o godzinie] HH:mm');
});

minutesForm.addEventListener('input', e => {
    validateTime(e, 59);
    tempEventObj = tempEventObj.minute(parseInt(e.target.value));
    eventObj.date = tempEventObj.format();
    eventDateSummary.innerHTML = tempEventObj.format('DD.MM.YYYY [o godzinie] HH:mm');
});

calendarListener.addEventListener('daySelected', e => {
    let tempDate = e.target.dataset.date.split('-');
    tempEventObj = tempEventObj.date(parseInt(tempDate[2]));
    tempEventObj = tempEventObj.month(parseInt(tempDate[1]) - 1); //Liczenie miesięcy w dayjs zaczyna się od 0, nie od 1.
    tempEventObj = tempEventObj.year(parseInt(tempDate[0]));
    eventObj.date = tempEventObj.format();
    eventDateSummary.innerHTML = tempEventObj.format('DD.MM.YYYY [o godzinie] HH:mm');
});

eventNameInput.addEventListener('input', e => {
    eventObj.name = e.target.value;
    eventNameSummary.innerHTML = eventObj.name;
});

saveButton.addEventListener('click', e => {
    if(typeof eventObj.name === 'undefined'){
        eventNameSummary.innerHTML = 'Twoje wydarzenie musi mieć nazwę. Przejdź na górę strony i napisz, na co czekasz.';
    }
    else{
        eventObj.urlID = Math.floor(((Math.random() * 10) * Date.now())).toString(16);
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventObj)
        }).then(res => res.json())
          .then(data => console.log(data))
          .then(window.location.href = `/${eventObj.urlID}`);
    }
});