import {
    CALENDAR_SET_ACCOUNT,
    CALENDAR_SET_EVENTS
} from './action-types';

const DEFAULT_STATE = {
    name: undefined,
    displayName: undefined,
    events: [],
    hasCalendarBeenFetch: false
};

/**
 * A {@code Reducer} to update the current Redux state for the 'calendar'
 * feature. The 'calendar' feature stores the calendar from which to fetch
 * events and the events themselves.
 *
 * @param {Object} state - The current Redux state for the 'setup' feature.
 * @param {Object} action - The Redux state update payload.
 * @returns {Object}
 */
const calendar = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case CALENDAR_SET_ACCOUNT:
        return {
            ...state,
            calendarType: action.calendarType,
            displayName: action.displayName,
            email: action.email,
            events: [],
            hasSetEvents: false
        };

    case CALENDAR_SET_EVENTS:
        return {
            ...state,
            events: action.events,
            hasSetEvents: true
        };

    default:
        return state;
    }
};

export default calendar;
