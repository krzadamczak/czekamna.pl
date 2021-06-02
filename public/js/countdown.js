const copyLinkButton = document.querySelector('.share-link__button');
const countdownLink = document.querySelector('.share-link__url').innerHTML;
const shareLink = document.querySelector('.share-link');

copyLinkButton.addEventListener('click', e => {
    navigator.clipboard.writeText(countdownLink).then(() => {
        if(!shareLink.querySelector('.share-link__success')){
            let succesfullCopy = document.createElement('span');
            succesfullCopy.append(document.createTextNode('Link został skopiowany!'));
            succesfullCopy.classList.add('share-link__success');
            shareLink.append(succesfullCopy);
            window.getComputedStyle(succesfullCopy).getPropertyValue('opacity');
            succesfullCopy.classList.add('share-link__success--visible');
            window.setTimeout(() => {
                window.getComputedStyle(succesfullCopy).getPropertyValue('opacity');
                succesfullCopy.classList.remove('share-link__success--visible');
            }, 2500);
            window.setTimeout(() => {                
                succesfullCopy.remove();
            }, 3000);
        }
    });
});

class Countdown{
    constructor(){
        this._interval = 1000;
        this._itemsCreated = [];
        this._timeUnitsMod = { second: 60, minute: 60, hour: 24, month: 12 }
        this._eventData = document.getElementById('event-data');
        this._eventEndDate = dayjs(this._eventData.dataset.eventDate);
        this._smileWoman = document.getElementById('smile-woman');
        this._smileMan = document.getElementById('smile-man');
        this._blink = document.getElementById('blink');
        this._breath = document.getElementById('breath');
    }
    init(){
        const visibleTimeUnits = this.checkTimeLeft();
        const countdown = this.createCountdown(visibleTimeUnits);

        document.querySelector('.countdown').append(countdown);

        this._itemsCreated = visibleTimeUnits.map(item => document.getElementById(item));
        this.timer();
    }
    checkTimeLeft(){
        const timeUnits = ['year', 'month', 'day', 'hour', 'minute', 'second'];
        const result = [];
        for(let timeUnit of timeUnits){
            if(this._eventEndDate.diff(dayjs(), timeUnit) >= 1){
                result.push(timeUnit);
            }
        }
        return result;
    }
    createCountdown(visibleTimeUnits){
        const result = document.createDocumentFragment();
        const timeUnitsPL = {second: 'sekundy', minute: 'minuty', hour: 'godziny', day: 'dni', month: 'miesiące', year: 'lata'}    
        
        for(let unit of visibleTimeUnits){
            const countdownInner = document.createElement('div');
            const countdownNumber = document.createElement('div');
            const countdownTimeUnit = document.createElement('div');
    
            countdownInner.classList.add('countdown__inner');
            countdownNumber.classList.add('countdown__number');
            countdownTimeUnit.classList.add('countdown__time-unit');
    
            countdownNumber.innerHTML = '0';
            countdownNumber.id = unit;
    
            countdownTimeUnit.innerHTML = timeUnitsPL[unit];
    
            countdownInner.append(countdownNumber, countdownTimeUnit);
    
            result.append(countdownInner);
        }
        return result;
    }
    timer(){
        let t0 = performance.now();
        let daysLeft, monthsLeft;
        
        if(this._eventEndDate.isAfter(dayjs(), 'month')){
            let daysLeftFirstMonth = dayjs().endOf('month').diff(dayjs(), 'day', true);
            let daysLeftLastMonth = this._eventEndDate.diff(this._eventEndDate.startOf('month'), 'day', true);
            daysLeft = Math.floor(daysLeftFirstMonth + daysLeftLastMonth);
        }
        else{
            daysLeft = this._eventEndDate.diff(dayjs(), 'day');
        }
        
        for(let item of this._itemsCreated){
            if(item.id === 'year'){
                item.innerHTML = this._eventEndDate.diff(dayjs(), 'year');
            }
            else if(item.id === 'day'){
                item.innerHTML = daysLeft;
            }
            else{
                item.innerHTML = this._eventEndDate.diff(dayjs(), item.id) % this._timeUnitsMod[item.id];
            }
        }
    
        this._smileWoman.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 1393);
        this._smileMan.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 10800);
        this._blink.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 4);
        this._breath.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 3);
    
        let t1 = performance.now();
        let delta = t1 - t0;
    
        setTimeout(() => this.timer(), this._interval - delta);
    }
}

const countdown = new Countdown();
countdown.init();