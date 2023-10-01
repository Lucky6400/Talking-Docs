export type FormData = {
    username: string;
    email?: string;
    password: string;
    tc?: string;
}

export const validation = (payload: FormData) => {

    const { username, password, email } = payload;
    console.log(payload)
    if (!username || !password || !email) {
        return false
    } else if (username.length < 5 || password.length < 8 || !email.includes("@")) {
        return false;
    }
    return true;
}