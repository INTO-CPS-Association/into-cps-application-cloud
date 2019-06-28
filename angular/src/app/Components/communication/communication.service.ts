import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Routes, Settings} from '../../SystemSettings';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  protocol = Settings.Protocol;
  host = Settings.Host;
  port  = Settings.Port;

  constructor(private httpClient: HttpClient) { }

  SendToServer(body: any, service: Routes): Observable<any>{
    const addr = '' + this.protocol + this.host + this.port + service;
    return this.httpClient.post<any>(addr, body, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
