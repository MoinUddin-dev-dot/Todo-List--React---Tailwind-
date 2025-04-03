import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  // ✅ Load from localStorage when app starts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    console.log(localStorage.getItem("todos"));
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    console.log("Todos saved to localStorage");
  }, [todos]); // Runs when todos changes

  const handleEdit = (e, id) => {
    let t = todos.find((item) => item.id === id);
    if (!t) return;

    settodo(t.todo);

    // ✅ Correct way to update todos
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const handleDelete = (e, id) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    if (!todo.trim()) return; // ✅ Prevent empty todos

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), todo, isCompleted: false },
    ]);
    settodo("");
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheck = (e) => {
    let id = e.target.name;

    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const toggleFinish = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <NavBar />
      <div className=" mx-2 md:container md:mx-auto lg:w-1/2">
     
        <div className="head bg-violet-100 p-5 rounded-xl my-5 min-h-[80vh]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
          <div className="addtodo my-5">
            <h2 className="font-bold text-xl my-3">Add Todo</h2>
            <input
              onChange={handleChange}
              value={todo}
              className="w-[70%] rounded-xl p-2 text-xl px-4"
              type="text"
            />
            <button
              disabled={todo.length < 2}
              onClick={handleAdd}
              className="bg-violet-700 disabled:bg-violet-300 hover:bg-violet-900 p-3 py-1 text-xl  rounded-lg text-white mx-2  md:mx-6 font-bold"
              type="button"
            >
              Save
            </button>
          </div>
          <div className="flex items-center gap-2 my-3">
            <input
              id="finish"
              type="checkbox"
              checked={showFinished}
              onChange={toggleFinish}
            />
            <label htmlFor="finish">Show Finished</label>
          </div>

          <h2 className="font-bold text-xl">Your Todo</h2>
          <div className="todos w-full">
            {todos.length === 0 && (
              <div className="m-5"> No todos to display</div>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && 
                <div
                  key={item.id}
                  className="todo flex md:w-4/5 justify-between my-3"
                >
                  <div className="flex items-center gap-5 md:gap-10">
                    <input
                      name={item.id}
                      type="checkbox"
                      checked={item.isCompleted} // ✅ Controlled checkbox
                      onChange={handleCheck}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons ml-10 flex h-full ">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-700 hover:bg-violet-900 p-2 py-1 rounded-lg text-white mx-1 font-bold"
                    >
                      <FaEdit />
                       
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-700 hover:bg-violet-900 p-2 py-1 rounded-lg text-white mx-1 font-bold"
                    >
                      <MdDelete />

                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
