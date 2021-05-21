const eventData = document.getElementById('event-data');
const eventName = eventData.dataset.eventName;
const eventEndDate = dayjs(eventData.dataset.eventDate);
const interval = 1000;

function timer(){
    let t0 = performance.now();
    let secondsBetweenDates = dayjs(eventEndDate).diff(dayjs(), 's');
    console.log(typeof secondsBetweenDates);
    let t1 = performance.now();
    let delta = t1 - t0;
    console.log(`${Math.floor((secondsBetweenDates / 60 / 60) % 24)}:${Math.floor((secondsBetweenDates / 60) % 60)}:${secondsBetweenDates % 60}`);
    setTimeout(() => timer(), interval - delta);
    // parseInt(secondsBetweenDates / 60 / 60 / 24 / 365, 10);
    // parseInt((secondsBetweenDates - (daysAcc * 60 * 60 * 24)) / 60 / 60 / 24, 10);
    // parseInt(, 10);
    // parseInt((secondsBetweenDates / 60) % 60, 10);
}

timer();