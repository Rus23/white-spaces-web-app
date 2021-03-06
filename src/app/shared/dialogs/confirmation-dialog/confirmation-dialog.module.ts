import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MaterialModules = [MatDialogModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, ...MaterialModules, FlexLayoutModule],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
