import React from "react";
import Header from "../components/Header";
import AddCourse from "../components/AddCourse";
import CourseList from "../components/CoursesList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddCourse />
      <CourseList />
    </div>
  );
};

export default Home;
