import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import SunEditor from "suneditor-react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function AboutCourse() {
  const { id } = useParams();

  const [courseData, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const adminstatus = useSelector((state) => state.AdminReducers);

  useEffect(() => {
    const fetchdata = async () => {
      if (id) {
        await axios
          .get("/admin/getCareerbyId/" + id)
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchdata();
    window.scroll(0, 0);
  }, []);

  const deleteBlog = async () => {
    // const id = id;
    // console.log(id);
    const res = await fetch("/deleteBlog", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (res.status === 200) {
      window.alert("blog is");
      // navigate("/crops", { replace: true });
    } else {
      console.log("Error=====");
    }
  };

  const EDITBLOG = () => {
    const [open, setOpen] = useState(false);
    const [changeBlog, setchangeBlog] = useState({
      title: courseData.title,
    });
    const [Suneditor, setSuneditor] = useState({
      description: courseData.description,
    });
    // console.log(Suneditor);

    const handleClick = () => {
      setOpen(true);
    };

    const postChanges = async () => {
      const { title } = changeBlog;
      const description = Suneditor;
      // console.log(id);
      const res = await fetch("/updateBlog", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          description,
        }),
      });
      if (res.status === 200) {
        window.alert("Blog is Updated");
        window.location.reload();
      }
    };

    const UpdateBlog = () => {
      if (open) {
        return (
          <div style={{ backgroundColor: "green" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Modal title
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form method="POST">
                            <label htmlFor="title">Title :</label> <br />
                            <input
                              style={{ width: "90%" }}
                              type="text"
                              defaultValue={courseData.title}
                              onChange={(e) => {
                                setchangeBlog({
                                  ...changeBlog,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                              placeholder="ENTER THE TITLE..."
                              name="title"
                              id="title"
                            />{" "}
                            <br />
                            <br />
                            <label htmlFor="description">Description :</label>
                            <SunEditor
                              style={{ width: "90%" }}
                              defaultValue={courseData.description}
                              className="description"
                              onChange={(e) => {
                                setSuneditor(e);
                              }}
                              theme="snow"
                            />
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={postChanges}
                                className="btn btn-primary"
                              >
                                Save changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    if (Number(adminstatus.isAdminLoggedIn)) {
      return (
        <>
          <div className="admin-btn-container">
            <button
              type="button"
              style={{ margin: "20px" }}
              className="btn btn-primary"
              onClick={handleClick}
            >
              <i className="fa fa-edit"></i> Edit this Blog
            </button>
            {console.log(open)}

            <UpdateBlog />
            <button
              type="button"
              style={{ margin: "20px" }}
              onClick={deleteBlog}
            >
              <i className="fa fa-trash"></i> DELETE this Blog
            </button>
            <div
              className="modal fade"
              id="exampleModal2"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel2"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel2">
                      Delete Blog
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Do you want to Delete the Blog?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={deleteBlog}
                      type="button"
                      className="btn btn-primary"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  if (IsLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div
          className="carrier-counselling-display"
        >
          <h1>
            {courseData.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: courseData.description }}
          ></div>
          <EDITBLOG />
        </div>
      </div>
    );
  }
}
