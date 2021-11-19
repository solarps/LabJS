const menu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const btn = document.querySelector('.btn');
const body = document.body;
let action = false;
let position;
let distance = -300;
let startCoords = {
    x: 0,
    y: 0
}

let currentCoords = {
    x: 0,
    y: 0
}

body.addEventListener('mousedown', (e)=> {
    action = true;
    startCoords.x = e.clientX;
    startCoords.y = e.clientY;
})

body.addEventListener('mousemove', (e)=> {
    if (action) {
        currentCoords.x = e.clientX;
        position = distance + currentCoords.x - startCoords.x;
        position = (position >= 0) ? 0 : position;
        position = (position <= -300) ? -300 : position;
        //menuOverlay.style.opacity = position/300+1;
        menu.style.cssText = 'transform: translateX(' + position + 'px)';
        //menuOverlay.style.visibility = 'visible';
        //menu.style.visibility = 'visible';
        console.log(position);
    }
})

body.addEventListener('mouseup', (e)=> {
    action = false;
    if (position >= -100 ) {
        distance = position;
        menu.style.cssText = 'transform: translateX(' + 0 + 'px)';
        menuOverlay.classList.add('menu-overlay-visible');
        menu.classList.add('menu-visible');
    } else {
        position = -300;
        menu.style.cssText = 'transform: translateX(' + -300 + 'px)';
        menuOverlay.classList.remove('menu-overlay-visible');
        menu.classList.remove('menu-visible');
    }
})

btn.addEventListener('click',(e)=>{
    position = 0;
    menu.style.cssText = 'transform: translateX(' + 0 + 'px)';
    menuOverlay.classList.add('menu-overlay-visible');
    menu.classList.add('menu-visible');
})

menuOverlay.addEventListener('click', (e) => {
    position = -300;
    menu.style.cssText = 'transform: translateX(' + -300 + 'px)';
    menuOverlay.classList.remove('menu-overlay-visible');
    menu.classList.remove('menu-visible');
})

body.addEventListener('click',(e)=>{
    console.log(e.target);
})