import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {TodoService} from "../services/todo.service";
import {ITodo} from "../interface/ITodo";
import {map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnDestroy {
  completed$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  destroyed$: Subject<boolean> = new Subject<boolean>();
  constructor(private todoService: TodoService) {
    this.todoService.todo$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((todos) => {
        const completed = todos.filter((todo) => todo.completed);
        this.completed$.next(completed);
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(false);
    this.destroyed$.unsubscribe();
  }

}
