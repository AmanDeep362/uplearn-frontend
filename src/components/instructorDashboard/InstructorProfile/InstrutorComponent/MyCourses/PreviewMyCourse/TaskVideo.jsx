import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import PlayVideo from "./TaskSubVideo";
import Loader from "../../../../../Loader";

export default function VideosContent(props) {
  let VideoContent = props.videos;
  let navigate = useNavigate();

  const [curentVideo, setCurrentVideo] = useState(VideoContent.courseVideoContent[0]);

  const [active, setactive] = useState({});

  const toggleActive = (index) => {
    setactive({ [index]: !active[index] });
  };

  const playcurrentvideo = (item, index) => {
    setCurrentVideo(item);
    toggleActive(index);
  };

  const DeleteTaskVideo = async (id) => {
    if (window.confirm("Are you Sure you want to delete the Video!") === true) {
      const courseid = VideoContent._id;

      const res = await fetch("/deltemycourseVideos", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          courseid,
        }),
      });

      if (res.status === 200) {
        window.alert('Video Removed Successfully');
        navigate("/instructordashboard/my-courses");
      } else {
        console.log(res);
      }
    } else {
      console.log("Cancel");
    }
  };

  if (VideoContent.courseVideoContent) {
    if (VideoContent.courseVideoContent.length > 0) {
      return (
        <>
          <div className="video-content-container">
            <ul>
              {/* The Heading To Toggle the Video Content  */}
              <li>
                <h3 className="heading-toggler-video">
                  {VideoContent.title}
                </h3>
              </li>

              {/* Show the Name of Videos  */}
              {VideoContent.courseVideoContent.map((item, index) => (
                <div className="video-list-container" key={index}>
                  <li
                    onClick={() => playcurrentvideo(item, index)}
                    className={
                      active[index]
                        ? "video-content-display-list my-active-video"
                        : "video-content-display-list"
                    }
                  >
                    <span
                      onClick={(e) => {
                        DeleteTaskVideo(item._id);
                      }}
                    >
                      <MdDelete />
                    </span>
                    {item.VideoContentTitle}
                  </li>
                </div>
              ))}
            </ul>

            {/* Set the Video And Play it  */}
            <div className="video-display-container">
              <PlayVideo course={VideoContent} id={curentVideo._id} />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="not-available-incourse">
          <h1>Not Video Available</h1>
        </div>
      );
    }
  } else {
    return <Loader />;
  }
}
