import {Component, ViewChild} from '@angular/core';
import {SidePanelHandler} from './NavigationHandler/side-panel-handler';
import {CommunicationComponent} from './Components/communication/communication.component';
import {UserComponent} from './Components/user/user.component';
import {MultiModelComponent} from './Components/multi-model/multi-model.component';
// import {CoSimConfigurationComponent} from './Components/co-sim-configuration/co-sim-configuration.component';
import {MultiModel} from './variables/MultiModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(UserComponent, { static: true }) userComponent;
  multiModelComponentLoaded: MultiModelComponent;
  @ViewChild(MultiModelComponent, { static: false }) set multiModelComponent(content: MultiModelComponent) {
    if (content !== undefined) {
      content.loadProject(this.communicationComponent, this.userComponent.username, this.selectedProject, this.elementID);
      this.multiModelComponentLoaded = content;
    }
  }
  // coSimConfigurationComponent: CoSimConfigurationComponent;
  // @ViewChild(CoSimConfigurationComponent, { static: false }) set CoSimConfigurationComponent(content: CoSimConfigurationComponent) {
  //   if (content !== undefined) {
  //     content.loadProject(this.communicationComponent, this.userComponent.username, this.selectedProject, this.elementID);
  //     this.coSimConfigurationComponent = content;
  //   }
  // }
  username: string;
  selectedProject: string;
  elementID: string;
  title = 'INTO-CPS';
  sidepanelhandler: SidePanelHandler;
  view = 'readme';
  path = 'readme.md';
  projects: string[] = [];

  constructor(private communicationComponent: CommunicationComponent) {
    this.sidepanelhandler = new SidePanelHandler();
    this._menuClick();
    const MM = new MultiModel();
    console.log(MM);
  }

  _toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  async loggedin(e) {
    console.log(e)
    this.username = this.userComponent.username;
    this.projects = await this.communicationComponent.getListOfProjects(this.username);
    this.selectedProject = this.projects[0];
    this._setMenuTites();
  }
  async uploadedProject(e) {
    console.log('files uploaded')
    this.projects = await this.communicationComponent.getListOfProjects(this.username);
    this.selectedProject = this.projects[0];
  }

  async selectProject(event) {
    this.selectedProject = event.target.value;
    console.log(this.selectedProject);
  }

  async loadProject() {
    const nav = document.getElementById('NavMenu');
    while (nav.firstChild) {
      nav.removeChild(nav.firstChild);
    }
    this._setMenuTites();
    const arr = await this.communicationComponent.getProjectData(this.username, this.selectedProject);
    arr.forEach(projectdata => {
      this.sidepanelhandler._addMenuFromStringPath(projectdata);
    });
  }

  async _setMenuTites() {
    this.sidepanelhandler._addMenuFromStringPath('DSEs/');
    this.sidepanelhandler._addMenuFromStringPath('FMUs/');
    this.sidepanelhandler._addMenuFromStringPath('Model-checking/');
    this.sidepanelhandler._addMenuFromStringPath('Models/');
    this.sidepanelhandler._addMenuFromStringPath('Multi-models/');
    this.sidepanelhandler._addMenuFromStringPath('Multi-models/');
    this.sidepanelhandler._addMenuFromStringPath('Resources/');
    this.sidepanelhandler._addMenuFromStringPath('SysML/');
    this.sidepanelhandler._addMenuFromStringPath('Test-Data-Generation/');
    this.sidepanelhandler._addMenuFromStringPath('Traceability/');
  }

  async _menuClick() {
    document.addEventListener('DOMContentLoaded', (event) => {
      document.getElementById('NavMenu').addEventListener('click', async (e: any) => {
        e = e || window.event;
        let elementID = e.target.parentElement.id.replace('click_NavMenu_', '');
        console.log(elementID);
        elementID = elementID.split('__dot__').join('.').replace(/\_/g, '/');
        if (elementID.endsWith('mm.json')) {
          this.path = elementID;
          this.view = 'mm.json';
          this.elementID = elementID;
          if (this.multiModelComponentLoaded !== undefined) {
            this.multiModelComponentLoaded.loadProject(this.communicationComponent, this.username, this.selectedProject, elementID, true);
          }
        } else if (elementID.endsWith('dse.json')) {
          this.view = 'dse.json';
        } else if (elementID.endsWith('coe.json')) {
          this.view = 'coe.json';
          this.path = elementID;
          this.elementID = elementID;
          // if (this.coSimConfigurationComponent !== undefined) {
          //   this.coSimConfigurationComponent.loadProject(this.communicationComponent, this.username, this.selectedProject, elementID);
          // }
        }
        // Change View depending on file click.

      }, false);
    });
  }
  logout() {
    this.communicationComponent.logout(this.username);
    window.location.reload();
  }

  changeview(viewname: string) {
    this.view = viewname;
  }
}
