const RTCConfig = ({
  connected,
  mediaStreamConnected,
  mediaStreamRemoved,
  mediaStreamRemoteRemoved,
  datachannelOpen,
  datachannelMessage,
  datachannelError,
  datachannelClose
}) => ({
  devMode: true,
  videoIdLocal: 'localVideo',
  videoIdRemote: 'remoteVideo',
  connected: connected,
  mediaStreamConnected: mediaStreamConnected,
  mediaStreamRemoved: mediaStreamRemoved,
  mediaStreamRemoteRemoved: mediaStreamRemoteRemoved,
  datachannels: [
    {
      name: 'text',
      callbacks: {
        open: datachannelOpen,
        message: datachannelMessage,
        error: datachannelError,
        close: datachannelClose
      }
    }
  ],
  iceServers: [
    {
      url: 'stun:stun.l.google.com:19302'
    }
  ]
});

export default RTCConfig;

