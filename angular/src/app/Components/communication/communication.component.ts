import {Component, Injectable, OnInit} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import { CommunicationService } from './communication.service';
import {Routes} from '../../SystemSettings';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class CommunicationComponent implements OnInit {
  uploadProgress = 0;
  splitter = '_!_';


  constructor(private serverService: CommunicationService) {
  }

  ngOnInit() {
  }

  async sendProjectFiles(files: any[], username: string, project: string, uploadProgress: number) {
    if (files !== null) {
      const fd = new FormData();
      fd.append('username', username);
      fd.append('projects', project);
      console.log(username)
      console.log(project)
      const re = /\//gi;
      fd.append('project', files[0].webkitRelativePath.split('/')[0]);
      for (let i = 0; i < files.length; ++i) {
        fd.append('file', files[i], files[i].webkitRelativePath.replace(re, this.splitter));
      }
      return new Promise<string[]>((resolve, reject) => {
        this.serverService.SendToServer(fd, Routes.UploadProject).subscribe(
          event => {
            console.log(event);
            if (event.type === HttpEventType.UploadProgress) {
              uploadProgress = Math.round((event.loaded / event.total) * 100);
              if (uploadProgress === 100) {
                resolve([]);
              }
            } else if (event.type === HttpEventType.Response) {
              console.log(event);
            }
          },
          (error) => console.log(error)
        );
      });
    } else {
      console.error('No file selected');
    }
    return null;
  }

  // THIS IS A LIST A SMALLER INTERACTIVE CALLS USING THE callNode FUNCTION
  async getProjectData(user: string, proj: string) {
    return this.callNode<string[]>(Routes.GetListOfProjectFiles, {username: user}, {project: proj});
  }
  async getListOfProjects(user: string) {
    return this.callNode<string[]>(Routes.GetListOfProjects, {username: user});
  }
  async getCoSimDescription(user: string, proj: string, CoSimpath: string) {
    return this.callNode<string>(Routes.GetCoSimDescription, {username: user}, {project: proj}, {path: CoSimpath});
  }
  async updateJSon(user: string, proj: string, projfilepath: string, jsonstring: string) {
    return this.callNode<string>(Routes.UpdateFile, {username: user}, {project: proj}, {path: projfilepath}, {json: jsonstring});
  }
  async runSimulation(user: string, proj: string, Copath: string, sesId: string) {
    return this.callNode<string>(Routes.RunCoSimulation, {username: user}, {project: proj}, {coSimPath: Copath}, {sessionId: sesId});
  }
  async getMMDescription(user: string, proj: string, MMpath: string) {
    return this.callNode<string>(Routes.GetMMDescription, {username: user}, {project: proj}, {path: MMpath});
  }
  async getFmusDescription(user: string, proj: string) {
    return this.callNode<string>(Routes.GetFMUDescriptions, {username: user}, {project: proj});
  }
  async getCoeSession(user: string) {
    return this.callNode<string>(Routes.InitCoSimulation, {username: user});
  }
  async getCoeStatus(user: string, sesId: string, stattime: string) {
    return this.callNode<string>(Routes.StatusSimulation, {username: user}, {sessionId: sesId}, {statustime: stattime});
  }
  async login(user: string, pass: string) {
    return this.callNode<string>(Routes.UserLogin, {username: user}, {password: pass});
  }
  async signup(user: string, pass: string) {
    return this.callNode<string>(Routes.UserSignup, {username: user}, {password: pass});
  }
  async logout(user: string) {
    return this.callNode<string>(Routes.UserSignout, {username: user});
  }
  async forgottenPassword(emailAddress: string) {
    return this.callNode<string>(Routes.UserPassReset, {email: emailAddress});
  }
  async stopSimulation(user: string, sesId: string) {
    return this.callNode<string>(Routes.StopCoSimulation, {username: user}, {sessionId: sesId});
  }

  // Makes it easy to make smaller request to the backend application.
  async callNode<t>(route: Routes, ...appendables: any): Promise<t> {
    const fd = new FormData();
    appendables.forEach(appendable => {
      fd.append(Object.keys(appendable)[0], appendable[Object.keys(appendable)[0]]);
    });
    return new Promise<t>((resolve, reject) => {
      this.serverService.SendToServer(fd, route).subscribe(
        event => {
          if (event.type === HttpEventType.Response) {
            resolve(event.body.return);
          }
        },
        (error) => {
          console.log(error);
          resolve(null);
        }
      );
    });
  }
}
