import React, { useEffect, useState } from "react";
import CareerImg from "./../../assets/images/career-img.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function After10th() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const params = useParams();
  const courseCategory = params.after_10;

  // console.log(courseCategory);
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("/admin/getAllCareerBy/" + courseCategory)
        .then((response) => {
          // console.log(response.data);
          setData(response.data);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // navigate("/login");
        });
    };
    fetchdata();
  }, [courseCategory]);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="career-counselling">
        {/* The Banner of Carrier Page  */}
        <div className="after-banner">
          <div className="after-banner-text">
            <span>
              Choosing the right
              <br />
              career path
            </span>
          </div>
          <div className="after-banner-img">
            <img src={CareerImg} alt="banner-counselling" />
          </div>
        </div>
        {/* Start main Context  */}
        <div className="afterBannerWrapper">
          <h1>After 10th</h1>
          <div className="courseCategory">
            {/* Category 1  */}
            <div className="courseCategoryItem">
              <h2>Class 11th - 12th</h2>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "class-11-12" ? (
                        <li>
                          <Link to={`/carrer-counselling/${item._id}`}>{item.title}</Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
            {/* Category 2  */}
            <div className="courseCategoryItem">
              <h2>Diploma Courses</h2>
              <span className="courseCateHeading"></span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "diploma-courses" ? (
                        <li>
                          <Link to={`/carrer-counselling/${item._id}`}>{item.title}</Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="courseCategoryItem">
              <h2>ITI Courses</h2>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "iti-courses" ? (
                        <li>
                          <Link to={`/carrer-counselling/${item._id}`}>{item.title}</Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* // end of main  */}
      </div>
    );
  }
}
