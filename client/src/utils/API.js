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
    },
    updateYtComments: function(video, data) {
        return axios.put("/api/ytcomment/" + video, data);
    },
    deleteVideo: function(id) {
        return axios.delete("/api/youtube/" + id);
    },
    deleteComments: function(id) {
        return axios.delete("/api/ytcomment/delete/" + id);
    }
};