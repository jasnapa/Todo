import React, { useEffect, useRef } from "react";
import './todo.css'
import { useState } from "react";
import { IoMdDoneAll} from "react-icons/io";
 import { FiEdit} from "react-icons/fi"
 import { MdDelete } from "react-icons/md";



function Todo() {
    const [todo, settodo] = useState('')
    const [todos, settodos] = useState([])
    const [editId , setEditID] = useState(0)

    const handlesubmit = (e) => {
        e.preventDefault();

    }

    const addtodo = () => {
        if(todo !== ''){
            settodos([...todos,{list :todo, id : Date.now(), status : false}]);
        console.log(todos);
        localStorage.setItem(
            "todo",
            JSON.stringify([...todos, {list :todo, id : Date.now(), status : false}])
        )
        settodo('')
        }
        if(editId){
            const edittodo = todos.find((todo)=>todo.id == editId)
            const updateTodo = todos.map((to)=>to.id === edittodo.id? (to = {id : to.id, list : todo}): (to = {id : to.id, list : to.list}))
            settodos(updateTodo)
            setEditID(0)
            settodo("")
        }
    }

    const  inputRef = useRef('null')
     
    useEffect(()=>{
        inputRef.current.focus()
        if(localStorage.getItem("todo")){
            settodos(JSON.parse(localStorage.getItem("todo")))
        }
    },[]);

    const onDelete = (id) =>{
        settodos(todos.filter((to) => to.id !== id))
    }

    const onComplete = (id) =>{
        let complete = todos.map((list)=>{
            if(list.id === id){
                return ({...list, status : !list.status})
            }
            return list
        })
        settodos(complete)

    
    }

    const onEdit = (id) =>{
        const edittodo=todos.find((to)=> to.id === id)
        settodo(edittodo.list)
        setEditID(edittodo.id)
    }

    return (
        <div className="container">
            <h2>TODO APP</h2>
            <form className="form-group" onClick={handlesubmit}>
                <input type="text" value={todo} ref={inputRef} placeholder="enter your todo" className="form-control" onChange={(event) => settodo(event.target.value)} />
                <button onClick={addtodo}> {editId ? 'EDIT' : 'ADD'}</button>
            </form>
            <div className="list">
                <ul>
                    {todos.map((to) => {
                        return <li className="list-items">
                            <div className="list-item-list" id={to.status ? 'list-item' : ''}>{to.list} </div>
                            <span>
                            <IoMdDoneAll className="list-item-icons" id="complete" title="Complete" 
                            onClick={()=> onComplete(to.id)} />
                            <FiEdit lassName="list-item-icons" id="edit" title="Edit" 
                            onClick={()=>onEdit(to.id)}/>
                            <MdDelete lassName="list-item-icons" id="delete" title="Delete" 
                            onClick={()=>onDelete(to.id)}/>
                            </span>
                            </li>
                    })}
                   
                </ul>
            </div>
            <h2>Completed Tasks</h2>
            <br />
            {
            todos.map((obj) =>{
                if(obj.status){
               return(
                 <div>
                    <ul className="cmp">
                        <li>{obj.list}</li>
                    </ul>
                    </div>
                    );
               }
               return null;
            }
            )
        }
              
        </div>
    )
}

export default Todo