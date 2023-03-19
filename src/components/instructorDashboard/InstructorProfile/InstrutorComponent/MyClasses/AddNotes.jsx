import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
// import Loader from "./../../assets/images/progressbar.gif";

export default function AddNotes() {
  let navigate = useNavigate();

  const [NOTES, setNOTES] = useState({
    notesName: "",
  });

  var Notes_Pdf = "";

  const [NotesPdf, setnotesPdf] = useState("");
  const [err, seterr] = useState("");
  const [NotesPdfData, setNotesPdfData] = useState();

  const handleChange = (event) => {
    // console.log(NOTES);
    setNOTES({ ...NOTES, [event.target.name]: event.target.value });
    seterr("");
  };
  const submitI = async (image, imageData) => {
    if (image === "") {
      window.alert("Please Upload an Image.");
    } else {
      const formData = new FormData();
      formData.append("image", imageData);

      fetch(`/upload_image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            Notes_Pdf = data.image.image;
          }
        });
    }
  };

  const handleValidation = () => {
    if (!NOTES.notesName || !NotesPdf) {
      seterr("Please Enter all required Fields.");
      return false;
    } else if (NotesPdf === "") {
      seterr("Please Upload pdf of Notes.");
      return false;
    }
    return true;
  };

  const postData = async () => {
    const NotesPdf = Notes_Pdf;
    const { notesName } = NOTES;

    const res = await fetch("/addnotesbyinstructor", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        notesName,
        NotesPdf,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Notes Added ");
      navigate("/instructordashboard/my-classroom");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  function validateNotesPdf(e) {
    setnotesPdf(e.target.files[0].name);
    setNotesPdfData(e.target.files[0]);
  }
  const time = 10000;
  function sendData() {
    setTimeout(function () {
      console.log(Notes_Pdf + " ");
      if (Notes_Pdf == "") {
        sendData();
      } else {
        postData();
      }
    }, time);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      // document.getElementById("addBookBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      //   // Send Images to cloud
      await submitI(NotesPdf, NotesPdfData);

      // Send Data to Backend after 10 sec
      sendData();
    }
  };
  return (
    <>
      <div className="maincontainer">
        <div className="instructorHeader">
          <Link to="/">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        <div className="addBookWrapper">
          <div className="addBookForm" style={{ width: "400px" }}>
            <form action="">
              <h3>Notes</h3>

              <div className="fields">
                <div className="addBookInputField">
                  <label htmlFor="notesName">
                    Notes Title <span className="star">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    id="notesName"
                    name="notesName"
                    placeholder="Enter title"
                    value={NOTES.notesName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="fields">
                <div className="addBookInputField btn">
                  <label htmlFor="bookPdf">
                    Notes Pdf <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    id="NotesPdf"
                    className="uploadBtn"
                    // className="bookPdf"
                    accept="application/pdf"
                    onChange={(e) => {
                      validateNotesPdf(e);
                    }}
                  />
                  <p>{NotesPdf}</p>
                </div>
              </div>

              <div className="addbook-footer addBookBtn">
                {/* <div>
                  <img src={Loader} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
                </div> */}
                <div className="submit-btn">
                  <input
                    type="submit"
                    id="addNotesBtn"
                    className="addBtn"
                    onClick={handleSubmit}
                    value="Add Notes"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
