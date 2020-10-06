import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss'],
})
export class BlogDialogComponent implements OnInit {
  public data: any;
  constructor(
    private dialogRef: MatDialogRef<BlogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    console.log(this.data);
  }

  ngOnInit(): void {}

  public save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
