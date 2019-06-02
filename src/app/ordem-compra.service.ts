import { Pedido } from './shared/pedido.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { URL_API } from './app.api';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class OrdemCompraService {
    
    constructor(public http: HttpClient) {
    }

    public efetivarCompra(pedido: Pedido): Observable<Pedido> {

        let headers: HttpHeaders = new HttpHeaders(); 
        headers.append('Content-type','applicartion.json')
        
        return this.http.post<any>(`${URL_API}/pedidos`,
            (pedido),
            ({headers: headers})
        ).pipe(map((resposta: Pedido) => resposta));
    }
}