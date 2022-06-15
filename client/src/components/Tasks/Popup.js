import React, { useState } from "react";
import { getToken } from "../Login/Utils/Common";

const api_base = 'http://localhost:3001';
function Popup(props) {
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    const data = await fetch(api_base + "/tasks", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newTodo,
      }),
    }).then((res) => res.json());

    // setTodos([...todos, data]);

    setPopupActive(false);
    // setNewTodo("");
  };

  return (
    <diV>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </diV>
  );
}

export default Popup;
