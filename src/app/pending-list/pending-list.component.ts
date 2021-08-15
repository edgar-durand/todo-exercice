import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ITodo} from "../interface/ITodo";
import {TodoService} from "../services/todo.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent implements OnDestroy {

  pending$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  destroyed$: Subject<boolean> = new Subject<boolean>();
  constructor(private todoService: TodoService) {
    this.todoService.todo$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async (todos) => {
        const pending = todos.filter((todo) => !todo.completed);
        this.pending$.next(pending);
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(false);
    this.destroyed$.unsubscribe();
  }

}
