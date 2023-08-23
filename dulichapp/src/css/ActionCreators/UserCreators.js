import userEvent from "../../../node_modules/@testing-library/user-event/dist/index";

export function loginUser(payload) {
    return {
        "type": "USER_LOGIN",
        "payload": payload
    }

}

export function logoutUser(payload) {
    return {
        "type": "USER_LOGOUT",
        'payload': payload
    }
}