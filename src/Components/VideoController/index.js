import React, { useState } from 'react';
import styled from 'styled-components';

import './style.css';

const VideController = ({ randomId, inMeeting, getUserMedia, joinMeetingWithId }) => {
  const [showInput, _setShowInput] = useState(false);
  const [meetingId, _setMeetingId] = useState(null);

  const joinMeeting = (e) => {
    if (!showInput)
      return _setShowInput(true);

    if (!meetingId)
      return alert("Please enter meeting id")
    joinMeetingWithId(meetingId)
  }

  return (
    <Row>
      <Column>
        <div id="errorMsg"></div>
        {
          !inMeeting &&
          <>
            <Button onClick={getUserMedia}>New Meeting 👨🏻‍💻</Button>

            {showInput && <Input type="text" placeholder="Meeting Id " value={meetingId} onChange={({ target }) => _setMeetingId(target.value)} />}
            <Button onClick={joinMeeting}>Join Meeting 🚪</Button>
          </>
        }
        {randomId && <MeetingId>Meeting Id:-) {randomId}</MeetingId>}
        <Row>
          <video id="reciever" autoPlay playsInline>
            <source src="movie.mp4" type="video/mp4"></source>
          </video>
          <video id="sender" autoPlay playsInline>
            <source src="movie.mp4" type="video/mp4"></source>
          </video>
        </Row>
      </Column>
    </Row>
  )
}

export default VideController;

const Row = styled.div`
  max-height: 500px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  padding: 10px 15px;
  text-align: center;
  margin: 10px;
  border:none;
  border-radius: 40px;
  outline: none;
  cursor: pointer;
  font-size: 1.25rem;
  font-family: monospace;
  background-color: rgba(255, 255,255, .8);
  box-shadow: 0 10px 20px 1px rgba(0,0,0,0.2);
  transition: 0.07s ease-in-out;

  &:hover {
    background-color: rgba(255, 255,255, 1);
    transform: scale(1.06)
  }
`

const MeetingId = styled.p`
  color: white;
  font-size: 20px;
  font-family: monospace;
`

const Input = styled.input`
  height: 30px;
  padding: 10px 15px;
  border-radius: 40px;
  border: none;
  outline: none;
  margin: 40px 10px 10px;
  font-family: monospace;
  text-align: center;
  box-shadow: 0 10px 20px 1px rgba(0,0,0,0.2);
  transition: .4s ease-in-out;
`