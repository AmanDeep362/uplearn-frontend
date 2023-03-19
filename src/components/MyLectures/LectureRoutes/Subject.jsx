import React from "react";
import { useParams, Link } from "react-router-dom";

export default function SubjectSelect() {
  const params = useParams();
  const board = params.board;
  const classe = params.class;

  const boardItem = [
    {
      subject: "Mathematics",
    },
    {
      subject: "Science",
    },
    {
      subject: "English",
    },
    {
      subject: "Physics",
    },
    {
      subject: "Chemistry",
    },
    {
      subject: "Biology",
    },
    {
      subject: "Hindi",
    },
    {
      subject: "Computer",
    },
    {
      subject: "History",
    },
    {
      subject: "Civics",
    },
    {
      subject: "Economics",
    },
    {
      subject: "Accounts",
    },
    {
      subject: "Commerce",
    },
    {
      subject: "Art",
    },
    {
      subject: "Social Studies",
    },
    {
      subject: "Physical Education",
    },
    {
      subject: "Other",
    },
  ];

  return (
    <div className="academicCourWrapper">
      <h2>
        For <span style={{ color: "#4262FD" }}>{board}</span> Board and Class
        <span style={{ color: "#4262FD" }}> {classe}</span>
      </h2>
      <h1>Select Your Subject</h1>

      <div className="class">
        {boardItem.map((item, index) => {
          return (
            <div className="classItem" key={index}>
              <Link
                to={"/my-lectures/" + board + "/" + classe + "/" + item.subject}
              >
                <span>{item.subject}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
