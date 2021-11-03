import React, { useEffect, useRef, useState } from "react"
import "./Video.css"
import VideoFooter from "./VideoFooter"
import VideoSidebar from "./VideoSidebar"
import useElementOnScreen from "./hooks/useElementOnScreen"
import VideoPlayButton from "./VideoPlayButton"

const Video = ({ url, channel, description, song, likes, messages, shares }) => {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  }
  const isVisibile = useElementOnScreen(options, videoRef)
  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }
  const onFocus = () => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play()
        setPlaying(true)
      }
    }
  }
  const onBlur = () => {
    if (isVisibile) {
      if (playing) {
        videoRef.current.pause()
        setPlaying(false)
      }
    }
  }
  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play()
        setPlaying(true)
      }
    }
    if (!isVisibile) {
      if (playing) {
        videoRef.current.pause()
        setPlaying(false)
      }
    }
  }, [isVisibile])
    
  useEffect(() => {
      window.addEventListener("focus", onFocus)
      window.addEventListener("blur", onBlur)
      // Specify how to clean up after this effect:
      return () => {
        window.removeEventListener("focus", onFocus)
        window.removeEventListener("blur", onBlur)
      }
    }, [onFocus, onBlur])

  return (
    <div className="video">
      <video className="video_player" loop preload="true" ref={videoRef} onClick={onVideoClick} src={url}></video>
      <VideoFooter channel={channel} description={description} song={song} />
      <VideoSidebar likes={likes} messages={messages} shares={shares} />
      {!playing && <VideoPlayButton onVideoClick={onVideoClick} />}
    </div>
  )
}
export default Video
