import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import LibraryHome from "./LibraryBooks";
import LibraryBanner from "./../../assets/images/Librarybanner.jpeg";
import axios from "axios";
import Loader from "../Loader";
var CryptoJS = require("crypto-js");

export default function LibraryPage() {

  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [User,SetUser] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const [Library, SetLibrary] = useState([]);
  const [BackupLibrary, SetBackupLibrary] = useState([]);
  const [inputbook, setinputbook] = useState('');

  const [bookCategory, setbookCategory] = useState('');
  const [bookClass, setbookClass] = useState('');
  const [bookExam, setbookExam] = useState('');


  // Function to Present the Extra Slect option to filter out Data 
  const BOOKCHOICE = () => {
    if (bookCategory === "School") {
      return (
        <>
          <label htmlFor="bookclass">
            <b>Select Class</b><span className="star">*</span>
          </label>
          <select id="bookclass" name="bookclass"  
            value={bookClass}
            onChange={(e) => {setbookClass(e.target.value)}}
          >
            <option value="">Select class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </>
      );
    } 
    else if (bookCategory === "Exam") {
      return (
        <>
          <label htmlFor="bookclass1">
            <b>Select Exam</b><span className="star">*</span>
          </label>
          <select id="bookclass1" name="bookclass"
             value={bookExam}
             onChange={(e) => {setbookExam(e.target.value)}}
          >
            <option value="">Select Exam</option>
            <option value="Jee">JEE</option>
            <option value="Neet">NEET</option>
            <option value="Cat">CAT</option>
            <option value="Gate">GATE</option>
            <option value="Upsc">UPSC</option>
            <option value="Other">Other</option>
          </select>
        </>
      );
    }
  };


  useEffect(() => {
    window.scroll(0, 0);
    // Decrypting the User Role
    if(loginDetails.userRole !== ''){
      var bytes = CryptoJS.AES.decrypt(loginDetails.userRole, 'my-secret-key@123');
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is  Login Or Not 
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") 
    {
      // call the fetch admin detail function 
      const fetchdata = async () =>{
        await axios.get("/aboutInstructor").then(response => {
          SetUser(response.data);
          })
          .catch(error => {
            console.log(error);
            navigate("/login");
          });
      }
      fetchdata();
    }
    else if((Number(loginDetails.isLoggedIn) && role === "STUDENT")){
        // call the fetch admin detail function 
        const fetchdata = async () =>{
            await axios.get("/aboutStudents").then(response => {
              SetUser(response.data);
              })
              .catch(error => {
                console.log(error);
                navigate("/login");
              });
        }
        fetchdata();
    }
    // If User is not login redirect to login 
    else{
      navigate("/login");
    }

    // For Suggestions in Inputbox 
    const fetchBooks = async () =>{
      await axios.get("/librarybooks").then(response => {
        SetLibrary(response.data);
        SetBackupLibrary(response.data);
        setisLoading(false);
        })
        .catch(error => {
          console.log(error);
          navigate("/login");
        });
    }
    fetchBooks();
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);


  const SearchTheBooks = () => { 
    if(inputbook === ''){
      SetLibrary(BackupLibrary);
    }
    else{
      var ans = BackupLibrary.map((a) => {
        if(a.bookName.toUpperCase().search(inputbook.toUpperCase()) > -1){
            return a
        }
      });

      ans = ans.filter((e) => e !== undefined)
      SetLibrary(ans);
    }
  }

  const SearchByChoice = () => {
    
    if(bookCategory === 'Exam' && bookExam !== ''){
        let ans = BackupLibrary.map((a) => {
          if(a.bookclass.search(bookExam) > -1){
              return a
          }
        });
  
        ans = ans.filter((e) => e !== undefined)
        SetLibrary(ans);
    }
    else if(bookCategory === 'School' && bookClass !== ''){
      let ans = BackupLibrary.map((a) => {
            return a
      });

      ans = ans.filter((e) => e.bookclass === bookClass)
      SetLibrary(ans);
    }  
    else
    {
      let ans = BackupLibrary.map((a) => {
        if(a.bookCategory.search(bookCategory) > -1){
            return a
        }
      });

      ans = ans.filter((e) => e !== undefined)
      SetLibrary(ans);
    }
  }

  if(isLoading){
    return(
      <Loader />
    )
  }

  else{
    return (
      <>
      <div className="lib-main-container">
        {/* Banner Image of Library  */}
        <div className="Library-banner">
          <img src={LibraryBanner} alt="Banner" />
        </div>
        {/* Main Content of Library  */}
        <div className="library-container">
          {/* Heading Library  */}
          <div className="library-heading">
            <h1>Uplearn Online Library</h1>
            <p>
              Here you get all NCERT books also Books for preparing Exams Like
              JEE,NEET,CAT,UPSC etc.
            </p>
          </div>
          {/* filter Out Function  */}
          <div className="library-filter-container">
              {/* Input Bar  */}
              <div className="librarySearch">
                <input list="library-search" 
                  name="librarySearch" 
                  placeholder="What are you looking for ?"
                  onChange={(e) => {setinputbook(e.target.value)}}
                />
                {
                  (BackupLibrary.length > 0) ? 
                    <datalist id="library-search">
                      {BackupLibrary.map((item) => (
                        <option value={item.bookName} />
                      ))}
                    </datalist>
                  : null
                }
                
                <button type="submit" onClick={SearchTheBooks}>
                    <i><MdSearch /></i> Search
                </button>
              </div>

              <div className="libraryChoice">
                {/* Choices  */}
                <label htmlFor="bookCategory">
                  <b>Select Book</b> <span className="star">*</span>
                </label>

                <input
                  type="radio"
                  id="School"
                  name="bookCategory"
                  value="School"
                  onChange={(e) => {setbookCategory(e.target.value)}}
                />
                <label htmlFor="School"> For School</label>

                <input
                  type="radio"
                  id="Exam"
                  name="bookCategory"
                  value="Exam"
                  onChange={(e) => {setbookCategory(e.target.value)}}
                />
                <label htmlFor="Exam"> For Competetive Exam</label>

                <div className="libraryChoice">
                  <BOOKCHOICE />
                  {/* Button to Filter  */}
                  {bookCategory ? <button onClick={SearchByChoice}>Filter</button> : null}                  
                </div>
              </div>
          </div>
          {/* Section Show all AvailableBooks  */}
          <div className="library-card-containerr">
              <LibraryHome data={Library} bookfind={inputbook}/>
          </div>
        </div>
      </div>
      </>
    );
  }
}
