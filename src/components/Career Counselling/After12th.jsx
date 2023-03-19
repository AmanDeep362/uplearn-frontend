import React, { useEffect, useState } from "react";
import CareerImg from "./../../assets/images/career-img.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function After12th() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const params = useParams();
  const courseCategory = params.after_12;

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
        });
    };
    fetchdata();
  }, [courseCategory]);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="career-counselling">
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
        {/* Main Start  */}
        <div className="afterBannerWrapper">
          <h1>After 12th</h1>
          <div className="courseCategory">
            <div className="courseCategoryItem">
              <h2>Engineering</h2>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "engineering" ? (
                        <li>
                          <Link to={`/carrer-counselling/${item._id}`}>
                            {item.title}
                          </Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>

            <div className="courseCategoryItem">
              <h2>Medical &amp; Health Care</h2>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "medical-health-care" ? (
                        <li>
                          <Link to={`/carrer-counselling/${item._id}`}>
                            {item.title}
                          </Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="courseCategoryItem">
              <h2>Commerce</h2>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "commerce" ? (
                        <li>
                          <Link to={`/carrer-counselling/${item._id}`}>
                            {item.title}
                          </Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="courseCategoryItem">
              <h2>Diploma</h2>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "diploma-in-engineering" ? (
                        <li>
                          <Link to={`/carrer-counselling/${item._id}`}>
                            {item.title}
                          </Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
