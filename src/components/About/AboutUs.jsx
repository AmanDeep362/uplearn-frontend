import React, { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {/* The banner image of about us  */}
      <div className="about-banner-image"></div>
      {/* Boxes on Both Side  */}
      <div className="about-uplearn">
        <div className="about-left-side">
          <h1>What is UpLearn?</h1>
          <p>
            At UpLearn, we aim to provide a seamless integration of our online,
            user friendly platform along with the ideal for “Education for all
            barring none”. We aim to make education accessible in all its forms
            to every child in the country, irrespective of their socio-economic
            status through means of this free platform. By bringing instructors
            from all over the country to contribute to our archive of resources
            for the students, we hope to maximize the possibility of each
            student learning while overcoming paywalls and economic barriers.
          </p>
          <br />
          <p>
            In the words of Dr. APJ Abdul Kalam,{" "}
            <q>
              <b>
                Education is the most powerful weapon which can be used to
                change the world
              </b>
            </q>
          </p>
        </div>
      </div>

      <div className="about-uplearn">
        <div className="about-left-side">
          <h1 style={{ textAlign: "left" }}>The Future of Education</h1>
          <p>
            We, at UpLearn firmly believe that it is imperative for every child
            to get an equal access to education at all levels, especially
            unbound by the rigidity of traditional classrooms that often don't
            take into account the socio-economic restrictions on the
            economically weaker sections, thus preventing the students from
            appropriately prioritizing education. The pandemic of 2020 has
            highlighted some previously under-explored methods of teaching,
            vis-a-vis online mode of education. With internet facilities now
            better available in even remote areas, it has significantly improved
            the accessibility of education to the masses.
          </p>
          <h1
            style={{
              textAlign: "left",
              fontSize: "1.75rem",
              margin: "0.75rem 0px",
            }}
          >
            Mission &amp; Vision:
          </h1>
          <ul>
            <li>
              <b>Mission:</b> UpLearn strives to connect students to instructors
              from all over the country, helping them access online resources
              specifically curated in consideration with trends in Indian
              Academic curriculum.
            </li>
            <li>
              <b>Vision:</b> To create equal opportunities for every student to
              access quality education, free of cost outside the restrictions of
              traditional classrooms by engaging in self paced academic and
              extracurricular courses.
            </li>
          </ul>
        </div>
      </div>

      {/* Purpose and Scope About  */}
      <div className="lower-parallel-boxes">
        <div className="lower-left-td">
          <h1>Purpose</h1>
          <p>
            We aim to bridge this gap between education and financial
            disparities, especially among the pandemic concerns by bringing
            quality education without the constraints of real-time classes.
            Together, with the help of learned instructors from all across the
            country, we aim to curate a cost-free, powerful resource base
            equipped with ebooks, video lectures and quizzes, among many more,
            synchronized with the latest trends in education. Additionally, we
            also hope to emphasize the importance of all around holistic
            development of students by inculcating various courses on our
            platform.
          </p>
        </div>
        <div className="lower-right-td">
          <h1>Scope</h1>
          <p>
            UpLearn is a one of its kind platform, that focuses on significantly
            helping students from economically weaker sections of society in
            reaching their true potential, aided with self-paced courses that
            help a child learn at their own pace, without the socio-economic
            pressure of real time classrooms, especially post-pandemic when
            classroom teaching has been thrown into a disarray. At UpLearn, we
            aim to be a stepping stone in each student's academic journey as
            they grow and learn collaboratively.
            <br />
            <b>Padhega Bharat tabhi toh badhega Bharat!</b>
          </p>
        </div>
      </div>
    </>
  );
}
