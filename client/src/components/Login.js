import React,{ useEffect  ,useState } from 'react';

import './bootstrap.min.css'

function Login(){
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [Todos,setTodos]=useState([]);


    useEffect(() => {
		get();
	}, []);

    function logging(){
        setemail(email);
        setpassword(password);
        get();
    }



    const get= ()=>{
      

           fetch("http://localhost:3001/users/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type": 'application/json',
                "Accept":'application/json',
                "Access-Control-Allow-Origin": '*'
            }
        }).then(res => res.json())
        .then(data => {
            setTodos(data);
            console.log(data);
        })
        .catch((err) => console.error("Error: ", err));

        console.log(Todos.token+"hari");
    }



    return(
        <div className='col-sm-6 offset-sm-3'>
            <h1>Login Page</h1>
            <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className="form-control" placeholder="Enter Name" ></input>
            <br></br>
            <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" placeholder="Enter password" ></input>
            <br></br>
            <button onClick={logging} className='btn btn -prrimary'>login</button>


        </div>
    )
}

export default Login;