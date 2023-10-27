// auth.js
export const handleLogin = (user, password) => {
    if (user === 'chaonai' && password === '1234') {
      console.log('Login successful');
      // Add your logic for successful login here
      return true;
    } else {
      console.log('Login failed. Please check your credentials.');
      // Add your logic for a failed login attempt here
      return false;
    }
  };
  