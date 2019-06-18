import axios from "axios";

export default {
    getWeather: function(location) {
        const key = process.env.REACT_APP_DARK_SKY_KEY;
        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${location}`)
    },

    getGeocode: function(location) {
        const key = process.env.REACT_APP_GOOGLE_GEOCODER_KEY;
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
    }
};