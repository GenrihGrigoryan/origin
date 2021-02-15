const html = document.documentElement;
let viewportHeight = window.innerHeight;

const scroller = {
    target: null,
    ease: 0.1,
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
};

let requestId = null;

var touch;
if (matchMedia('(pointer:coarse)').matches == true) {
    touch = true;
} else {
    touch = false;
}

function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

function updateScroller() {

    var scrollY = window.pageYOffset || html.scrollTop || 0;
    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;
    if (Math.abs(scrollY - scroller.y) < 0.05) {
        scroller.y = scrollY;
        scroller.scrollRequest = 0;
    }

    if (touch == false) {
        scroller.target.style.transform = 'translate3d(0, ' + -scroller.y + 'px, 0)';
    }
    /*
    if (scroller.y < 30) {
        scroller.header.style.transform = 'translate3d(0, ' + -scroller.y + 'px, 0)';
    } else {
        scroller.header.style.transform = 'translate3d(0, -30px, 0)';
    }
*/
    requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

window.onload = function() {
    scroller.target = document.getElementById("scroller")

    updateScroller();
    document.addEventListener("scroll", onScroll);
}