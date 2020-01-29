import React, { useState, useEffect } from "react";
import { List, Button, Icon, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditCourseForm from "../AddEditCourseForm";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  getCourseDataUdemyApi,
  deleteCourseApi,
  updateCourseApi
} from "../../../../api/course";

import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listCourseArray = [];
    courses.forEach(course => {
      listCourseArray.push({
        content: (
          <Course
            course={course}
            deleteCourse={deleteCourse}
            editCourseModal={editCourseModal}
          />
        )
      });
    });
    setListCourses(listCourseArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const { _id } = item.content.props.course;
      const order = item.rank;
      updateCourseApi(accessToken, _id, { order });
    });
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  };

  const editCourseModal = course => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      />
    );
  };

  const deleteCourse = course => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando curso",
      content: `¿Estas seguro de que quieres eliminar el curso ${course.idCourse}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCourseApi(accesToken, course._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadCourses(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde."
            });
          });
      }
    });
  };

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addCourseModal}>
          Nuevo curso
        </Button>
      </div>

      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Course(props) {
  const { course, deleteCourse, editCourseModal } = props;
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse).then(response => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `El curso con el id ${course.idCourse} no se ha encontrado.`
        });
      }
      setCourseData(response.data);
    });
  }, [course]);

  if (!courseData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editCourseModal(course)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deleteCourse(course)}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      <img
        src={courseData.image_480x270}
        alt={courseData.title}
        style={{ width: "100px", marginRight: "20px" }}
      />
      <List.Item.Meta
        title={`${courseData.title} | ID: ${course.idCourse}`}
        description={courseData.headline}
      />
    </List.Item>
  );
}
