import { Component, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';

import { OfertasService }  from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-topo',
	templateUrl: './topo.component.html',
	styleUrls: ['./topo.component.css'],
	providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

	private ofertas: Observable<Oferta[]>;
	private subjectPesquisa: Subject<string> = new Subject<string>();

	constructor(private ofertasService: OfertasService) { }

	ngOnInit() {
		this.ofertas = this.subjectPesquisa
			.pipe(debounceTime(1000))
			.pipe(switchMap((termo: string) => {
				console.log("requisicao http"+termo);
				return this.ofertasService.pesquisaOfertas(termo);
			}));

		this.ofertas.subscribe((ofertas: Oferta[]) => {
			console.log(ofertas);
		});
	}

	public pesquisa(termoDaPesquisa: string): void {
		console.log("keyup " + termoDaPesquisa);
		this.subjectPesquisa.next(termoDaPesquisa);
	}

}
