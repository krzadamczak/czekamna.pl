const hoursForm = document.getElementById('hours');
const minutesForm = document.getElementById('minutes');

function validateTime(e, max){
    let selection = e.target.selectionStart;
    e.target.value.length === 3 ? e.target.value = e.target.value.slice(0, -1) : null;
    e.target.setSelectionRange(selection, selection);
    if(e.target.selectionStart >= 2){
        minutesForm.focus();
        minutesForm.setSelectionRange(0, 0);
        if(parseInt(e.target.value) > max){
            e.target.value = max;
        }
    }
}

hoursForm.addEventListener('input', e => {
    validateTime(e, 23);
});
minutesForm.addEventListener('input', e => {
    validateTime(e, 59);
});