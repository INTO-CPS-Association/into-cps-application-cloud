import {Component, Injectable, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-design-space-exploration',
  templateUrl: './design-space-exploration.component.html',
  styleUrls: ['./design-space-exploration.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DesignSpaceExplorationComponent implements OnInit {
  @Input() path = '';

  constructor() { }

  ngOnInit() {
  }

}
