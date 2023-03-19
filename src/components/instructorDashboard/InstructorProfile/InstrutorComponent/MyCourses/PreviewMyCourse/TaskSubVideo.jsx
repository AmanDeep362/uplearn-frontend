import React from "react";
import ReactPlayer from "react-player";

export default function PlayVideo(props) {
  let videodata;
  let video = [];
  // Find Which video will be played
  if (props) {
    videodata = props.course.courseVideoContent;
    if (videodata) {
      video = videodata.find((i) => i._id === props.id);
    }
  }

  return (
    <>
      {/* Render a video player */}
      <div className="inner-video-container">
        <ReactPlayer
          url={video.VideoLecture}
          controls={true}
        />
      </div>
    </>
  );
}
