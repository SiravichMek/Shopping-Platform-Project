// auth.js
export const createUser = (user, password,confirmpassword,address,telephone) => {
    if (password !== confirmpassword) {
      console.log('password not the same');
      // Add your logic for successful login here
      return false;
    } else if(password !== '' && confirmpassword !== ''){
      console.log('Create complete');
      // Add your logic for a failed login attempt here
      return true;
    }
  };
  