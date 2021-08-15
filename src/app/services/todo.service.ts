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
     this.initTodo();
     this.todo$.subscribe((todo) => this.saveToLocal(todo))
  }

  saveToLocal(todo: ITodo[]): void {
    localStorage.setItem('myTodo', JSON.stringify(todo))
  }

  getFromLocal(): ITodo[] | [] {
    if (localStorage.getItem('myTodo'))
      return JSON.parse(<string>localStorage.getItem('myTodo'));
    return [];
  }

  async initTodo(): Promise<void> {
      const todoFromStorage = this.getFromLocal();
    if (todoFromStorage.length) {
      this.todo$.next(todoFromStorage);
    } else {
      const fetchedFromServer =  await this.httpService.getAll();
      this.saveToLocal(fetchedFromServer);
      this.todo$.next(fetchedFromServer);
    }
  }

  async delete(id: number): Promise<IResponse> {
    //todo: you should do request to api .then() update local
    try {
      const { result } = await this.httpService.delete(id);
      if (result){
        let todos = this.todo$.value.filter((todo) => todo.id !== id);
        this.todo$.next(todos);
      }
    } catch (e) {
      return {
        result: false,
        message: e.message,
      }
    }
    return {
      result: true,
      message: 'Deleted OK!.',
    }
  }

  async edit(id: number, changes: ITodo): Promise<IResponse> {
    try {
      const { result } = await this.httpService.edit(id, changes);
      if (result){
        const todos = this.todo$.value.slice();
        const index = todos.findIndex((todo) => todo.id === id);
        todos[index] = {
          ...todos[index],
          ...changes,
        };
        this.todo$.next(todos);
      }
    } catch (e) {
      return {
        result: false,
        message: e.message,
      }
    }
    return {
      result: true,
      message: 'Updated OK!',
    }
  }

  async create(todo: ITodo): Promise<IResponse> {
    try {
      const { result } = await this.httpService.create(todo);
      if (result){
        //newTodo comes in response this should be replaced for:
        //const newTodo = { ...result.data } for instance.
        const newTodo = {id: this.todo$.value.length + 1, ...todo, completed: false };
        const todos = this.todo$.value;
        todos.push(newTodo);
        this.todo$.next(todos);
      }
    } catch (e) {
      return { result: false, message: e.message}
    }
    return { result: true, message: 'Created OK!.'}
  }
}
