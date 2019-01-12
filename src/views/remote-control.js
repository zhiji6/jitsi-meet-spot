import PropTypes from 'prop-types';
import React from 'react';

import { LoadingIcon } from 'features/loading-icon';
import { MeetingNameEntry } from 'features/meeting-name-entry';
import { FeedbackForm, RemoteControlMenu } from 'features/remote-control-menu';
import { ScheduledMeetings } from 'features/scheduled-meetings';

import { withRemoteControl } from './loaders';
import View from './view';
import styles from './view.css';

const presenceToStoreAsState = new Set([
    'audioMuted',
    'isSpot',
    'screensharing',
    'videoMuted',
    'view'
]);

/**
 * Displays the remote control view for controlling a Spot instance from another
 * browser window.
 *
 * @extends React.Component
 */
export class RemoteControl extends React.Component {
    static propTypes = {
        remoteControlService: PropTypes.object
    };

    /**
     * Initializes a new {@code RemoteControl} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props) {
        super(props);

        this.state = {
            audioMuted: false,
            events: [],
            screensharing: false,
            view: '',
            videoMuted: false
        };

        this._onCommand = this._onCommand.bind(this);
        this._onGoToMeeting = this._onGoToMeeting.bind(this);
        this._onStatusChange = this._onStatusChange.bind(this);
    }

    /**
     * Connects to the remote control service so it can send commands back to
     * the Spot instance and starts listening for that Spot instance's state
     * updates.
     *
     * @inheritdoc
     */
    componentDidMount() {
        const { remoteControlService } = this.props;

        remoteControlService.addRemoteCommandListener(this._onCommand);
        remoteControlService.addSpotStatusListener(this._onStatusChange);

        remoteControlService.requestCalendarEvents();
    }

    /**
     * Cleans up listeners waiting for Spot state updates.
     *
     * @inheritdoc
     */
    componentWillUnmount() {
        this.props.remoteControlService.removeRemoteCommandListener(
            this._onCommand);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <View name = 'remoteControl'>
                <div className = { styles.container }>
                    { this._getView() }
                </div>
            </View>
        );
    }

    /**
     * A state machine which determines what content should be displayed
     * within the view.
     *
     * @private
     * @returns {ReactElement}
     */
    _getView() {
        switch (this.state.view) {
        case 'admin':
            return <div>currently in admin tools</div>;
        case 'feedback':
            return <FeedbackForm />;
        case 'home':
            return this._getWaitingForCallView();
        case 'meeting':
            return this._getInCallView();
        case 'setup':
            return <div>currently in setup</div>;
        default:
            return <LoadingIcon color = 'white' />;
        }
    }

    /**
     * Returns the remote control view to display when the Spot instance is in a
     * meeting.
     *
     * @private
     * @returns {ReactElement}
     */
    _getInCallView() {
        return (
            <RemoteControlMenu
                audioMuted = { this.state.audioMuted === 'true' }
                screensharing = { this.state.screensharing === 'true' }
                videoMuted = { this.state.videoMuted === 'true' } />
        );
    }

    /**
     * Returns the React Element to display while the Spot instance is not in a
     * meeting.
     *
     * @private
     * @returns {ReactElement}
     */
    _getWaitingForCallView() {
        return (
            <div className = { styles.subcontent }>
                <MeetingNameEntry onSubmit = { this._onGoToMeeting } />
                <div className = { styles.meetings }>
                    <ScheduledMeetings
                        events = { this.state.events }
                        onMeetingClick = { this._onGoToMeeting } />
                </div>
            </div>
        );
    }

    /**
     * Callback to parse direct updates received from the Spot instance.
     *
     * @param {string} command - The type of command received.
     * @param {string} from - The MUC user that sent the command.
     * @param {Object} data - Additional information passed with the command.
     * @private
     * @returns {void}
     */
    _onCommand(command, from, data) {
        if (command === 'calendarData') {
            this.setState({
                events: data.events
            });
        }
    }

    /**
     * Callback invoked when a remote control needs to signal to a Spot to
     * join a specific meeting.
     *
     * @param {string} meetingName - The name of the jitsi meeting to join.
     * @private
     * @returns {void}
     */
    _onGoToMeeting(meetingName) {
        this.props.remoteControlService.goToMeeting(meetingName);
    }

    /**
     * Callback invoked when a client has published a status update through the
     * {@code remoteControlService}.
     *
     * @param {Object} data - The status update broadcasted by a client
     * connected to {@code remoteControlService}.
     * @private
     * @returns {void}
     */
    _onStatusChange(data) {
        const { status } = data;

        if (status.isSpot !== 'true') {
            return;
        }

        const newState = {};

        Object.keys(status).forEach(key => {
            if (presenceToStoreAsState.has(key)) {
                newState[key] = status[key];
            }
        });

        this.setState(newState);
    }
}

export default withRemoteControl(RemoteControl);
