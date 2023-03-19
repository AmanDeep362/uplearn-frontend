import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Loader from "./../../assets/images/progressbar.gif";

export default function AddBook() {

  let navigate = useNavigate();

  const [adminInfo, setadminInfo] = useState("");
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [BOOKS, setBOOKS] = useState({
    bookName: "",
    AuthorName: "",
    bookCategory: "",
    bookclass: "",
    bookSubject: "",
  });

  const [bookImage, setbookImage] = useState("");
  const [BookImageData, setBookImageData] = useState();

  var Book_Image = "", Book_Pdf = "";

  const [bookPdf, setbookPdf] = useState("");
  const [err, seterr] = useState("");
  const [bookPdfData, setbookPdfData] = useState();

  const handleChange = (event) => {
    console.log(BOOKS);
    setBOOKS({ ...BOOKS, [event.target.name]: event.target.value });
    seterr("");
  };

  const handleValidation = () => {
    if (
      !BOOKS.bookName ||
      !BOOKS.AuthorName ||
      !BOOKS.bookCategory ||
      !BOOKS.bookclass ||
      !bookImage ||
      !bookPdf ||
      !BOOKS.bookSubject
    ) 
    {
      seterr("Please Enter all required Fields.");
      return false;
    } 
    else if (bookImage === "") {
      seterr("Please Upload Book Image.");
      return false;
    } 
    else if (bookPdf === "") {
      seterr("Please Upload pdf of Book.");
      return false;
    }
    return true;
  };

  const submitImage = async (image, imageData, imagevalue) => {

    if (image === "") {
      window.alert("Please Upload an Image.");
    } 
    else {
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
          } 
          else {
            if (imagevalue === "bookImage") {
              Book_Image = data.image.image;
            } 
            else if (imagevalue === "bookPdf") {
              Book_Pdf = data.image.image;
            }
          }
        });
    }
  };

  const postData = async () => {
    const BookImage = Book_Image;
    const BookPdf = Book_Pdf;
    const { bookName, AuthorName, bookCategory, bookclass, bookSubject } =
      BOOKS;

    const res = await fetch("/addBookToLibrary", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        bookName,
        AuthorName,
        bookCategory,
        bookclass,
        BookImage,
        BookPdf,
        bookSubject,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Book Added to Library");
      navigate("/admin-portal-home-190310554227");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutAdminActive")
          .then((response) => {
            setadminInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/admin-portal-login-190310554227");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/admin-portal-login-190310554227");
    }
  }, [adminstatus.isAdminLoggedIn, navigate]);

  const BOOKCHOICE = () => {
    if (BOOKS.bookCategory === "School") {
      return (
        <>
          <div>
              <label htmlFor="bookclass">
                  Select Class<span className="star">*</span>
              </label>
              <select id="bookclass" name="bookclass" value={BOOKS.bookclass} onChange={(e) => handleChange(e)}>
                <option  disabled   value="">Select class:</option>
                <option  onChange={(e) => handleChange(e)} value="1">Class 1</option>
                <option  onChange={(e) => handleChange(e)} value="2">Class 2</option>
                <option  onChange={(e) => handleChange(e)} value="3">Class 3</option>
                <option  onChange={(e) => handleChange(e)} value="4">Class 4</option>
                <option  onChange={(e) => handleChange(e)} value="5">Class 5</option>
                <option  onChange={(e) => handleChange(e)} value="6">Class 6</option>
                <option  onChange={(e) => handleChange(e)} value="7">Class 7</option>
                <option  onChange={(e) => handleChange(e)} value="8">Class 8</option>
                <option  onChange={(e) => handleChange(e)} value="9">Class 9</option>
                <option  onChange={(e) => handleChange(e)} value="10">Class 10</option>
                <option  onChange={(e) => handleChange(e)} value="11">Class 11</option>
                <option  onChange={(e) => handleChange(e)} value="12">Class 12</option>
              </select>
          </div>
        </>
      );
    } 
    else if (BOOKS.bookCategory === "Exam") {
      return (
        <>
          <div>
              <label htmlFor="bookclass1">
                Select Exam<span className="star">*</span>
              </label>
              <select id="bookclass1" name="bookclass" value={BOOKS.bookclass} onChange={(e) => handleChange(e)}>
                <option value="" disabled>Select Exam:</option>
                <option  onChange={(e) => handleChange(e)} value="Jee">Jee</option>
                <option  onChange={(e) => handleChange(e)} value="Neet">Neet</option>
                <option  onChange={(e) => handleChange(e)} value="Cat">Cat</option>
                <option  onChange={(e) => handleChange(e)} value="Gate">Gate</option>
                <option  onChange={(e) => handleChange(e)} value="Upsc">Upsc</option>
                <option  onChange={(e) => handleChange(e)} value="Other">Other</option>
              </select>
          </div>
        </>
      );
    }
  };

  function validateBookImage(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } 
    else {
      setbookImage(e.target.files[0].name);
      setBookImageData(e.target.files[0]);
    }
  }

  function validateBookPdf(e) {
    setbookPdf(e.target.files[0].name);
    setbookPdfData(e.target.files[0]);
  }
  const time = 10000;
  function sendData () {
    setTimeout(function () {
      console.log(Book_Pdf +" "+Book_Image);
    if(Book_Pdf=="" || Book_Image==""){
       sendData();
    }
    else{
    postData();
    }
  }, time);
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addBookBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      // Send Images to cloud
      await submitImage(bookImage, BookImageData, "bookImage");
      await submitImage(bookPdf, bookPdfData, "bookPdf");

      // Send Data to Backend after 10 sec
      sendData();
    }
  };
  return (
    <>
      <div className="maincontainer">
        <div className="instructorHeader">
          <Link to="/admin-portal-home-190310554227">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        <div className="addBookWrapper">
          <div className="addBookForm">
            <form action="">
              <h3>Add Books Into Library</h3>

              <div className="fields">
                <div className="addBookInputField">
                  <label htmlFor="bookName">
                    Enter Book Name <span className="star">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    id="bookName"
                    name="bookName"
                    placeholder="NCERT Science"
                    value={BOOKS.bookName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="addBookInputField">
                  <label htmlFor="AuthorName">
                    Enter Book Author Name <span className="star">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    id="AuthorName"
                    name="AuthorName"
                    placeholder="Rs Aggarwal"
                    value={BOOKS.AuthorName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="addBookInputField">
                  <label htmlFor="bookSubject">
                    Enter Book Subject <span className="star">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    id="bookSubject"
                    name="bookSubject"
                    placeholder="English"
                    value={BOOKS.bookSubject}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="fields">
                <div className="field">
                  <label htmlFor="bookCategory">
                    Choose <span className="star">*</span>
                  </label>{" "}
                  <div>
                    <input
                      type="radio"
                      id="School"
                      name="bookCategory"
                      value="School"
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="School"> For School</label> <br />
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Exam"
                      name="bookCategory"
                      value="Exam"
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="Exam"> For Competetive Exam</label> <br />
                  </div>
                </div>

                <div className="addBookInputField">
               <BOOKCHOICE/>
                </div>
                <div className="addBookInputField btn">
                  <label htmlFor="bookImage">
                    Book Image <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    id="bookImage"
                    className="uploadBtn"
                    // className="bookImage"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      validateBookImage(e);
                    }}
                  />
                  <p>{bookImage}</p>
                </div>
                <div className="addBookInputField btn">
                  <label htmlFor="bookPdf">
                    Book Pdf <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    id="bookPdf"
                    className="uploadBtn"
                    // className="bookPdf"
                    accept="application/pdf"
                    onChange={(e) => {
                      validateBookPdf(e);
                    }}
                  />
                  <p>{bookPdf}</p>
                </div>
              </div>

              <div className="addbook-footer addBookBtn">
                <div>
                  <img src={Loader} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    id="addBookBtn"
                    className="addBtn"
                    onClick={handleSubmit}
                    value="Add Book"
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
