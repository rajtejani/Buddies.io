import React, { useEffect, useState } from 'react';
import NeatRTC from 'neat-rtc';
import styled from 'styled-components';

import { VideoController, BottomActionBar } from '../../Components';
import RTCConfig from '../../configs/RTC.config';

const P2P = require('socket.io-p2p');
const io = require('socket.io-client');
const socket = io();
const opts = { numClients: 10, autoUpgrade: false, }; // connect up to 10 clients at a time
const p2psocket = new P2P(socket, opts, function () {
  console.log('We all speak WebRTC now');
});

const Home = () => {
  const [inMeeting, _setInMeeting] = useState(false);
  const [randomId, _setRandomId] = useState(null);

  const constraints = window.constraints = {
    audio: true,
    video: true
  };

  useEffect(() => {
    p2psocket.on('peer-msg', function (data) {
      // append message to list
      console.log("-*-* new Message -*-*", data);
    });

    p2psocket.on('go-private', function () {
      p2psocket.upgrade(); // upgrade to peerConnection
    });
  })

  const handleSuccess = (stream) => {
    const randomId = String(new Date() - new Date().setHours(0, 0, 0, 0));
    const video = document.querySelector('#reciever');
    const videoTracks = stream.getVideoTracks();

    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);

    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
    _setRandomId(randomId);
    _setInMeeting(true);

    p2psocket.emit('peer-msg', { textVal: +new Date() })
  }

  const handleError = (error) => {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video;
      errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
  }

  const errorMsg = (msg, error) => {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

  const getUserMedia = async (e) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
      e.target.disabled = true;
    } catch (e) {
      handleError(e);
    }
  }

  const getDislayMedia = () => {

  }

  const joinMeetingWithId = (meetingId) => {

  }

  return (
    <Wrapepr>
      <H1 >Welcome to WebRTC Demo 🔥</H1>
      <VideoController
        randomId={randomId}
        inMeeting={inMeeting}
        getUserMedia={getUserMedia}
        joinMeetingWithId={joinMeetingWithId} />
      {/* <BottomActionBar /> */}
    </Wrapepr>
  )
}

export default Home;

const Wrapepr = styled.div`
  height: 100vh;
  width: 100vw;
`

const H1 = styled.h1`
  text-align: center;
  font-size: 5rem;
`


  // const [rtc, _setRTC] = useState(null);

  // useEffect(() => {
  //   const config = RTCConfig(connected,
  //     mediaStreamConnected,
  //     mediaStreamRemoved,
  //     mediaStreamRemoteRemoved,
  //     datachannelOpen,
  //     datachannelMessage,
  //     datachannelError,
  //     datachannelClose)
  //   const rtc = new NeatRTC(config, sendSignalingMessage);

  //   _setRTC(rtc);
  //   return () => { }
  // }, []);

  // const connected = () => {
  //   console.log("  connected  ");
  // }
  // const mediaStreamConnected = () => {
  //   console.log("  mediaStreamConnected  ");
  // }
  // const mediaStreamRemoved = () => {
  //   console.log("  mediaStreamRemoved  ");
  // }
  // const mediaStreamRemoteRemoved = () => {
  //   console.log(" mediaStreamRemoteRemoved ");
  // }
  // const datachannelOpen = () => {
  //   console.log(" datachannelOpen ");
  // }
  // const datachannelMessage = () => {
  //   console.log(" datachannelMessage ");
  // }
  // const datachannelError = (err) => {
  //   console.log(" datachannelError ", err);
  // }
  // const datachannelClose = () => {
  //   console.log("  datachannelClose ");
  // }

  // const sendSignalingMessage = (message) => {
  //   console.log('signaling', message);
  // }