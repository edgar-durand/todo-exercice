import {Injectable} from '@angular/core';
import {ITodo} from "../interface/ITodo";
import {IResponse} from "../interface/IResponse";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.production;

  //Data should come from API
  mockedTodo: ITodo[] = [
    {id:1, name: 'myFirst todo', completed: false, description: 'What ever I need to describe.'},
    {id:2, name: 'mySecond todo', completed: true, description: 'What ever I need to describe.'},
    {id:3, name: 'myThird todo', completed: false, description: 'What ever I need to describe.'},
    {id:4, name: 'myFourth todo', completed: true, description: 'What ever I need to describe.'},
  ];

  async getAll(): Promise<ITodo[]> {
    //It is supposed to be fetched from API ex. await fetch(apiUrl);
    return this.mockedTodo
  }

  async delete(id: number): Promise<IResponse> {
    // const uri = `${this.apiUrl}delete/${id}`;
    // const config: RequestInit = {
    //   method: 'delete',
    // };
    // const result = await fetch(uri, config);
    return {
      result: true,
      message: 'Deleted OK!.',
    }
  }

  async edit(id: number, changes: ITodo): Promise<IResponse> {
    // const uri = `${this.apiUrl}update/${id}`;
    // const config: RequestInit = {
    //   method: 'put',
    //   headers: {
    //     'Content-Type': 'application.json',
    //   //  you should need use a token for access
    //   //  ex 'Authorization': 'Bearer ds srg.fdthsdthsdjfd.',
    //   },
    //   body: JSON.stringify(changes),
    // };
    // const result = await fetch(uri, config);
    return {
      result: true,
      message: 'Updated OK!.',
    }
  }

  async create(todo: ITodo): Promise<IResponse> {
    // const uri = `${this.apiUrl}`;
    // const config: RequestInit = {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application.json',
    //   //  you should need use a token for access
    //   //  ex 'Authorization': 'Bearer ds srg.fdthsdthsdjfd.',
    //   },
    //   body: JSON.stringify(todo),
    // };
    // const result = await fetch(uri, config);
    return {
      result: true,
      message: 'Updated OK!.',
    }
  }
}
