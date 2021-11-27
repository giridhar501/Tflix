import React, { useEffect, useContext } from "react";
import CourseFinder from "../apis/CourseFinder";
import { CoursesContext } from "../context/CoursesContext";
import { useHistory } from "react-router-dom";

const CoursesList = (props) => {
  const { courses, setCourses } = useContext(CoursesContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseFinder.get("/");
        setCourses(response.data.data.courses);
      } catch (err) {}
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await CourseFinder.delete(`/${id}`);

      setCourses(
        courses.filter((course) => {
          return course.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {courses &&
        courses.map((course) => {
          return (
            <div className='container' key={course.id}>
              <div className='row'>
                <div className='card col-6 mt-2'>
                  <div className='card-body'>
                    <h5 className='card-title'>{course.name}</h5>
                    <ul className='list-group list-group-flush'>
                      <li className='list-group-item'>
                        Platform:{course.platform}
                      </li>
                      <li className='list-group-item'>
                        Instructor:{course.instructor}
                      </li>
                      <li className='list-group-item'>
                        Price:{course.price_range}
                      </li>
                    </ul>
                    <button
                      onClick={(e) => handleDelete(e, course.id)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CoursesList;
