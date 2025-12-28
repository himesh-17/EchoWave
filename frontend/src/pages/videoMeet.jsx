import React, { useEffect, useRef, useState } from 'react'
import { Button, TextField } from "@mui/material"
import { io } from "socket.io-client";

const server = "http://localhost:8000/";


export default function VideoMeet() {

  var socketRef = useRef();

  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState();

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setModal] = useState(true);

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([])

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(3);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef([])

  let [videos, setVideos] = useState([]);

  const getPermission = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }
      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }


    } catch {

    }
  }

  useEffect(() => {
    getPermission();
  }, []);

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
        .then()
        .then()
        .catch(e => console.log(e));
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => { track.stop() });
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [video, audio]);

  let connectTOSocketServer = () => {
    socketRef.current = io.connect(server, { secure: false });
    socketRef.current.on("connect" , ()=>{
      socketRef.current.emit("join-call" , window.location.href);
    })

  }


  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectTOSocketServer();
  }

  let connect = () => {
    setAskForUsername(false);
    getMedia();

  }
  return (
    <div>
      {askForUsername === true ? <div>
        <h2>Enter into Lobby </h2>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => { setUsername(e.target.value) }}
        />
        <Button variant="contained"
        onClick={connect}
        >
          Connect
        </Button>

        <div>
          <video ref={localVideoRef} autoPlay muted>
          </video>
        </div>
      </div> : <></>}
    </div>
  )
}
