// Get the current date function
async function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();             // get the current day
    const month = currentDate.getMonth() + 1;      // get the current month
    const year = currentDate.getFullYear();        // get the current year
    const hours = currentDate.getHours();          // get the current hours
    const minutes = currentDate.getMinutes();      // get the current minutes
    const seconds = currentDate.getSeconds();      // get the current seconds
  
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return formattedDateTime;
  }
  
  export default getCurrentDate;