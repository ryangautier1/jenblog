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
    getVideoById: function(id) {
        return axios.get("/api/youtube/" + id);
    },
    addVideo: function(data) {
        return axios.post("/api/youtube", data);
    },
    getYtCommentsByVideo: function(video) {
        return axios.get("/api/ytcomment/" + video);
    },
    getYtComments: function() {
        return axios.get("/api/ytcomment");
    },
    postNewYtComment: function(data) {
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
    },
    getUserData: function () {
        return axios.get("/api/user-login/user_data");
    },
    logoutUser: function() {
        return axios.get("/api/user-login/logout");
    },
    addTextPost: function(data) {
        return axios.post("/api/textpost", data);
    },
    getTextPosts: function() {
        return axios.get("/api/textpost");
    },
    getTextPostById: function(id) {
        return axios.get("/api/textpost/" + id);
    },
    deleteTextPost: function(id) {
        return axios.delete("/api/textpost/" + id);
    },
    getTpComments: function() {
        return axios.get("/api/textpostcomment");
    },
    getTpCommentsByTp: function(textpost) {
        return axios.get("/api/textpostcomment/" + textpost)
    },
    postNewTpComment: function(data) {
        return axios.post("/api/textpostcomment", data);
    },
    updateTpComments: function(textpost, data) {
        return axios.put("/api/textpostcomment/" + textpost, data);
    },
    deleteTpComments: function(id) {
        return axios.delete("/api/textpostcomment/delete/" + id);
    }
};