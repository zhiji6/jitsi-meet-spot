import PropTypes from 'prop-types';
import React from 'react';

import { JitsiMeetJSProvider } from 'common/vendor';

/**
 * Displays a volume meter for previewing the selected audio input device.
 *
 * @extends React.PureComponent
 */
export default class MicPreview extends React.PureComponent {
    static propTypes = {
        devices: PropTypes.array,
        label: PropTypes.string
    };

    /**
     * Initializes a new {@code MicPreview} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props) {
        super(props);

        this.state = {
            audioLevel: 0
        };

        this._ref = React.createRef();
        this._updateAudioLevel = this._updateAudioLevel.bind(this);
    }

    /**
     * Begins listening on the selected audio input device, if specified, for
     * changes in volume.
     *
     * @inheritdoc
     */
    componentDidMount() {
        this._createPreviewTrack();
    }

    /**
     * Updates which audio input device is being listend to for changes in
     * volume.
     *
     * @inheritdoc
     */
    componentDidUpdate(prevProps) {
        if (prevProps.label !== this.props.label) {
            this._createPreviewTrack();
        }
    }

    /**
     * Cleans up any audio tracks used for previewing.
     *
     * @inheritdoc
     */
    componentWillUnmount() {
        this._destroyPreviewTrack();
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        const audioMeterFill = {
            width: `${Math.floor(this.state.audioLevel * 100)}%`
        };

        return (
            <div className = 'mic-preview' >
                <div
                    className = 'mic-preview-level'
                    style = { audioMeterFill } />
            </div>
        );
    }

    /**
     * Creates the audio track to use to listen for volume changes and update
     * the volume preview.
     *
     * @private
     * @returns {void}
     */
    _createPreviewTrack() {
        this._destroyPreviewTrack();

        const description = this.props.devices.find(device =>
            device.label === this.props.label);

        if (!description) {
            return;
        }

        const JitsiMeetJS = JitsiMeetJSProvider.get();

        JitsiMeetJS.createLocalTracks({
            micDeviceId: description.deviceId,
            devices: [ 'audio' ]
        }).then(jitsiLocalTracks => {
            this._previewTrack = jitsiLocalTracks[0];

            this._previewTrack.on(
                JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                this._updateAudioLevel
            );
        });
    }

    /**
     * Cleans up the audio track used for previewing.
     *
     * @private
     * @returns {void}
     */
    _destroyPreviewTrack() {
        if (this._previewTrack) {
            const JitsiMeetJS = JitsiMeetJSProvider.get();

            this._previewTrack.off(
                JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                this._updateAudioLevel
            );
            this._previewTrack.dispose();
            this._previewTrack = null;
        }
    }

    /**
     * Updates the known current volume level of the audio input. The passed in
     * level will be a number between 0 and 1.
     *
     * @param {number} audioLevel - The new audio level for the track.
     * @private
     * @returns {void}
     */
    _updateAudioLevel(audioLevel) {
        this.setState({ audioLevel });
    }
}
