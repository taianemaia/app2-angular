import { Component, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';

import { OfertasService }  from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'app-topo',
	templateUrl: './topo.component.html',
	styleUrls: ['./topo.component.css'],
	providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

	private ofertas: Observable<Oferta[]>;
	//public ofertas: Oferta[];
	private subjectPesquisa: Subject<string> = new Subject<string>();

	constructor(private ofertasService: OfertasService) { }

	ngOnInit() {
		this.ofertas = this.subjectPesquisa
			.pipe(debounceTime(1000))
			.pipe(distinctUntilChanged())
			.pipe(switchMap((termo: string) => {
				console.log("requisicao http"+termo);
				if(termo.trim() === '') {
					return of<Oferta[]>([]);
				}
				return this.ofertasService.pesquisaOfertas(termo);
			}))
			.pipe(catchError(erro => { 
				console.log(erro); 
				return of<Oferta[]>([]); 
			}));

		/*this.ofertasObs.subscribe((ofertas: Oferta[]) => {
			this.ofertas = ofertas;
		});*/
	}

	public pesquisa(termoDaPesquisa: string): void {
		console.log("keyup " + termoDaPesquisa);
		this.subjectPesquisa.next(termoDaPesquisa);
	}

	public limpaPesquisa(): void {
		this.subjectPesquisa.next('');
	}

}
