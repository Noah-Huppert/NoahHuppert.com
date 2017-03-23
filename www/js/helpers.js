/**
 * Generates a random integer between the provided minimum and maximum.
 * From SO: http://stackoverflow.com/a/1527820
 *
 * @param min Smallest value random number should have
 * @param max Largest value random number should have
 * @returns {int} Random number between min and max.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if an element is overflowing
 * From SO: http://stackoverflow.com/a/143889
 * @param el HTML element to check
 * @returns {boolean} If overflowing or not
 */
function checkOverflow(el) {
    var curOverflow = el.style.overflow;

    if ( !curOverflow || curOverflow === "visible" )
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight;

    console.log(isOverflowing, el.clientWidth, el.scrollWidth);

    el.style.overflow = curOverflow;

    return isOverflowing;
}
