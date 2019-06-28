import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-readme',
  templateUrl: './readme.component.html',
  styleUrls: ['./readme.component.css']
})
export class ReadmeComponent implements OnInit {
  @Input() path = '';

  constructor() { }

  ngOnInit() {
  }

}
