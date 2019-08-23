var lazyLoad = (function () {
    let lazyElements;
    let totalOffset;
    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    function init({selector, offset = 0}) {
        totalOffset = offset + viewportHeight;
        lazyElements = Array.from(document.querySelectorAll(selector));

        showVisibleImagesWhenPageHasBeenLoaded();
        makeWindowListenForIncomingLazyElements();
    }

    function showVisibleImagesWhenPageHasBeenLoaded() {
        document.addEventListener("DOMContentLoaded", function loadVisibleImages() {
            lazyElements.forEach(loadIfCloseEnough);
            //not really necessary since this event occurs just once
            document.removeEventListener("DOMContentLoaded", loadVisibleImages);
        });
    }

    function makeWindowListenForIncomingLazyElements() {
        window.addEventListener("scroll", function () {
            lazyElements.forEach(loadIfCloseEnough);
        })
    }

    function loadIfCloseEnough(element) {
        let verticalDistanceToViewportBottom = element.getBoundingClientRect().y;
        let distanceUntilLoaded = verticalDistanceToViewportBottom - totalOffset;

        let imageToBeLoaded = element.getAttribute('data-lazy-src');
        console.debug(
            `%c ${imageToBeLoaded} is ${verticalDistanceToViewportBottom} px to viewport, and will be loaded after scrolling ${distanceUntilLoaded} more pixels.`,
            'color: red; font-weight: bold;'
        );

        if (distanceUntilLoaded <= 0) {
            element.setAttribute('src', imageToBeLoaded);
            console.info(
                `%c ${imageToBeLoaded} has been loaded!!!`,
                'color: green; font-weight: bold;'
            );
            lazyElements = lazyElements.filter(e => e.getAttribute('data-lazy-src') !== imageToBeLoaded);
        }
    }

    return {
        init
    }

}());