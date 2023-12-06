let zSpasing = -1500;

let lastPos = zSpasing / 10;
let frames = [...document.querySelectorAll('.frame')];
let zVals = [];
let model3dElement = document.querySelector('.model3d');
const kef = -6;

function handleScroll() {
    let top = scrollY;
    let delta = lastPos - top;
    lastPos = top;

    if (!model3dElement) {
        return;
    }
    
    if (isElementInViewport(model3dElement)) {
        frames.forEach((element, index) => {
            zVals.push((index * zSpasing) + zSpasing);
            zVals[index] += delta * kef;
            let transform = `translateZ(${zVals[index]}px)`;
            let opacity = zVals[index] < Math.abs(zSpasing) ? 1 : 0;
            element.setAttribute('style', `transform: ${transform}; opacity:${opacity}`);
        });
    } else {
        frames.forEach((element) => {
            console.log('unset');
            zVals = [];
            element.setAttribute('style', `transform: 0px; opacity:0;`);
        });
    }

}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight) &&
        rect.bottom >= 0
        // rect.top <= window.scrollY - 1000
    );
}

addEventListener('scroll', handleScroll);

handleScroll();