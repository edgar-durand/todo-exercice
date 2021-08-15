import {Component, Input, OnInit} from '@angular/core';
import {ITodo} from "../interface/ITodo";
import {TodoService} from "../services/todo.service";
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input() todo!: ITodo;
  edit: boolean = false;
  completed!: boolean;

  constructor(private todoService: TodoService, private modalService: ModalService) {

  }

  handleDelete(): void {
    this.modalService.showModal('Delete', 'Do you really want to delete?', true)
      .then((res) => {
        if (res)
          this.todoService.delete(<number>this.todo.id).then((res) => {
            this.modalService.showModal(<string>res.message, res.data)
          });

      });
  }

  handleEdit(): void {
    //TODO: Notify to user
    if (!this.edit)
      this.todoService.edit(<number>this.todo.id, {...this.todo}).then((res) => console.log(res))
  }

  ngOnInit(): void {
    this.completed = <boolean>this.todo?.completed;
  }

}
