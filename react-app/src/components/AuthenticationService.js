import {BehaviorSubject} from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const AuthenticationService = {
    login,
    register,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://localhost:8080/api/signin`, requestOptions)
        .then(user => {
            let token = null;
            if (user.ok === true) {
                user.json().then(json => {
                    console.log(json)
                    localStorage.setItem('currentUser', JSON.stringify(json.user));
                    currentUserSubject.next(json.user);
                    localStorage.setItem('token', JSON.stringify(json.token));
                    return json.user;
                })
            } else {
                console.log(user)
                localStorage.setItem('currentUser', JSON.stringify(token));
                currentUserSubject.next(token);
                return token;
            }
        });
}

function register(username, password, email, name) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, name })
    };

    return fetch(`http://localhost:8080/api/signup`, requestOptions)
        .then(user => {
            return user;
        });
}
function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}