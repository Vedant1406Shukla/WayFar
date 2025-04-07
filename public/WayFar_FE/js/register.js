import {User} from '../js/User.js';
import {Utilities} from './utilities.js';
//get Gender
function getGender(e) {
    if (e.target.fgender.checked || e.target.mgender.checked) {
        return e.target.fgender.checked ? 'F' : 'M';
    } else {
        return null;
    }
}

//register
const register = (e) => {
    try {
        // fetch form data
        const registerFormData = {
            email: e.target.email.value,
            password: e.target.password.value,
            id: e.target.name.value,
            gender: getGender(e),
            phone: e.target.code.value + '-' + e.target.phone.value
        }
        console.log(registerFormData);
        //validate the new user data
        Utilities.validateNewUser(registerFormData)
        // create the user from validated data
        const newUser = new User(registerFormData.id,
                                 registerFormData.email,
                                 registerFormData.password,
                                 registerFormData.gender,
                                 registerFormData.phone
                                );
        // add the validated user to the DB
        Utilities.addUser(newUser);
    } catch (error) {
        alert(error.message);
    }
}

//called after the login.html completes the load event
window.onload = () => {
    //get the login form
    const loginForm = document.getElementById('registerform');
    // bind the onSubmit event to login function
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        register(e);
    };
}



