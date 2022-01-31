'use strict'

const paralaxHeader = document.querySelector('.header');

if(paralaxHeader){
    const container = document.querySelector('.header');
    const cloud = document.querySelector('.h-body__img-item-cloud');
    const mountains = document.querySelector('.h-body__img-item-mountains');
    const man = document.querySelector('.h-body__img-item-man');

    const forCloud = 40;
    const forMountains = 20;
    const forMan = 10;

    const sped = 0.05;

    let posytionY = 0
    let posytionX = 0
    let cardXprocent = 0
    let cardYprocent = 0

    function parallaxStyle() {
        const distX = cardXprocent -posytionX;
        const distY = cardYprocent - posytionY;

        posytionX = posytionX + (distX * sped);
        posytionY = posytionY + (distY * sped);

        cloud.style.cssText = `transform: translate(${posytionX / forCloud}%,${posytionY / forCloud}%);`;
        mountains.style.cssText = `transform: translate(${posytionX / forMountains}%,${posytionY / forMountains}%);`;
        man.style.cssText = `transform: translate(${posytionX / forMan}%,${posytionY / forMan}%);`;

        requestAnimationFrame(parallaxStyle)
    }
    parallaxStyle();

    container.addEventListener('mousemove', function(e) {
        let containerHeigth = container.offsetHeight;
        let containerWidth = container.offsetWidth;

        let coordY = e.pageY - containerHeigth / 2;
        let coordX = e.pageX - containerWidth / 2;

        cardXprocent = coordX / containerWidth * 100;
        cardYprocent = coordY / containerHeigth * 100;
    })

    
let holdsSets = [];
for(let i=0; i<1.0; i+=0.005){
    holdsSets.push(i)
}

const collBack = function(entries, observer){
    const scrollTopProcent = window.pageYOffset / container.offsetHeight * 100;
    setParallaxItemStyle(scrollTopProcent)
}
const observer = new IntersectionObserver(collBack, {
    threshold: holdsSets
})

observer.observe(document.querySelector('.header'))

function setParallaxItemStyle(scrollTop){
    mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTop / 6}%);`;
    man.parentElement.style.cssText = `transform: translate(0%,-${scrollTop / 3}%);`;
}

}

let scrollDown = document.querySelector('.h-body__scroll-down a');

scrollDown.addEventListener('click', () => {
    let headerHeigth = document.querySelector('.header').clientHeight;


    window.scrollBy({
        top: headerHeigth,
        behavior: 'smooth'
    })
})


document.querySelectorAll('.h-slider__link').forEach(element => {
    element.addEventListener('click', function(e){
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        let elementId = document.getElementById(href);
        console.log(document.getElementById(href));

        window.scrollBy({
            top: elementId.getBoundingClientRect().top,
            behavior: 'smooth'
        })
    })
})

window.addEventListener('scroll', () => {
    let scroll = window.scrollY + 100;

    document.querySelectorAll('.section, .header').forEach((element, index) => {
        if(element.offsetTop + document.querySelector('.nav').clientHeight <= scroll){
            console.log(index);
            document.querySelectorAll('.h-slider__link').forEach(element => {
                if(element.classList.contains('h-slider__link-active')){
                    element.classList.remove('h-slider__link-active')
                } else {
                    document.querySelectorAll('.h-slider__item')[index].querySelector('.h-slider__link').classList.add('h-slider__link-active');
                }
            })
        }
    })
})

window.addEventListener('scroll', (e) => {
    let headerSlider = document.querySelector('.h-slider');
    if(window.scrollY >= document.querySelector('.header').clientHeight / 2){
        headerSlider.classList.add('h-slider-active')
    } else {
        headerSlider.classList.remove('h-slider-active')
    }
})

document.querySelector('.n-burger').addEventListener('click', function() {
    this.classList.toggle('n-burger-active');
    document.querySelector('.nav__menu').classList.toggle('nav__menu-active');
})