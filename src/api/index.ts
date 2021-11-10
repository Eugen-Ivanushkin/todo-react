import callApi from '../utils/callApi';
import { Response, Todo } from 'types/todos';
import { User } from 'types/user';

const _apiBase = process.env.API_URL;

export default class ApiService {
  //todos
  async getAll() {
    const result = await callApi<Todo[]>(`${_apiBase}/todos`, {
      method: 'GET',
    });
    return result;
  }

  async addTask(body: object) {
    const result = callApi<Todo>(`${_apiBase}/todos`, { method: 'POST', body });
    return result;
  }

  async deleteTask(id: string | undefined) {
    callApi<number>(`${_apiBase}/todos/${id}`, { method: 'DELETE' });
  }

  async deleteAllComplited() {
    const result = callApi<number>(`${_apiBase}/todos`, { method: 'DELETE' });
    return result;
  }

  async updateTask(body: Todo) {
    const result = callApi<Todo>(`${_apiBase}/todos/${body._id}`, {
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

  //update token
  async updateTokens(isUpdate: boolean) {
    const result = callApi<Response>(`${_apiBase}/users/update`, {
      method: 'POST',
      body: {},
      isUpdate,
    });
    return result;
  }
}
