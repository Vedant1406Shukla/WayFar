export class Utilities {
    //validate the user
    static validateNewUser = (user) => {
        let validationMessage = '';
        const pwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const pwdValidationResult = pwdRegex.test(user.password);
        //password validation
        if (!pwdValidationResult) {
            validationMessage = 'The password should be minimum 8 characters long with atleast one upper, one lower case character and one number ';
        }
        //phone validation
        if (user.phone.split('-')[1].length !== 10) {
            validationMessage += 'The phone number should be 10 digit long; ';
        }

        //gender validation
        if (!user.gender) {
            validationMessage += 'Please select the gender';
        }

        if (validationMessage) {
            throw new Error(validationMessage);
        } else {
            return true;
        }
    }

    //get user by email id
    static getUser = async ({ email }) => {
        const response = await fetch("../html/users");
        const users = await response.json();
        // check if users exist
        if (users.length > 0) {
            // then find
            const userFound = users.find(eachUser => eachUser.email === email);
            if (userFound) {
                return userFound;// user exists, then return that user
            } else {
                return false;//user not found  
            }
        }
    }


    //add user to DB
    static addUser = async (user) => {
        try {
            //check if user already exists
            const userExists = await this.getUser(user);
            if (!userExists) {
                //post the new user to DB
                await fetch('../html/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                alert(`Registration successful for ${user.getUserEmail()}`);
            } else {
                alert('User with this email already exists, please login!');
            }
        } catch (error) {
            throw error;
        }
    }

        // authenticate the user
    static authenticateUser =(formData, userFromDB)=>{
        if(formData.password===userFromDB.password){
            return userFromDB;
        }else{
            throw Error('The password does not match our database records');
        }
    }
}





