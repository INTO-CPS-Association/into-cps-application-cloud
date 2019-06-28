import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-model-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  constructor() { }
  _hidden = true;
  ngOnInit() {
  }
  _hide_menu() {
    document.getElementById('rightclickmenu').style.display = 'none';
  }
}
