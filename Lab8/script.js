var elementsTextBox = [];
var elementsCoords = [];
var startCoords = { x: 0, y: 0 };
var currentCoords = { x: 0, y: 0 };
var distance = { x: 0, y: 0 };

var regular = /\d+/;
var move = false, text="";
var divElement = null, divID = null;
const mainArea = document.querySelector(".mainArea");
const addButton = document.querySelector('.addElement');
const elementWidth = 150;
const elementHeight = 150;
const mainWidth = mainArea.offsetWidth;
const mainHeight = mainArea.offsetHeight;

if (!!localStorage.getItem('elements')) {
    elementsTextBox = JSON.parse(localStorage.getItem("text"));
    elementsCoords = JSON.parse(localStorage.getItem('elements'));
    addElement(elementsCoords);
}

function addElement(coords) {
    let element = '';
    for (let i = 0; i < coords.length; i++) {
        element += '<div class="square" id=' + i + "div" + ' style="transform: translate(' + coords[i].x + 'px, ' + coords[i].y + 'px)">'
        element += '<span class="close" id=' + i + "close" + '>&times;</span>'
        element += '<input type="text" id=' + i + "box" + ' class="textField"' + ' placeholder="Поле для ввода"></div>';
    }
    mainArea.innerHTML = element;
    console.log(mainArea);
    for(let i = 0; i < coords.length; i++)
        document.getElementById(i + "box").value = elementsTextBox[i];
}

function pushText(){
    elementsTextBox.push(text);
}

function newCoords(coords) {
    divElement.style.cssText = 'transform: translate(' + coords.x + 'px, ' + coords.y + 'px)';
}

addButton.addEventListener('click', (e) => {
    if (!!elementsCoords.length) 
        elementsCoords.push({ x: 0, y: 0 });
    else
        elementsCoords = [{ x: 0, y: 0 }];
    pushText();
    addElement(elementsCoords);

    localStorage.setItem('text', JSON.stringify(elementsTextBox));
    localStorage.setItem('elements', JSON.stringify(elementsCoords));
});

mainArea.addEventListener('click', function(e){
    if(!!e.target.classList.contains('textField')){
        e.target.oninput = function() {
            elementsTextBox[e.target.id.match(regular)] = document.getElementById(e.target.id.match(regular) + "box").value;
            localStorage.setItem('text', JSON.stringify(elementsTextBox));
        }
    }
    if(!!e.target.classList.contains('close')){
        var id = e.target.id.match(regular);
        var element = document.getElementById(id + "div")
        mainArea.removeChild(element);
        elementsTextBox.splice(id,1);
        elementsCoords.splice(id,1);
        localStorage.setItem('text', JSON.stringify(elementsTextBox));
        localStorage.setItem('elements', JSON.stringify(elementsCoords));
    }

});

mainArea.addEventListener('mousedown', function (e) {
    if (!!e.target.classList.contains('square')) {
        move = true;
        divElement = e.target;
        startCoords.x = e.clientX;
        startCoords.y = e.clientY;
    }
});

mainArea.addEventListener('mousemove', function (e) {
    if (move) {
        currentCoords.x = e.clientX;
        currentCoords.y = e.clientY;

        distance.x = elementsCoords[e.target.id.match(regular)].x + (currentCoords.x - startCoords.x);
        distance.y = elementsCoords[e.target.id.match(regular)].y + (currentCoords.y - startCoords.y);

        if (distance.x >= (mainWidth - elementWidth)) distance.x = mainWidth - elementWidth;
        if (distance.x <= 0) distance.x = 0;

        if (distance.y >= (mainHeight - elementHeight)) distance.y = mainHeight - elementHeight;
        if (distance.y <= 0) distance.y = 0;

        newCoords(distance);
    }
});

mainArea.addEventListener('mouseup', function (e) {
    if (!!e.target.classList.contains('square')) {
        move = false;
        elementsCoords[e.target.id.match(regular)].x = distance.x;
        elementsCoords[e.target.id.match(regular)].y = distance.y;
        localStorage.setItem('elements', JSON.stringify(elementsCoords));
    }
});