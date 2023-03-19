import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Message from "./Message";

export default function Chatbox(props) {
  const [MyMessage, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const MyClassrooms = props.MyClassroom[0];
  const instructorInfo = props.instructorInfo;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/myClass/" + id)
      .then((response) => {
        setMessageData(response.data[0].messages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const postmessage = () => {
    let classId = MyClassrooms._id;
    let message = MyMessage;
    let senderId = instructorInfo._id;
    let senderName = instructorInfo.Teachername;
    axios
      .post("/sendmessage", {
        classId,
        message,
        senderId,
        senderName,
      })
      .then((response) => {
        setMessageData(response.data.messages);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        {/* messages all */}
        <div className="chatBoxTop">
          {messageData.map((message) => {
            return (
              <div key={message._id}>
                {message.isInstructor === true ? (
                  <Message own={true} message = {message} /> 
                ) : (
                  <Message message = {message} />
                )}
              </div>
            );
          })}
        </div>

        {/* send message box */}
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="write something..."
            value={MyMessage}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <button className="chatSubmitButton" onClick={postmessage}>
            Send
          </button>
        </div>
        {/* end of box */}
      </div>
    </div>
  );
}
