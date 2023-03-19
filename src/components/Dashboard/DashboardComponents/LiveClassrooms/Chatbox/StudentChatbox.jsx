import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";


export default function StudentChatbox(props) {

  const [MyMessage, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const MyClassrooms = props.MyClassroom;
  const StudentInfo = props.StudentInfo;
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
    let senderId = StudentInfo._id;
    let senderName = StudentInfo.name;

    axios
      .post("/sendmessagebystudent", {
        classId,
        message,
        senderId,
        senderName,
      })
      .then((response) => {
        setMessageData(response.data.messages);
        setMessage("");
      }).catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {messageData.map((message) => {
            return (
              <div key={message._id}>
                {message.senderId === StudentInfo._id ? (
                  <Message own={true} message = {message} /> 
                ) : (
                  <Message message = {message} />
                )}
              </div>
            );
          })}
        </div>


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


      </div>
    </div>
  );
}
