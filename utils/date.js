async function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1 and format with leading zero
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    // Format the date as 'YYYY-MM-DD'
    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
  }
  
  export default getCurrentDate;

  