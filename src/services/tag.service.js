import http from "../http-common";

const get = () => {
  return http.get(`/tags`);
};

const search = (data) => {
  return http.post(`/tags/search`, data);
};

const getById = (id) => {
  return http.get(`/tags/${id}`);
};

const create = (data) => {
  return http.post(`/tags`, data);
};

const update = (id, data) => {
  return http.put(`/tags/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/tags/${id}`);
};

const TagService = {
  get,
  search,
  getById,
  create,
  update,
  remove,
};

export default TagService;
