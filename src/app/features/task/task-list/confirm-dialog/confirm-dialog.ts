import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {

}
