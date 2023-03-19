import React from "react";
import { Link } from "react-router-dom";

export default function BoardSelect() {
  const boardItem = [
    {
      id: 1,
      board: "CBSE",
      value: "CBSE"
    },   
    {
      id: 2,
      board: "ICSE",
      value: "ICSE"
    },
    {
      id: 3,
      board: "HaryanaBoard",
      value: "Haryana Board"
    },
    {
      id: 4,
      board: "UPBoard",
      value: "UP Board"
    },
    {
      id: 5,
      board: "RajasthanBoard",
      value: "Rajasthan Board"
    },
    {
      id: 6,
      board: "PunjabBoard",
      value: "Punjab Board"
    },
    {
      id: 7,
      board: "HimachalBoard",
      value: "Himachal Board"
    },
    {
      id: 8,
      board: "Other",
      value: "Other Board"
    },
  ];

  return (
    <div className="academicCourWrapper">
      <h1>Select Your Board</h1>

      <div className="class">
        {boardItem.map((item, index) => {
          return (
            <div className="classItem" key={index}>
              <Link to={"/my-lectures/" + item.board}>
                <span>{item.value}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
