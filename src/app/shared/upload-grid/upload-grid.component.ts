import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from 'src/models/Image.model';
import { UploadConfig } from '../upload/upload.model';

const MSG = `Please upload your existing floor plan.`;
const LIMIT = 16;

@Component({
  selector: 'app-upload-grid',
  templateUrl: './upload-grid.component.html',
  styleUrls: ['./upload-grid.component.scss'],
})
export class UploadGridComponent implements OnInit {
  @Input()
  public uploadData: UploadConfig;
  @Input()
  public imgURLs: (string | ArrayBuffer)[];
  @Input()
  public files: FileList;
  @Input()
  public toShowUploadedFilesFromDevice: boolean = false;

  @Output()
  public uploadFilesEvent: EventEmitter<FileList>;

  public images: Image[];

  constructor() {
    this.uploadFilesEvent = new EventEmitter();

    this.uploadData = new UploadConfig({
      limit: LIMIT,
    });
  }

  ngOnInit(): void {
    if (this.files && this.toShowUploadedFilesFromDevice) {
      this.showFilesFromDevice(this.files);
    } else {
      this.images = this.imgURLs.map(
        (url) => new Image({ src: url as string })
      );
    }
  }

  public onUploadEvent(files: FileList): void {
    this.uploadFilesEvent.emit(files);
    this.files = files;

    if (this.toShowUploadedFilesFromDevice) {
      this.showFilesFromDevice(files);
    }
  }

  public showFilesFromDevice(files: FileList): void {
    this.imgURLs = [];
    Object.keys(files).forEach((key) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        this.imgURLs.push(reader.result);
      };
    });
  }
}
