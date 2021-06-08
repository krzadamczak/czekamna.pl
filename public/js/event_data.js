class EventData{
    constructor(){
        this._hoursForm = document.getElementById('hours');
        this._timeFormColon = document.querySelector('.time-form__colon');
        this._minutesForm = document.getElementById('minutes');
        this._saveButton = document.getElementById('save');
        this._eventNameSummary = document.getElementById('event-name');
        this._eventDateSummary = document.getElementById('event-date');
        this._eventObj = {};
        this._tempEventObj = dayjs();
        this._testFlag = false;
    }
    handleEventName(e){
        this._eventObj.name = e.target.value;
        this._eventNameSummary.innerHTML = this._eventObj.name;
    }
    handleCalendar(e){
        this._tempEventObj = dayjs(e.target.dataset.date).endOf('day').startOf('minute');
        this._eventObj.date = this._tempEventObj.format();
        this._eventDateSummary.innerHTML = this._tempEventObj.format('DD.MM.YYYY [o godzinie] HH:mm');
    }
    handleTimeValidation(e){
        const selection = e.target.selectionStart;
        const max = (e.target.id === 'hours') ? 23 : 59;
    
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
        if((e.code === 'Backspace' || e.code === 'Delete') && (e.target.value.length === 1 || (e.target.selectionStart === 0 && e.target.selectionEnd === 2))){
            if(e.target.id === 'hours'){
                this._tempEventObj = this._tempEventObj.hour(23);
            }
            else{
                this._tempEventObj = this._tempEventObj.minute(59);
            }
            this._testFlag = true;
        }
    }
    
    handleChangeFocus(e){
        if((e.target.id === 'hours') && (e.target.selectionStart === 2)){
            this._minutesForm.focus();
            this._minutesForm.setSelectionRange(0, 0);
        }
        else if((e.target.id === 'minutes') && (e.code === 'Backspace') && (e.target.value.length === 0)){
            this._hoursForm.focus();
        }
    }    
    handleTimeForm(e){
        this.handleTimeValidation(e);
        if(!this._testFlag){
            if(e.target.id === 'hours'){
                this._tempEventObj = this._tempEventObj.hour(parseInt(e.target.value));
            }
            else{
                this._tempEventObj = this._tempEventObj.minute(parseInt(e.target.value));
            }
            this._eventObj.date = this._tempEventObj.format();
        }
        else{
            this._testFlag = false;
        }
        this._eventDateSummary.innerHTML = this._tempEventObj.format('DD.MM.YYYY [o godzinie] HH:mm');
    }
    handleValidationBeforeSave(e){
        let validationFlag = true;
        if(typeof this._eventObj.name === 'undefined'){
            this._eventNameSummary.innerHTML = 'Twoje wydarzenie musi mieć nazwę. Przejdź na górę strony i napisz, na co czekasz.';
            validationFlag = false;
        }

        if(typeof this._eventObj.date === 'undefined'){
            this._eventDateSummary.innerHTML = 'Wybierz dzień na który czekasz.';
            validationFlag = false;
        }

        if(this._tempEventObj.isBefore(dayjs())){
            this._eventDateSummary.innerHTML = 'Nie możesz odliczać do momentu, który już minął.';
            validationFlag = false;
        }

        return validationFlag;
    }
    handleSave(e){
        if(this.handleValidationBeforeSave()){
            this._eventObj.urlID = Math.floor(((Math.random() * 10) * Date.now())).toString(16);
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this._eventObj)
            }).then(res => res.json())
              .then(data => console.log(data))
              .then(window.location.href = `/${this._eventObj.urlID}`);
        }
    }
    init(){
        const hoursForm = document.getElementById('hours');
        const timeFormColon = document.querySelector('.time-form__colon');
        const minutesForm = document.getElementById('minutes');
        const eventNameInput = document.getElementById('event-name-input');
        const calendar = document.querySelector('.calendar');
        const saveButton = document.getElementById('save');
        
        const handleEventNameRef = this.handleEventName.bind(this);
        const handleCalendarRef = this.handleCalendar.bind(this);
        const handleKeyValidationRef = this.handleKeyValidation.bind(this);
        const handleChangeFocusRef = this.handleChangeFocus.bind(this);
        const handleTimeFormRef = this.handleTimeForm.bind(this);
        const handleSaveRef = this.handleSave.bind(this);

        
        calendar.addEventListener('daySelected', handleCalendarRef);

        hoursForm.addEventListener('keydown', handleKeyValidationRef);
        minutesForm.addEventListener('keydown', handleKeyValidationRef);

        hoursForm.addEventListener('keyup', handleChangeFocusRef);
        minutesForm.addEventListener('keyup', handleChangeFocusRef);

        eventNameInput.addEventListener('input', handleEventNameRef);
        hoursForm.addEventListener('input', handleTimeFormRef);
        minutesForm.addEventListener('input', handleTimeFormRef);

        saveButton.addEventListener('click', handleSaveRef);
        timeFormColon.addEventListener('click', () => hoursForm.focus());
    }
}

const eventData = new EventData();
eventData.init();