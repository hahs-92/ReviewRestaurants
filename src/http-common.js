import axios from 'axios'

export default axios.create({
    baseURL: 'https://review-restaurant-backend.herokuapp.com/api/v1/restaurants',
    headers: {
        'Content-type': 'application/json'
    }
})