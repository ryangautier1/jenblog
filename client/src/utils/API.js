import axios from "axios";

export default {
    signupUser: function(data) {
        return axios.post("/api/user-login/signup", data);
    },
    loginUser: function(data) {
        return axios.post("/api/user-login/login", data);
    },
    getYtVideos: function() {
        return axios.get("/api/youtube");
    },
    addVideo: function(data) {
        return axios.post("/api/youtube", data);
    }
};