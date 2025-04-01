export default function checkEmail (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (email === '' || !(emailRegex.test(email)) || email === null || email === undefined) {
      return false;
    }
    return true ;
  }