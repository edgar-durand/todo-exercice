import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDialogData} from "../interface/IDialog";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) {
  }

  onNoClick(): void {
    this.data.result = false;
    this.dialogRef.close();
  }

  onClick(): void {
    this.data.result = true;
  }

}
