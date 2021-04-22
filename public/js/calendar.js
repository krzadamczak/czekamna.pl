//TODO Uporządkować cały kod!

dayjs.locale('pl');
dayjs.extend(window.dayjs_plugin_weekday);
class Calendar{
    constructor(){
        this._dayjs = dayjs();
        this._selectedDay;
        this._DOMcalendar = document.querySelector('.calendar');
        this._holiday = 0;
        this._offset = 0;
        this._changeYearListenerReference;
        this._holidays = this.allHolidays();
        this._eventDetailsVisible = false;
    }
    startDay(){ return this._dayjs.startOf('month').weekday(); }

    monthStructure(dayjs){
        const result = createElement('div', 'calendar__grid');

        this._dayjs = dayjs;

        result.append(this.daysOfWeek());
        result.append(this.days());

        return result;
    }
    navigation(){
        const result = createElement('div', 'calendar__navigation');
        const monthName = createElement('div', 'calendar__month-name');
        const previous = createElement('div', 'calendar__previous');
        const next = createElement('div', 'calendar__next');

        previous.appendChild(document.createTextNode('<'));
        next.appendChild(document.createTextNode('>'));
        monthName.appendChild(document.createTextNode(this._dayjs.format('MMMM, YYYY')));
        
        result.appendChild(previous);
        result.appendChild(monthName);
        result.appendChild(next);

        return result;
    }
    daysOfWeek(){
        const result = createElement('div', 'calendar__days-of-week');
        const weekdays = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];
        const frag = document.createDocumentFragment();
        let item;

        for(let i = 0; i < 7; i++){
            item = document.createElement('div');
            item.appendChild(document.createTextNode(weekdays[i]));
            frag.append(item);
        }
        result.append(frag);

