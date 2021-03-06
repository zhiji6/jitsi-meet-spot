import { combineReducers } from 'redux';

import calendars from './calendars/reducer';
import config from './config/reducer';
import notifications from './notifications/reducer';
import setup from './setup/reducer';
import spotTv from './spot-tv/reducer';
import wiredScreenshare from './wired-screenshare/reducer';

const reducers = combineReducers({
    calendars,
    config,
    notifications,
    setup,
    spotTv,
    wiredScreenshare
});

export default reducers;

export * from './calendars/actions';
export * from './notifications/actions';
export * from './setup/actions';
export * from './spot-tv/actions';
export * from './wired-screenshare/actions';

export * from './calendars/selectors';
export * from './config/selectors';
export * from './notifications/selectors';
export * from './setup/selectors';
export * from './spot-tv/selectors';
export * from './wired-screenshare/selectors';
