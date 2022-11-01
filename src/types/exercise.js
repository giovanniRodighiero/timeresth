import PropTypes from "prop-types";

/**
 * @typedef Exercise - A workout's exercise.
 * @type {object}
 * @property {string} name - Exercise's name.
 * @property {number} work - Exercise's work time (s).
 * @property {number} rest - Exercise's rest time (s).
 * @property {number} repeat - Exercise's repetitions.
 */

export const exercisePropTypes = PropTypes.shape({
    /**
     * Exercise's name
     */
    name: PropTypes.string.isRequired,

    /**
     * Exercise's repetitions
     */
    repeat: PropTypes.number.isRequired,

    /**
     * Exercise's rest time
     */
    rest: PropTypes.number.isRequired,

    /**
     * Exercise's work time
     */
    work: PropTypes.number.isRequired,
});

export default {};
