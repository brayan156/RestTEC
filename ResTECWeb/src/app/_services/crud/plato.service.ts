import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Plato } from 'src/app/_models/crud/plato';

const baseUrl = `${environment.apiUrl}/plato`;

@Injectable({ providedIn: 'root' })
export class PlatoService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Plato[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Plato>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}