import {Component, Input, OnInit} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logHeight = 30;
  selectedlog = 'Coe Console'
  constructor() { }

  ngOnInit() {
  }

  _setlog(log: string) {
    this.selectedlog = log;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.logHeight = window.innerHeight - event.rectangle.top - 41;
    console.log('Element was resized', event);
  }
}
