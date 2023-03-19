import React, { useEffect, useState } from "react";
import CareerImg from "./../../assets/images/career-img.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function ScholarshipCounselling() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const params = useParams();
  const courseCategory = params.scholarship;

  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("/admin/getAllCareerBy/" + courseCategory)
        .then((response) => {
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
        <div className="after-banner">
          <div className="after-banner-text">
            <span>
              Choosing the right
              <br />
              career path
            </span>
          </div>
          <div className="after-banner-img">
            <img src={CareerImg} alt="banner" />
          </div>
        </div>
        <div className="afterBannerWrapper">
          <h1>Scholarship</h1>
          <div className="courseCategory">
            <div className="courseCategoryItem">
              <h2>Central Scheme</h2>
              <ul>
                {data.map((item) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "central" ? (
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
              <h2>UGC-AICTE Scheme</h2>
              <ul>
                {data.map((item) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "ugc-aicte" ? (
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
              <h2>State Schemes</h2>
              <ul>
                {data.map((item) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "state" ? (
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
