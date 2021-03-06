# Glossary
Terms for features used within spot.

### Ad-hoc meeting
A meeting not scheduled on a calendar that Spot has access to. The ad-hoc meeting is created by manually entering a meeting name within the spot UI to create the meeting.

### Admin
The person setting up and maintaining Spots. This person knows about how to go through setup flow for Spot and understands how the different parts of spot interact.

### Calendar meeting
A meeting scheduled on a calendar that is connected to Spot. The meeting URL cannot be changed by Spot but is instead part of a calendar event.

### Join code, Share key
The N-digit code a user needs to enter in order to get a Spot-Remote to become connected to Spot. Once connected, the Spot-Remote can make spot joining a meeting and has access to Spot's in-meeting controls. 

### lib-jitsi-meet
The javascript library which contains XMPP, MUC, and WebRTC code used by jitsi-meet for its video conferencing. Spot re-uses the library for its own needs.

### Quiet
A library for ultrasound transmitting and decoding. The main library is lib-quiet, written in C, but the maintainer provides iOS, Android, and JS libraries to use lib-quiet. See Ultrasound.

### Spot
A standalone web application intended for conference integration with a huddle room. One part of the application is Spot-TV, which runs on a computer and is left running on a screen. Spot-TV has no direct controls on it. Instead, another part of the application,the Spot-Remote, must be used to navigate to meetings with Spot.

### Spot MUC
Spot has two main components: Spot-TV and Spot-Remote. The Spot-TV talks to Spot-Remotes about its status, such as in-meeting state and what view it is displaying. Remote controls can send commands to Spot-TV to take actins, such as joining a meeting. To facilitate the communication, Spot-TV and Spot-Remotes join a multi-user conference (MUC) and send messages to each other in that MUC.

### Spot-Remote
A sub-application of Spot, allowing Spot-TV to be interacted with without a physical connection. Spot-Remotes includes computers not running spot, phones, tablets, and the mobile app. The difference between Spot-TV and a Spot-Remote is Spot-TV is not intended to have direct interaction with a user; the user interacts with Spot-TV via a Spot-Remote.

### Ultrasonic
Sound that is not readily perceivable by adults due to its high frequency. Can be used to send messages between devices without cables. This is a feature of Spot in which a Spot-Remote, likely an iPad set up as a dedicated Spot-Remote, can emit the join code using ultrasonic. Receivers, such as a web page implementing an ultrasonic receiver, can listen for the join code and take action. The goal is to allow a device to become a Spot-Remote without having to manually navigate to a URL and manually enter a join code.

### Wireless screensharing
Available on certain web browsers only. This feature allows a Spot-Remote to share a screen into a meeting without being physically connected to the Spot-TV machine. This works by the Spot-Remote creating a direct connection to the jitsi meeting participant, with Spot-TV acting as an intermediary to help establish that direct connection.

### Wired screensharing
Screen sharing can be done by leaving an input dongle attached to a Spot-TV. A device, such as a laptop, can connect to the dongle. Through the Spot setup flow, the dongle is selected as a screensharing input device. When wired screensharing is selected during a meeting, the jitsi meet code will get the video feed from the chosen dongle.
