import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PlatoService } from 'src/app/_services/crud/plato.service';
import { Plato } from 'src/app/_models/crud/plato';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    platos!: Plato[];

    constructor(private platoService: PlatoService) {}

    ngOnInit() {
        this.platoService.getAll()
            .pipe(first())
            .subscribe(platos => this.platos = platos);
    }

    deletePlato(id: string) {
        const plato = this.platos.find(x => x.id === id);
        if (!plato) return;
        plato.isDeleting = true;
        this.platoService.delete(id)
            .pipe(first())
            .subscribe(() => this.platos = this.platos.filter(x => x.id !== id));
    }
}