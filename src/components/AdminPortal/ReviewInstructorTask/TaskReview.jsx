import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";

function ReviewTaskAdmin(props) {
  const CourseInstructor = props.teacher;
  let navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [invalid, setinvalid] = useState("");
  const [values, setValues] = useState({
    body: "",
    due: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setinvalid("");
  };

  const HandleSubmit = () => {
    if (values.body === "") {
      setinvalid("Please Enter a valid reply message.");
    } else if (values.due === "") {
      setinvalid("Please Enter a new due date.");
    } else {
      RejectInstructorLecture();
    }
  };

  const VerifyInstructorLecture = async () => {
    window.alert("Want to Verify Task ?");

    const id = CourseInstructor._id;
    const name = CourseInstructor.TeacherId.Teachername;
    const email = CourseInstructor.TeacherId.email;

    const res = await fetch("/verifyinstructorttask", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        email,
      }),
    });
    if (res.status === 200) {
      window.alert("Task Successfully Verified");
      navigate("/admin-portal-review-assign-task-190310554227");
    } else {
      window.alert("Error occured , try again");
    }
  };

  const RejectInstructorLecture = async () => {
    const id = CourseInstructor._id;
    const name = CourseInstructor.TeacherId.Teachername;
    const email = CourseInstructor.TeacherId.email;
    const subject = values.subject;
    const duedate = values.due;
    const message = values.body;

    const res = await fetch("/rejectedinstructorttask", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        email,
        subject,
        duedate,
        message,
      }),
    });
    if (res.status === 200) {
      window.alert("Task Rejected");
      setOpenModal(false);
      navigate("/admin-portal-review-assign-task-190310554227");
    } else {
      window.alert("Error occured , try again");
      setOpenModal(false);
    }
  };
  // Checking is Data is availabe
  if (CourseInstructor) {
    // The Main Area Where review is written
    return (
      <>
        <div className="add-course-container">
          {/* Body Of Content  */}
          <div className="add-course-body">
            {/* Inner Body Container  */}
            <div className="add-course-form-container">
              <h1>Review Task</h1>
              {/* The Task description  */}
              <hr />
              <p className="assignedtaskpreviewdefine">
                <b>Task Description</b>
              </p>
              {CourseInstructor ? (
                <div className="assignedtaskpreview">
                  <p className="asstskdecp">
                    {CourseInstructor.ChapterDescription}
                  </p>

                  {/* More Details of Task  */}
                  <div className="assignedtaskpreview_inner">
                    <p>
                      <b>Chapter No : </b>
                      <br />
                      {CourseInstructor.ChapterNo}
                    </p>
                    <p>
                      <b>Chapter Name : </b>
                      <br />
                      {CourseInstructor.ChapterName}
                    </p>
                    <p>
                      <b>Subject : </b>
                      <br />
                      {CourseInstructor.Subject}
                    </p>
                    <p>
                      <b>Board : </b>
                      <br />
                      {CourseInstructor.Board}
                    </p>
                    <p>
                      <b>Class : </b>
                      <br />
                      {CourseInstructor.Class}
                    </p>
                    <p>
                      <b>Assign Date : </b>
                      <br />
                      {CourseInstructor.StartAt}
                    </p>
                    <p>
                      <b>Due Date : </b>
                      <br />
                      {CourseInstructor.DueDate}
                    </p>
                  </div>
                </div>
              ) : null}

              {/* The Instructor Detail  */}
              <br />
              <hr />
              <p className="assignedtaskpreviewdefine">
                <b>Assign To</b>
              </p>
              {CourseInstructor.TeacherId ? (
                <div className="assignedtaskpreview">
                  {/* More Details of Task  */}
                  <div className="assignedtaskpreview_inner">
                    <p>
                      <b>Name: : </b>
                      <br />
                      {CourseInstructor.TeacherId.Teachername}
                    </p>
                    <p>
                      <b>Email: </b>
                      <br />
                      {CourseInstructor.TeacherId.email}
                    </p>
                    <p>
                      <b>Mobile: </b>
                      <br />
                      {CourseInstructor.TeacherId.mobileno}
                    </p>
                    <p>
                      <b>Subject : </b>
                      <br />
                      {CourseInstructor.TeacherId.subject}
                    </p>
                    <p>
                      <b>State : </b>
                      <br />
                      {CourseInstructor.TeacherId.state}
                    </p>
                    <p>
                      <b>School : </b>
                      <br />
                      {CourseInstructor.TeacherId.school}
                    </p>
                    <p>
                      <b>Address: </b>
                      <br />
                      {CourseInstructor.TeacherId.permanentAddress}
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Buttons To Verify And Reject Task  */}
              <div className="review-instructor-task-buttons">
                {/* Accept Button  */}
                <button
                  onClick={VerifyInstructorLecture}
                  className="review-success-btn"
                >
                  Verify Task
                </button>
                {/* Reject Button  */}
                <button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="review-reject-btn"
                >
                  Reject Task
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Created a Modal to Send Reject Message  */}
        {openModal && (
          <div>
            {/*  The Modal  */}
            <div className="modal cont-md">
              {/* Modal content */}
              <div className="modal-content cont-innmd">
                <span
                  className="close"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  &times;
                </span>

                <div>
                  <h2>Reject Instructor Task</h2>

                  {/* Making the Input tag To send Reply  */}
                  <div className="signInput">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      name="due"
                      value={values.due}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="signInput">
                    <label htmlFor="message">Reason</label>
                    <textarea
                      rows={3}
                      cols={25}
                      style={{lineHeight: '21px', padding: '1rem'}}
                      size="50"
                      id="message"
                      type="text"
                      name="body"
                      placeholder="Reject Reason"
                      value={values.body}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <p className="invalid">{invalid}</p>
                  <button onClick={HandleSubmit}>Send</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End Of Modal  */}
      </>
    );
  } else {
    return <Loader />;
  }
}

export default ReviewTaskAdmin;
