import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
  // styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor() {
  }

  ngOnInit() {
  }

}
