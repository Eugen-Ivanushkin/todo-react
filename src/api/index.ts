import callApi from '../utils/callApi';

const _apiBase = process.env.API_URL;

export default class ApiService {
  async getAll(): Promise<any> {
    const result = await callApi(`${_apiBase}/todos`, { method: 'GET' });
    return result;
  }

  async addTask(body: object): Promise<any> {
    const result = callApi(`${_apiBase}/todos`, { method: 'POST', body });
    return result;
  }

  async deleteTask(id: string): Promise<any> {
    const result = callApi(`${_apiBase}/todos/${id}`, { method: 'DELETE' });
    return result;
  }

  async deleteAllComplited(): Promise<any> {
    const result = callApi(`${_apiBase}/todos`, { method: 'DELETE' });
    return result;
  }

  async updateTask(body: object, id: string): Promise<any> {
    const result = callApi(`${_apiBase}/todos/${id}`, { method: 'PUT', body });
    return result;
  }
}
