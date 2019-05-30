import axios from "axios";

export default {
    getWeather: function(location) {
        const key = process.env.REACT_APP_DARK_SKY_KEY
        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/39.7392,-104.9903`)
    }
};