import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import 'rxjs/add/operator/toPromise';

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) { }
    
    public getOfertas() : Promise<Oferta[]> {
        return this.http.get('http://localhost:3000/ofertas')
            .toPromise()
            .then((resposta: any) => resposta );
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`http://localhost:3000/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta);
    }
}