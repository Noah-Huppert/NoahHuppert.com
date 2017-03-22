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
