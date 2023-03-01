import http from "../http-common";

const get = () => {
  return http.get(`/postTags`);
};

const search = (data) => {
  return http.post(`/postTags/search`, data);
};

const getById = (id) => {
  return http.get(`/postTags/${id}`);
};

const create = (data) => {
  return http.post(`/postTags`, data);
};

const update = (id, data) => {
  return http.put(`/postTags/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/postTags/${id}`);
};

const PostTagService = {
  get,
  search,
  getById,
  create,
  update,
  remove,
};

export default PostTagService;
