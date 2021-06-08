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
        this._timeUnitsMod = { second: 60, minute: 60, hour: 24, day: 7, week: 1024 }
        this._eventData = document.getElementById('event-data');
        this._eventEndDate = dayjs(this._eventData.dataset.eventEndDate);
        this._startDate = dayjs(this._eventData.dataset.startDate);
        this._smileWoman = document.getElementById('smile-woman');
        this._smileMan = document.getElementById('smile-man');
        this._blink = document.getElementById('blink');
        this._breath = document.getElementById('breath');
        this._timeLeft = (this._eventEndDate.diff(dayjs(), 'second') >= 0) ? true : false;
        this._countdownSection = document.getElementById('countdown-section');
        this._secondCountdownSection = document.getElementById('second-countdown-section');
        this._eventSection = document.getElementById('event-section');
        this._shareSection = document.getElementById('share-section');
    }
    init(){
        if(this._timeLeft){
            
            let visibleTimeUnits = this.checkTimeLeft();
            let countdown = this.createCountdown(visibleTimeUnits);
            this._countdownSection.querySelector('.section__title').innerHTML = 'Do dnia którego wypatrujesz zostało:';

            this._countdownSection.querySelector('.section__content').append(countdown);
    
            this._itemsCreated = visibleTimeUnits.map(item => document.getElementById(item));
            this.timer();            
        }
        else{
            this.changeLayout();
        }
    }
    changeLayout(){        
        const sectionText = document.createElement('div');
        const sectionLink = document.createElement('a');
        
        sectionLink.innerHTML = "Kliknij tutaj";
        sectionLink.href = "/";
        sectionLink.classList.add('section__link');
        sectionText.classList.add('section__text');
        sectionText.append(sectionLink, document.createTextNode(", żeby stworzyć nowe odliczanie. Nie zapomnij podzielić się ze znajomymi chwilą, której wypatrujesz."));
        
        this._eventSection.querySelector('.section__title').innerHTML = 'Doczekałeś się!';    
        this._countdownSection.querySelector('.section__title').innerHTML = "Z pewnością jest coś, na co czekasz.";        
        this._countdownSection.querySelector('.section__content').append(sectionText);

        this._secondCountdownSection.remove();
        this._shareSection.remove();
    }
    checkTimeLeft(){
        const timeUnits = ['week', 'day', 'hour', 'minute', 'second'];
        const result = [];
        for(let timeUnit of timeUnits){
            if(this._eventEndDate.diff(dayjs(), timeUnit) >= 1){
                result.push(timeUnit);
            }
        }
        return result;
    }
    createCountdown(visibleTimeUnits){
        // const result = document.createDocumentFragment();
        const timeUnitsPL = {second: 'sekundy', minute: 'minuty', hour: 'godziny', day: 'dni', week: 'tygodnie'}        
        const result = document.createElement('div');
        
        result.classList.add('countdown');
        console.log(countdown);

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
        // result.append(countdown);

        return result;
    }
    timer(){
        let t0 = performance.now();
        this._timeLeft = (this._eventEndDate.diff(dayjs(), 'second') >= 0) ? true : false;

        for(let item of this._itemsCreated){
            item.innerHTML = this._eventEndDate.diff(dayjs(), item.id) % this._timeUnitsMod[item.id];
        }
    
        this._smileWoman.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 1393);
        this._smileMan.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 10800);
        this._blink.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 4);
        this._breath.innerHTML = Math.ceil(this._eventEndDate.diff(dayjs(), 'second') / 3);
    
        let t1 = performance.now();
        let delta = t1 - t0;
        
        
        if(this._timeLeft){
            setTimeout(() => this.timer(), this._interval - delta); 
        }
        else{
            this._countdownSection.querySelector('.countdown').remove();
            this.init();
        }
    }
}

const countdown = new Countdown();
countdown.init();