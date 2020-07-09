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
    },
    getYtCommentsByVideo: function(video) {
        return axios.get("/api/ytcomments/" + video);
    },
    getYtComments: function() {
        return axios.get("/api/ytcomment");
    },
    postNewComment: function(data) {
        return axios.post("/api/ytcomment", data);
    }
};