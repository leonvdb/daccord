import axios from 'axios'

const setAuthToken = (token: string) => {
    if (token) {
        // Set the new token
        localStorage.setItem('jwtToken', token);
        //Apply to every request
        axios.defaults.headers.common.Authorization = token
    } else {
        delete axios.defaults.headers.common.Authorization
    }
}

export default setAuthToken;