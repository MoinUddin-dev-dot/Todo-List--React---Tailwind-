import NavBar from "./components/NavBar";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, settodo] = useState("")
  const [todos, setTodos] = useState([]); 

  const handleEdit = () => {

  }

  const handleDelete = () => {
    
  }
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo , isCompleted: false}])
    settodo("")
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=> {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }
  

  return (
    <>
      <NavBar/>
      <div className="container mx-auto">
        <div className="head bg-violet-100 p-5 rounded-xl my-5 min-h-[80vh]">
          <div className="addtodo my-5">
            <h2 className="font-bold text-xl">Add Todo</h2>
            <input  onChange={handleChange} value={todo} className="w-1/2" type="text" />
            <button onClick={handleAdd} className="bg-violet-700 hover:bg-violet-900 p-3 py-1 rounded-lg text-white mx-6 font-bold " type="button">Add</button>
          </div>
          <h2 className="font-bold text-xl">Todo List Appp</h2> 
          <div className="todos">
            {todos.map(item => {
            
            return <div key={item.id} className="todo flex w-1/2 justify-between my-3">
              <input name={item.id} type="checkbox" onChange={handleCheck} value={item.isCompleted}  />
                  <div className= {item.isCompleted? "line-through" : ""} >
                     {item.todo}
                  </div>
                  <div className="buttons">
                    <button onClick={handleEdit} className="bg-violet-700 hover:bg-violet-900 p-2 py-1 rounded-lg text-white mx-1 font-bold ">Edit</button>
                    <button onClick={handleDelete} className="bg-violet-700 hover:bg-violet-900 p-2 py-1 rounded-lg text-white mx-1 font-bold ">Delete</button>
                  </div>
            </div>
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
