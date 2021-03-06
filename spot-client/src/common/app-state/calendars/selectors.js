
/**
 * A selector which returns the email associated with the currently configured
 * calendar.
 *
 * @param {Object} state - The Redux state.
 * @returns {string}
 */
export function getCalendarEmail(state) {
    return state.calendars.email;
}

/**
* A selector which returns calendar events associated with the currently
* configured calendar.
*
* @param {Object} state - The Redux state.
* @returns {Array<Object>}
*/
export function getCalendarEvents(state) {
    return state.calendars.events;
}

/**
* A selector which returns the name to show associated with the currently
* configured calendar.
*
* @param {Object} state - The Redux state.
* @returns {string}
*/
export function getDisplayName(state) {
    return state.calendars.displayName;
}

/**
* A selector which returns whether or not calendar events have ever been
* updated during this session.
*
* @param {Object} state - The Redux state.
* @returns {boolean}
*/
export function hasCalendarBeenFetched(state) {
    return state.calendars.hasSetEvents;
}
