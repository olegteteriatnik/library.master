export function isTokenValid(token) {
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const currentTime = Math.floor(Date.now() / 1000);

        return decodedPayload.exp && decodedPayload.exp > currentTime;
    } catch (err) {
        return false;
    }
}

export function getToken() {
    return localStorage.getItem('token');
}

export function clearTokenAndRedirect() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

export function logoutUser() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}
