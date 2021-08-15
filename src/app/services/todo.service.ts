import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ITodo} from "../interface/ITodo";
import {IResponse} from "../interface/IResponse";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  constructor(private httpService: HttpService) {
    this.todo$.next(this.httpService.mockedTodo);
    this.todo$.subscribe((todo) => console.log(todo));
  }

  async delete(id: number): Promise<IResponse> {
    //todo: you should do request to api .then() update local
    let todos = this.todo$.value.filter((todo) => todo.id !== id);
    this.todo$.next(todos);
    return {
      result: true,
      message: 'Deleted OK!.',
    }
  }

  async edit(id: number, changes: ITodo): Promise<IResponse> {
    //todo: you should do request to api .then() update local
    const todos = this.todo$.value.slice();
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index] = {
      ...todos[index],
      ...changes,
    };
    this.todo$.next(todos);
    return {
      result: true,
      message: 'Updated OK!',
    }
  }

  async create(todo: ITodo): Promise<IResponse> {
    //todo: you should do request to api .then() update local
    const newTodo = {id: this.todo$.value.length + 1, ...todo, completed: false };
    const todos = this.todo$.value;
    todos.push(newTodo);
    this.todo$.next(todos);
    return { result: true, message: 'Created OK!.', data: newTodo }
  }
}
