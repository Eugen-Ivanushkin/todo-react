import callApi from '../utils/callApi';
import { Todo } from 'types/todos';
import { User } from 'types/user';

const _apiBase = process.env.API_URL;

export default class ApiService {
  //todos
  async getAll(): Promise<any> {
    const result = await callApi(`${_apiBase}/todos`, { method: 'GET' });
    return result;
  }

  async addTask(body: object): Promise<any> {
    const result = callApi(`${_apiBase}/todos`, { method: 'POST', body });
    return result;
  }

  async deleteTask(id: string | undefined): Promise<any> {
    callApi(`${_apiBase}/todos/${id}`, { method: 'DELETE' });
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

  //user
  async signIn(body: User): Promise<any> {
    const result = callApi(`${_apiBase}/users/login`, { method: 'POST', body });
    return result;
  }

  async signUp(body: User): Promise<any> {
    const result = callApi(`${_apiBase}/users/register`, {
      method: 'POST',
      body,
    });
    return result;
  }
}
