var lazyLoad = (function () {
    // 1 - defino el offset deseado
    // 2 - tomo todos los elementos lazy
    // (lo convierto a array porque después así podremos eliminar elementos una vez ya no sean lazy, cosa que con
    // el objeto NodeList que devuelve la función querySelectorAll no se puede hacer)
    let lazyElements;
    let totalOffset;
    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    function init({selector, offset = 0}) {
        //TODO: what if browser is resized?? viewport height could change so totalOffset should be modified...
        totalOffset = offset + viewportHeight;
        lazyElements = Array.from(document.querySelectorAll(selector));

        logLazySelectedElements();
        showVisibleImagesWhenPageHasBeenLoaded();
        makeWindowListenForIncomingLazyElements();
    }

    function logLazySelectedElements() {
        //muestra de cómo se usa un foreach y aplicar cierta lógica para cada uno de los elementos de la lista:
        lazyElements.forEach(function (element) {
            let imageToBeLoaded = element.getAttribute('src');
            console.info(
                `%c ${imageToBeLoaded} will be lazy loaded`,
                'color: green; font-weight: bold;'
            );
        });
    }

    function showVisibleImagesWhenPageHasBeenLoaded() {
        //Si al cargar la web hay imagenes lazy que ya deberían ser visibles, podemos detectarlo cuando se da el evento
        //oportuno y hacerlas visible tan pronto como la página carga
        document.addEventListener("DOMContentLoaded", function loadVisibleImages() {
            lazyElements.forEach(loadIfCloseEnough);
            document.removeEventListener("DOMContentLoaded", loadVisibleImages);
        });
    }

    function makeWindowListenForIncomingLazyElements() {
        window.addEventListener("scroll", function () {
            lazyElements.forEach(loadIfCloseEnough);
        })
    }

    function loadIfCloseEnough(element) {
        // 3 - por cada uno de los elementos lazy, defino el comportamiento cada vez que el usuario haga scroll:
        // * obtengo distancia a la parte inferior del viewport con getBoundingClientRect()
        // * obtengo la distancia restante hasta cargar el contenido de la imagen
        // * tomo el valor de la imagen a cargar, solo para mostrar un mensaje con algo de información útil
        let verticalDistanceToViewportBottom = element.getBoundingClientRect().y;
        let distanceUntilLoaded = verticalDistanceToViewportBottom - totalOffset;

        let imageToBeLoaded = element.getAttribute('data-lazy-src');
        console.debug(
            `%c ${imageToBeLoaded} is ${verticalDistanceToViewportBottom} px to viewport, and will be loaded after scrolling ${distanceUntilLoaded} more pixels.`,
            'color: red; font-weight: bold;'
        );

        //si la imagen ha llegado al límite, se carga la imagen real y además, eliminamos el listener que ya no es necesario
        if (distanceUntilLoaded <= 0) {
            element.setAttribute('src', imageToBeLoaded);
            console.info(
                `%c ${imageToBeLoaded} has been loaded!!!`,
                'color: green; font-weight: bold;'
            );
            //elimino el elemento que ya no es lazy anymore filtrándolo del array actual
            lazyElements = lazyElements.filter(e => e.getAttribute('data-lazy-src') !== imageToBeLoaded);
        }
    }

    return {
        init
    }

}());