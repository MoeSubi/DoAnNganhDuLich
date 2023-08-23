import axios from "../../node_modules/axios/index"

export let endpoints = {
    "hangmucs": "/hangmucs/",
    "diadiems": "/diadiems/",
    "diadiemdulichs": (diadiemId) => `/diadiems/${diadiemId}/diemdulichs/`,
    "diemdulich-chitiet": (diemdulichId) => `/diemdulichs/${diemdulichId}/`,
    "oauth2-info": "/oauth2-info",
    "dangnhap": "/d/token/",
    "nguoidung-hientai": "/nguoidungs/lay-nguoidung/",
    "dangky": "/nguoidungs/",
    "binhluan": (commentId) => `/diemdulichs/${commentId}/thembinhluans/`
}

export default axios.create({
    baseURL: "http://localhost:8000/"
})