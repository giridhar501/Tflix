import React, { useState, useContext } from "react";
import CourseFinder from "../apis/CourseFinder";
import { CoursesContext } from "../context/CoursesContext";

const AddCourse = () => {
  const { addCourses } = useContext(CoursesContext);
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [instructor, setInstructor] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CourseFinder.post("/", {
        name,
        platform,
        instructor,
        price_range: priceRange,
      });
      console.log(response.data.data);
      addCourses(response.data.data.course);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Platform"
            />
          </div>
          <div className="col">
            <input
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Instructor"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
            disabled
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
