import axios from "axios";

const endpoints = {
    registration: (data) => axios.post("http://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/email/register", data),
    login: (data) => axios.post("http://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/email/login", data),
    getProfile: () => axios.get('http://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/me'),
}

export default endpoints;