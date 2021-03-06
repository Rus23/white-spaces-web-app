import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { UploadConfig } from './upload.model';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { puralize } from '../Utilities';

export const SUPPERTED_FILES = '.dwg, .pdf, .jpg, .jpeg, .png ';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input()
  public data?: UploadConfig;
  @Input()
  public supportedFileTypes: string = SUPPERTED_FILES;

  @Output()
  public uploadEvent: EventEmitter<FileList>;

  @ViewChild('fileUpload23')
  public uploadElement: ElementRef;

  public $change: Observable<any>;
  private $subChange: Subscription;

  constructor() {
    this.uploadEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.data.supportedFileTypes =
      this.data.supportedFileTypes ?? SUPPERTED_FILES;

    this.data.info =
      this.data.info ??
      `Make sure that the file is in the following formats\n ${this.data.supportedFileTypes}`;

    this.data.bottomInfo =
      this.data.bottomInfo ??
      `The limit is ${this.data.limit} file${puralize(this.data.limit)}`;
  }

  ngAfterViewInit(): void {
    this.$change = fromEvent(this.uploadElement.nativeElement, 'change');
    this.$subChange = this.$change.subscribe((event) => {
      const files = { ...(event.target as any).files };
      const n = Object.values(files).length;

      if (n > this.data.limit) {
        alert('You have selected too many files.');
        return;
      } else {
        this.uploadEvent.emit(files);
      }

      (event.target as any).value = '';
    });
  }

  ngOnDestroy(): void {
    if (this.$subChange) this.$subChange.unsubscribe();
  }

  public onUpload(): void {
    this.uploadElement.nativeElement.click();
  }
}