        return result;
    }
    days(){
        const result = document.createDocumentFragment();
        const weekdaysCSS = ['startOnMon', 'startOnTue', 'startOnWed', 'startOnThu', 'startOnFri', 'startOnSat', 'startOnSun'];
        const daysInMonth = this._dayjs.daysInMonth()
        let day;

        for(let i = 1; i <= daysInMonth; i++){
            this._dayjs = this._dayjs.date(i);
            day = createElement('div', 'calendar__day');
           
            if(i === 1) day.classList.add(weekdaysCSS[this.startDay()]);
            day.appendChild(document.createTextNode(i));
            day.dataset.date = this._dayjs.format('YYYY-MM-DD');

            this.markIfWeekend(day);
            this.markIfHoliday(day);
            this.markCurrentDay(day);

            result.append(day);
        }

        return result;
    }
    dayListener(e){
        console.log(e.target);
        if(this._selectedDay === undefined){
            this._selectedDay = e.target;
            this._selectedDay.classList.add('calendar__day--selected');
        }
        else{
            this._selectedDay.classList.remove('calendar__day--selected');
            this._selectedDay = e.target;
            this._selectedDay.classList.add('calendar__day--selected');
        }
    }
    markIfHoliday(day){
        for(let holiday of this._holidays){
            if(holiday.date.includes(day.dataset.date)){
                day.classList.add('calendar__day--holiday');
                this._holiday++;
            }
        }
    }
    markIfWeekend(day){
        if(this._dayjs.weekday() === 5 || this._dayjs.weekday() === 6){
            day.classList.add('calendar__day--weekend');
            this._holiday++;
        }
    }
    markCurrentDay(day){
        if(dayjs().toISOString().includes(day.dataset.date)){
            day.classList.add('calendar__day--current');
        }
    }
    calculateEaster(){
        let a = this._dayjs.year() % 19;
        let b = Math.floor(this._dayjs.year() / 100);
        let c = this._dayjs.year() % 100;
        let d = Math.floor(b / 4);
        let e = b % 4;
        let f = Math.floor((b + 8) / 25);
        let g = Math.floor((b - f + 1) / 3);
        let h = (19 * a + b - d - g + 15) % 30;
        let i = Math.floor(c / 4);
        let k = c % 4;
        let l = (32 + 2 * e + 2 * i - h - k) % 7;
        let m = Math.floor((a + 11 * h + 22 * l) / 451);
        let p = (h + l - 7 * m + 114) % 31;
        return { day: p + 1, month: (Math.floor(h + l - 7 * m + 114) / 31) - 1 };
    }    
    allHolidays(){
        return [
            {
                name: 'Nowy rok',
                date: this._dayjs.month(0).date(1).toISOString()
            },
            {
                name: 'Święto Trzech Króli',
                date: this._dayjs.month(0).date(6).toISOString()
            },
            {
                name: 'Święto pracy',
                date: this._dayjs.month(4).date(1).toISOString()
            },
            {
                name: 'Święto Narodowe Trzeciego Maja',
                date: this._dayjs.month(4).date(3).toISOString()
            },
            {
                name: 'Wniebowzięcie Najświętszej Marii Panny',
                date: this._dayjs.month(7).date(15).toISOString()
            },
            {
                name: 'Wszystkich świętych',
                date: this._dayjs.month(10).date(1).toISOString()
            },
            {
                name: 'Narodowe Święto Niepodległości',
                date: this._dayjs.month(10).date(11).toISOString()
            },
            {
                name: 'Pierwszy dzień Bożego Narodzenia',
                date: this._dayjs.month(11).date(25).toISOString()
            },
            {
                name: 'Drugi dzień Bożego Narodzenia',
                date: this._dayjs.month(11).date(26).toISOString()
            },
            {
                name: 'Wielkanoc',
                date: this._dayjs.month(this.calculateEaster().month).date(this.calculateEaster().day).toISOString()
            },
            {
                name: 'Poniedziałek Wielkanocny',
                date: this._dayjs.month(this.calculateEaster().month).date(this.calculateEaster().day).add(1, 'day').toISOString()
            },
            {
                name: 'Zielone Świątki',
                date: this._dayjs.month(this.calculateEaster().month).date(this.calculateEaster().day).add(49, 'day').toISOString()
            },
            {
                name: 'Boże Ciało',
                date: this._dayjs.month(this.calculateEaster().month).date(this.calculateEaster().day).add(60, 'day').toISOString()
            }
        ]
    }
    changeMonth(){
        let DOMpreviousMonth = document.querySelector('.calendar__previous');
        let DOMnextMonth = document.querySelector('.calendar__next');
        const monthName = document.querySelector('.calendar__month-name');
        let currentMonth = true;
        let XYZres;

        DOMpreviousMonth.addEventListener('mousedown', e => {
            if(!dayjs().isSame(this._dayjs, 'month')){
                XYZres = this.monthStructure(this._dayjs.subtract(1, 'month'));
                currentMonth = false;
                console.log(XYZres);
            }
            else{
                currentMonth = true;
            }
        });
        DOMpreviousMonth.addEventListener('mouseup', e => {
            if(!currentMonth){
                let test = document.querySelector('.calendar__grid');
                test.remove();
                this.addDaysListener();
    
                this._DOMcalendar.appendChild(XYZres);
                monthName.innerHTML = `${this._dayjs.format('MMMM, YYYY')}`;
                this.addDaysListener();
            }
        });
        DOMnextMonth.addEventListener('mousedown', e => {

           
            XYZres = this.monthStructure(this._dayjs.add(1, 'month'));
            console.log(XYZres);
            
        });
        DOMnextMonth.addEventListener('mouseup', () => {
            let test = document.querySelector('.calendar__grid');
            test.remove();

            this._DOMcalendar.appendChild(XYZres);
            monthName.innerHTML = `${this._dayjs.format('MMMM, YYYY')}`;
            this.addDaysListener();
        });
    }
   
    addDaysListener(){
        const days = document.querySelectorAll('.calendar__day'); 
        const dayListenerReference = this.dayListener.bind(this);
        for(let day of days){
            day.addEventListener('click', dayListenerReference);
        }
    }

    addListeners(){
        this.addDaysListener();
        this.changeMonth();
    }
    init(){
        const result = document.createDocumentFragment();



        result.append(this.navigation());
        result.append(this.monthStructure(dayjs()));

        this._DOMcalendar.appendChild(result);
        this.addListeners();
    }
}

const calendar = new Calendar();
calendar.init();

