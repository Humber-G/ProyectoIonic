import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from 'src/services/ICliente';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url: string = 'http://localhost:3000/clientes';
  private httpClient: HttpClient;

  constructor(client: HttpClient) {
    this.httpClient = client;
  }

  public getClient(): Observable<Array<IClient>> {
    return this.httpClient.get<Array<IClient>>(this.url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public addClient(newClient: IClient): Observable<IClient> {
    return this.httpClient.post<IClient>(this.url, JSON.stringify(newClient), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public deleteClient(id: number) {
    return this.httpClient.delete<any>(this.url + '/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // public updateClient(newData: IClient): Observable<IClient> {
  //   return this.httpClient.patch<IClient>(this.url, JSON.stringify(newData), {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  public updateClient(id: number, newData: IClient) {
    return this.httpClient.patch(this.url + '/' + id, newData);
  }
}
