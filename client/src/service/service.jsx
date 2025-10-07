import axios from "axios";
const EVENT_REST_API = "http://localhost:5000/event";
const USER_WORDS = "http://localhost:5000/userWords";
const AUTH_API = "http://localhost:5000/auth";
const BOOKING_API = "http://localhost:5000/booking";

export const allEvents = () => {
    return axios.get(EVENT_REST_API);
}
export const getEventById = (id) => {
    return axios.get(`${EVENT_REST_API}/${id}`);
}

export const createEvent = (data) => {
    return axios.post(`${EVENT_REST_API}/addEvent`, data);
}
// all images for banner
export const getAllImageFromDB = () => {
    return axios.get("http://localhost:5000/images");
}

// what our user say
export const getUsersWord = () => {
    return axios.get(USER_WORDS);
}

// auth
export const register = (data) => {
    return axios.post(`${AUTH_API}/register`, data);
}
export const login = (data) => {
    return axios.post(`${AUTH_API}/login`, data, {
        withCredentials: true,
    });
}

// booking
export const bookSlot = (data) => {
    return axios.post(`${BOOKING_API}/book`, data);
}

// get by booking_id
export const getTicketsById = (bookingId) => {
    return axios.get(`${BOOKING_API}/bookingid/${bookingId}`);
}

// get by userId
export const getBookingDetails = (user_id) =>{
    return axios.get(`${BOOKING_API}/book/${user_id}`);
}