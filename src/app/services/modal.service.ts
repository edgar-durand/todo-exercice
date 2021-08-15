import {Injectable, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {IResponse} from "../interface/IResponse";
import {ComponentType} from "@angular/cdk/overlay";
import {IDialogData} from "../interface/IDialog";
import {ModalComponent} from "../modal/modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog,
  ) { }

  async openAddTodoDialog(): Promise<IDialogData> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '290px',
      data: {}
    });

    return dialogRef.afterClosed().toPromise();
  }

  async showModal(title: string, body = '', showCancel = false): Promise<IDialogData> {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: { title, description: body, showCancel }
    });

    return dialogRef.afterClosed().toPromise();
  }
}
