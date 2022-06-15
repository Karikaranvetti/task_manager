
import React,{ useEffect, useState } from 'react';
import { getToken, getUser } from '../Login/Utils/Common';

const api_base = 'http://localhost:3001';
function Dashboard() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(api_base + '/tasks', { 
			  
			headers: new Headers({
			  'Authorization': 'Bearer '+ getToken(),
			  'Content-Type': 'application/json'
			}),
			
		  })
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));

			
	}

	const completeTodo = async id => {
		const data = await fetch(api_base + '/tasks/complete/' + id, { 
			  
			headers: new Headers({
			  'Authorization': 'Bearer '+ getToken(),
			  'Content-Type': 'application/json'
			}),
			
		  }).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.completed = data.completed;
			}

			return todo;
		}));
		
	}

	const addTodo = async () => {
		const data = await fetch(api_base + "/tasks", {
			method: "POST",
			headers: {
				'Authorization': 'Bearer '+ getToken(),
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				description: newTodo
			})
		}).then(res => res.json());

		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async id => {
		const data = await fetch(api_base + '/tasks/' + id, { method: "DELETE",
		headers: {
			'Authorization': 'Bearer '+ getToken(),
			"Content-Type": "application/json" 
		}, }).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}

	return (
		<div className="App">
			<h1>Welcome, {getUser().name}</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{console.log(todos)}
				{todos.length > 0 ? todos.map(todo => (
					 
					<div className={
						"todo" + (todo.completed ? " is-complete" : "")
					} >
						<div className="checkbox" key={todo._id} onClick={() => completeTodo(todo._id)}></div>

						<div className="text">{todo.description}</div>

						<div className="delete-todo " onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
					


					 
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default Dashboard;

