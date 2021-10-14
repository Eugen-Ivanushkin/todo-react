import callApi from "../utils/callApi";

const _apiBase = process.env.API_URL;

export default class ApiService {
  async getAll() {
    const result = await callApi(`${_apiBase}/todos`, { method: "GET" });
    return result;
  }

  async addTask(body) {
    const result = callApi(`${_apiBase}/todos`, { method: "POST", body });
    return result;
  }

  async deleteTask(id) {
    const result = callApi(`${_apiBase}/todos/${id}`, { method: "DELETE" });
    return result;
  }

  async deleteAllComplited() {
    const result = callApi(`${_apiBase}/todos`, { method: "DELETE" });
    return result;
  }

  async updateTask(body, id) {
    const result = callApi(`${_apiBase}/todos/${id}`, { method: "PUT", body });
    return result;
  }
}
