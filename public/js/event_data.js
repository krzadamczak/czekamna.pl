const saveButton = document.getElementById('save');

saveButton.addEventListener('click', e => {
    if(typeof eventObj.name === 'undefined'){
        eventNameSummary.innerHTML = 'Twoje wydarzenie musi mieć nazwę. Przejdź na górę strony i napisz, na co czekasz.';
    }
    if(typeof eventObj.date === 'undefined'){
        eventDateSummary.innerHTML = 'Wybierz dzień na który czekasz.';
    }
    if(typeof eventObj.name !== 'undefined' && typeof eventObj.date !== 'undefined'){
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

class EventData{
    constructor(){
        this._saveButton = document.getElementById('save');
        this._eventNameSummary = document.getElementById('event-name');
        this._eventDateSummary = document.getElementById('event-date');
        this._eventObj = {};
        this._tempEventObj = dayjs().endOf('day').startOf('minute');
        this._testFlag = false;
    }
    handleEventName(e){
        this._eventObj.name = e.target.value;
        this._eventNameSummary.innerHTML = this._eventObj.name;
    }
    handleCalendar(e){
        let tempDate = e.target.dataset.date.split('-');
        this._tempEventObj = this._tempEventObj.date(parseInt(tempDate[2]));
        this._tempEventObj = this._tempEventObj.month(parseInt(tempDate[1]) - 1); //Liczenie miesięcy w dayjs zaczyna się od 0, nie od 1.
        this._tempEventObj = this._tempEventObj.year(parseInt(tempDate[0]));
        this._eventObj.date = this._tempEventObj.format();
        this._eventDateSummary.innerHTML = this._tempEventObj.format('DD.MM.YYYY [o godzinie] HH:mm');
    }
    handleTimeValidation(e){
        let selection = e.target.selectionStart;
        let max = (e.target.id === 'hours') ? 23 : 59;
    
        if(e.target.value.length === 3){ e.target.value = e.target.value.slice(0, -1); }
        e.target.setSelectionRange(selection, selection);
    
        if(e.target.selectionStart >= 2){
            if(parseInt(e.target.value) > max){
                e.target.value = max;
            }
        }
    }
    
    handleKeyValidation(e){
        if(!/(Home|End|Tab|Backspace|Delete)|[0-9]/.test(e.code)){
            e.preventDefault();
        }
        if((e.code === 'Backspace' || e.code === 'Delete') && e.target.value.length === 1){
            if(e.target.id === 'hours'){
                tempEventObj = tempEventObj.hour(23);
            }
            else{
                tempEventObj = tempEventObj.minute(59);
            }
            testFlag = true;
        }
    }
    
    handleChangeFocus(e){
        if((e.target.id === 'hours') && (e.target.selectionStart === 2)){
            minutesForm.focus();
            minutesForm.setSelectionRange(0, 0);
        }
        else if((e.target.id === 'minutes') && (e.code === 'Backspace') && (e.target.value.length === 0)){
            hoursForm.focus();
        }
    }
    
    handleTimeForm(e){
        this.handleTimeValidation(e);
        if(!testFlag){
            if(e.target.id === 'hours'){
                tempEventObj = tempEventObj.hour(parseInt(e.target.value));
            }
            else{
                tempEventObj = tempEventObj.minute(parseInt(e.target.value));
            }
            eventObj.date = tempEventObj.format();
        }
        else{
            testFlag = false;
        }
        eventDateSummary.innerHTML = tempEventObj.format('DD.MM.YYYY [o godzinie] HH:mm');
    }
    init(){
        const hoursForm = document.getElementById('hours');
        const timeFormColon = document.querySelector('.time-form__colon');
        const minutesForm = document.getElementById('minutes');
        const eventNameInput = document.getElementById('event-name-input');
        const calendar = document.querySelector('.calendar');
        
        const handleEventNameRef = this.handleEventName.bind(this);
        const handleCalendarRef = this.handleCalendar.bind(this);
        const handleKeyValidationRef = this.handleKeyValidation.bind(this);
        const handleChangeFocusRef = this.handleChangeFocus.bind(this);
        const handleTimeFormRef = this.handleTimeForm.bind(this);

        eventNameInput.addEventListener('input', handleEventNameRef);
        calendar.addEventListener('daySelected', handleCalendarRef);
        hoursForm.addEventListener('keydown', handleKeyValidationRef);
        minutesForm.addEventListener('keydown', handleKeyValidationRef);
        hoursForm.addEventListener('keyup', handleChangeFocusRef);
        minutesForm.addEventListener('keyup', handleChangeFocusRef);
        hoursForm.addEventListener('input', handleTimeFormRef);
        minutesForm.addEventListener('input', handleTimeFormRef);

        timeFormColon.addEventListener('click', () => hoursForm.focus());
    }
}

const eventData = new EventData();
eventData.init();