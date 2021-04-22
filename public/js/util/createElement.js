function createElement(element, className){
    let result = document.createElement(element);
    if(className) result.classList.add(className);
    return result;
}