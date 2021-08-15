import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {PendingListComponent} from "./pending-list/pending-list.component";

const routes: Routes = [
  {
    path: 'completed',
    component: TodoListComponent,
  },
  {
    path: 'pending',
    component: PendingListComponent,
  },
  {
    path: '**',
    redirectTo: 'pending',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
