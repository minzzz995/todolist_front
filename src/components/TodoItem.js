import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";  // api 호출을 위해 import

const TodoItem = ({ item, getTasks }) => {

  // Task 삭제
  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${item._id}`);
      getTasks();  // Task 삭제 후 목록을 새로고침
    } catch (error) {
      console.error("Task 삭제 실패:", error);
    }
  };

  // Task 완료/미완료 토글 처리
  const toggleCompleteTask = async () => {
    try {
      await api.put(`/tasks/${item._id}`, {
        task: item.task,
        isComplete: !item.isComplete,  // 완료 상태를 반전시킴
      });
      getTasks();  // 상태 변경 후 목록을 새로고침
    } catch (error) {
      console.error("Task 상태 변경 실패:", error);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? 'item-complete' : ''}`}>
          <div className="todo-content">{item.task}</div>
          <div>by {item.author.name}</div>
          <div>
            <button className="button-delete" onClick={deleteTask}>삭제</button>
            <button className="button-delete" onClick={toggleCompleteTask}>
              {item.isComplete ? "취소" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
