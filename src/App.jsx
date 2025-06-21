import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="md:container my-10 rounded-xl md:w-1/2 p-5 min-h-[80vh] bg-violet-100 mx-3 md:mx-auto">
        <h1 className="font-bold text-3xl text-center">
          iTask - Manage your daily To-do's
        </h1>
        <div className="addTodo my-5">
          <h2 className="font-bold text-xl">Add a Todo</h2>
          <div className="flex my-2">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="bg-white w-full rounded-full px-4 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="rounded-full p-3 py-1 mx-2 enabled:cursor-pointer text-white disabled:bg-gray-400 bg-violet-500 hover:bg-violet-600 text-sm font-bold "
            >
              Save
            </button>
          </div>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          className="my-4"
          checked={showFinished}
        />{" "}
        Show Finished
        <hr className="opacity-15 w-[full] m-3 p-1"/>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div className="todo flex justify-between my-3" key={item.id}>
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      onChange={handleCheckbox}
                    />
                    <div
                      className={item.isCompleted ? "line-through" : ""}
                      style={{ maxWidth: "30vw", wordWrap: "break-word" }}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      className="rounded-md text-white bg-blue-500 hover:bg-blue-600 p-2 text-sm font-bold py-1  mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="rounded-md text-white bg-red-500 hover:bg-red-600 p-2 text-sm font-bold py-1  mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="txt"></div>
      </div>
    </>
  );
};

export default App;
