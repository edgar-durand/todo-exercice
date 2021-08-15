import {Component, OnDestroy} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subject} from 'rxjs';
import {map, shareReplay, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {TodoService} from "../services/todo.service";
import {ModalService} from "../services/modal.service";
import {ITodo} from "../interface/ITodo";

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss']
})
export class MyNavComponent implements OnDestroy {
  private destroyed$: Subject<boolean> = new Subject<boolean>();
  public routes = [
    {route: 'pending', fragment: 'My Pending todo', description: 'Pending todo'},
    {route: 'completed', fragment: 'Completed todo', description: 'Completed todo'},
  ];
  breadCrumb!: Observable<string | null>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public todoService: TodoService,
    private router: ActivatedRoute,
    private modalService: ModalService,
  ) {
    this.router.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
      this.breadCrumb = this.router.fragment;
    })
  }

  openDialog(): void {
    this.modalService.openAddTodoDialog().then((res) => {
      //TODO: notify to user with some Modal or alert whatever
      if (res?.name)
        this.todoService.create({ ...<ITodo>res }).then((res)=> console.log(res));
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(false);
    this.destroyed$.unsubscribe();
  }

}

