import callApi from '../utils/callApi';
import { Todo } from 'types/todos';

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

  async deleteTask({ _id }: Todo): Promise<any> {
    const result = callApi(`${_apiBase}/todos/${_id}`, { method: 'DELETE' });
    return result;
  }

  async deleteAllComplited(): Promise<any> {
    const result = callApi(`${_apiBase}/todos`, { method: 'DELETE' });
    return result;
  }

  async updateTask(body: Todo): Promise<any> {
    const result = callApi(`${_apiBase}/todos/${body._id}`, {
      method: 'PUT',
      body,
    });
    return result;
  }
}
