import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../../../Loader";

export default function ArticleContent(props) {
  // Store Props value in a variable
  const CourseArticle = props.course;
  const id = props.id;
  let courseArticlecontent = [];

  const [hidden, setHidden] = useState({});

  // Checking is Data is availabe else show no Article available
  if (CourseArticle.courseArticles) {
    if (CourseArticle.courseArticles.length > 0) {
      courseArticlecontent = CourseArticle.courseArticles;
      let i = 1;

      const toggleHide = (index) => {
        setHidden({ [index]: !hidden[index] });
        window.scroll(0, 120);
      };

      // The Main Area Where Article were Written
      return (
        <div className="article-content-container">
          <ul>
            {courseArticlecontent.map((item, index) => (
              <div key={index}>
                <li onClick={() => toggleHide(index)}>
                  {"1." + i++} &nbsp; {item.ArticleTitle}
                  <span className="left-icon-article">
                    <Link
                      to={
                        "/my-course/edit-course-article/" +
                        item._id +
                        "/" +
                        id
                      }
                    >
                      Edit Task
                    </Link>
                  </span>
                </li>

                {hidden[index] && (
                  <div
                    className="articleDisplaycontainer"
                    dangerouslySetInnerHTML={{ __html: item.ArticleContent }}
                  ></div>
                )}
              </div>
            ))}
          </ul>
        </div>
      );
    }
    // Will Be Shown When no article is available
    else {
      return (
        <div className="not-available-incourse">
          <h1>Not Article Available</h1>
        </div>
      );
    }
  } else {
    return <Loader />;
  }
}
