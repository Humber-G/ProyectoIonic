import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPersonal } from 'src/services/IPersonal';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private url: string = 'http://54.227.209.116:3000/personal';
  private httpClient: HttpClient;
  constructor(client: HttpClient) {
    this.httpClient = client;
  }

  public getPersonal(): Observable<Array<IPersonal>> {
    return this.httpClient.get<Array<IPersonal>>(this.url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
