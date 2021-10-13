import callApi from "../utils/callApi";

export default class ApiService {
  _apiBase = process.env.API_URL;

  async getAll() {
    const result = await callApi(`${_apiBase}/todos`, { method: "GET" });
    return result;
  }

  async addTask(data) {
    const result = callApi(`${_apiBase}/todos`, { method: "POST", data });
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

  async updateTask(data, id) {
    const result = callApi(`${_apiBase}/todos/${id}`, { method: "PUT", data });
    return result;
  }
}
