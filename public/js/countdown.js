const eventData = document.getElementById('event-data');
const eventName = eventData.dataset.eventName;
const eventEndDate = dayjs(eventData.dataset.eventDate);
const countdownYears = document.getElementById('years');
const countdownMonths = document.getElementById('months');
const countdownDays = document.getElementById('days');
const countdownHours = document.getElementById('hours');
const countdownMinutes = document.getElementById('minutes');
const countdownSeconds = document.getElementById('seconds');
const smileWoman = document.getElementById('smile-woman');
const smileMan = document.getElementById('smile-man');
const blink = document.getElementById('blink');
const breath = document.getElementById('breath');
const interval = 1000;

function timer(){
    let t0 = performance.now();
    let daysLeft, monthsLeft;
    
    if(eventEndDate.isAfter(dayjs(), 'month')){
        let daysLeftFirstMonth = dayjs().endOf('month').diff(dayjs(), 'day');
        let daysLeftLastMonth = eventEndDate.diff(eventEndDate.startOf('month'), 'day');
        monthsLeft = eventEndDate.diff(dayjs(), 'month') > 1 ? eventEndDate.diff(dayjs(), 'month') - 1 : 0;
        daysLeft = daysLeftFirstMonth + daysLeftLastMonth;
    }
    else{
        daysLeft = eventEndDate.diff(dayjs(), 'day');
        monthsLeft = 0;
    }

    countdownYears.innerHTML = eventEndDate.diff(dayjs(), 'year');
    countdownMonths.innerHTML = monthsLeft % 12;
    countdownDays.innerHTML = daysLeft;
    countdownHours.innerHTML = eventEndDate.diff(dayjs(), 'hour') % 24;
    countdownMinutes.innerHTML = eventEndDate.diff(dayjs(), 'minute') % 60;
    countdownSeconds.innerHTML = eventEndDate.diff(dayjs(), 'second') % 60;
    smileWoman.innerHTML = Math.ceil(eventEndDate.diff(dayjs(), 'second') / 1393);
    smileMan.innerHTML = Math.ceil(eventEndDate.diff(dayjs(), 'second') / 10800);
    blink.innerHTML = Math.ceil(eventEndDate.diff(dayjs(), 'second') / 4);
    breath.innerHTML = Math.ceil(eventEndDate.diff(dayjs(), 'second') / 3);
    let t1 = performance.now();
    let delta = t1 - t0;
    setTimeout(() => timer(), interval - delta);
}

timer();