import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionDePlatosService {
  private valores = new BehaviorSubject('');
  public valoresActuales = this.valores.asObservable();
  constructor(private http: HttpClient) { }
  public cargarJson(): void{
    this.http.get<any>('/assets/BBB.json').subscribe(
      data => this.valores.next(data)
    );
  }
}

