import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { BackendService } from '../../shared/backend.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class CreateService {

  constructor(private backendService: BackendService) { }

  getTemplates(): Observable<any[]> {
    return this.backendService.getRequest('/gameTemplates').map((message: Response) => {
      const templates: any[] = message.json();
      return templates;
    });
  }

  saveGame(gameToSave: {minPlayers: number, maxPlayers: number, templateName: string}): Observable<boolean> {
    return this.backendService.requestPost('/games', gameToSave).map((message: Response) => {
      const response: any = message.json();
      console.log(response);

      if(!response.ok) {
        console.log(response.message);
      }

      return response.ok !== false;
    });
  }

}
