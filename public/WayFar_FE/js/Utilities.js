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

    // get user by email id
    static getUser = async ({ email }) => {
        const response = await fetch(`${process.env.HOST}/user?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const users = await response.json();
        return users;
    };



    //add user to DB
    static addUser = async (user) => {
        try {
            //check if user already exists
            const userExists = await this.getUser(user);
            console.log(userExists.status);
            if (userExists.status === 404) {
                //post the new user to DB
                await fetch(`${process.env.HOST}/user`, {
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
    static authenticateUser = (formData, userFromDB) => {
        if (formData.password === userFromDB.password) {
            return userFromDB;
        } else {
            throw Error('The password does not match our database records');
        }
    }
}





