import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommunicationComponent } from '../communication/communication.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  @Input() username = '';
  @Input() selectedProject = '';
  project = "example-line_follower_robot";
  selectedFile: any[] = null;
  filemessage = 'Drop you project here';
  uploadProgress = 0;
  splitter = '_!_';
  sessionID:string =  null;
  MMname:string = 'MMname';
  COEname:string = 'COEname';
  OPTION:string = '';
  @Output() uploaded = new EventEmitter<string>();

  constructor(private communicationComponent: CommunicationComponent) { }

  ngOnInit() {
  }


  onDragOver(event) {
    window.addEventListener('dragover', e => {
      e && e.preventDefault();
    }, false);
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files;
    this.filemessage = 'Number of files for upload: ' + this.selectedFile.length;
    console.log(this.selectedFile);
  }

  async onSendFile() {
    await this.communicationComponent.sendProjectFiles(this.selectedFile, this.username, this.selectedProject, this.uploadProgress);
    this.uploaded.next('success');
  }
}
