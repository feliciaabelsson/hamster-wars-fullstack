import http from "../http-common";


const getAll = () => {
    return http.get("/hamsters");
};

const get = id => {
    return http.get(`/hamsters/${id}`);
};

const create = data => {
    return http.post("/hamsters", data);
};

const update = (id, data) => {
    return http.put(`/hamsters/${id}`, data);
};

const remove = id => {
    return http.delete(`/hamsters/${id}`);
};

// const removeAll = () => {
//     return http.delete(`/hamsters`);
// };

// const findByTitle = title => {
//     return http.get(`/hamsters?title=${title}`);
// };

const HamsterService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default HamsterService;