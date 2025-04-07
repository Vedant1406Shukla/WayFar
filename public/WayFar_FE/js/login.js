import {Utilities} from "./utilities.js";
//login
const login=(e)=>{
    // fetch form data
    const loginFormData={
        email : e.target.user.value,
        password : e.target.pass.value
    }
    //check if user exists in backend
    Utilities.getUser(loginFormData)
    .then(user=> {
        if(user){
            return user;
        }else{
            throw new Error('Please register before you login');
        }
    })
    .then(user=> Utilities.authenticateUser(loginFormData,user))// authenticate the user
    .then(user=>{
        //set the local storage
        localStorage.setItem('userName',user.id);
        //navigate the user to the home page
        window.location='../html/index.html';
    })
    .catch(err=>{
        alert(err.message);
    });
}


//called after the login.html completes the load event
window.onload=()=>{
    //get the login form
    const loginForm = document.getElementById('loginform');
    // bind the onSubmit event to login function
    loginForm.onsubmit=(e)=>{
        e.preventDefault();
        login(e);
    };
}

