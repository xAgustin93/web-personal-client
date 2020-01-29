import React, { useState, useEffect } from "react";
import CoursesList from "../../components/Admin/Courses/CoursesList";
import { getCoursesApi } from "../../api/course";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);

  useEffect(() => {
    getCoursesApi().then(response => {
      setCourses(response.courses);
    });
    setReloadCourses(false);
  }, [reloadCourses]);

  return (
    <div className="courses">
      <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    </div>
  );
}
