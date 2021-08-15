import {Injectable} from '@angular/core';
import {ITodo} from "../interface/ITodo";
import {IResponse} from "../interface/IResponse";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //Data should come from API
  mockedTodo: ITodo[] = [
    {id:1, name: 'myFirst todo', completed: false, description: 'What ever I need to describe.'},
    {id:2, name: 'mySecond todo', completed: true, description: 'What ever I need to describe.'},
    {id:3, name: 'myThird todo', completed: false, description: 'What ever I need to describe.'},
    {id:4, name: 'myFourth todo', completed: true, description: 'What ever I need to describe.'},
  ];
}
