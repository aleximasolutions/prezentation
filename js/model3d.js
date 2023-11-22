let zSpasing = -1500,
    lastPos = zSpasing / 10,
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVals = [];

function handleScroll() {
    let top = document.documentElement.scrollTop,
        delta = lastPos - top;

    lastPos = top;

    // Получаем элемент с классом "model3d"
    let model3dElement = document.querySelector('.model3d');

    // Проверяем видимость элемента
    if (model3dElement && isElementInViewport(model3dElement)) {
        frames.forEach(function (n, i) {
            zVals.push((i * zSpasing) + zSpasing);
            zVals[i] += delta * -6;
            let frame = frames[i],
                transform = `translateZ(${zVals[i]}px)`,
                opacity = zVals[i] < Math.abs(zSpasing) ? 1 : 0;

            frame.setAttribute('style', `transform: ${transform}; opacity:${opacity}`);
        });
    }
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
}


// Добавляем обработчик события прокрутки
window.addEventListener('scroll', handleScroll);

// Вызываем обработчик события прокрутки сразу, чтобы проверить видимость при загрузке страницы
handleScroll();
