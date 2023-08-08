export function getUserData() {
    // get the string data back into an object with JSON.parse
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
}

export function setUserData(data) {
    // set it into session storage
    // set the data with JSON.stringify(data) 
}

export function clearUserData() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
}