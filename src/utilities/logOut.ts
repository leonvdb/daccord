const logOut = () => {
    if (localStorage.jwtToken) {
        localStorage.removeItem('jwtToken');
    }
}


export default logOut;