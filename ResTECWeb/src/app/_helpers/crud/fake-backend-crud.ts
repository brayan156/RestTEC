import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Role } from 'src/app/_models/crud/role';

// array in local storage for registered platos
const platosKey = 'angular-11-crud-example-platos';
const platosJSON = localStorage.getItem(platosKey);
let platos: any[] = platosJSON ? JSON.parse(platosJSON) : [{
    id: 1,
    title: 'Mr',
    firstName: 'Joe',
    lastName: 'Bloggs',
    email: 'joe@bloggs.com',
    role: Role.Plato,
    password: 'joe123'
}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/platos') && method === 'GET':
                    return getPlatos();
                case url.match(/\/platos\/\d+$/) && method === 'GET':
                    return getPlatoById();
                case url.endsWith('/platos') && method === 'POST':
                    return createPlato();
                case url.match(/\/platos\/\d+$/) && method === 'PUT':
                    return updatePlato();
                case url.match(/\/platos\/\d+$/) && method === 'DELETE':
                    return deletePlato();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function getPlatos() {
            return ok(platos.map(x => basicDetails(x)));
        }

        function getPlatoById() {
            const plato = platos.find(x => x.id === idFromUrl());
            return ok(basicDetails(plato));
        }

        function createPlato() {
            const plato = body;

            if (platos.find(x => x.email === plato.email)) {
                return error(`Plato with the email ${plato.email} already exists`);
            }

            // assign plato id and a few other properties then save
            plato.id = newPlatoId();
            delete plato.confirmPassword;
            platos.push(plato);
            localStorage.setItem(platosKey, JSON.stringify(platos));

            return ok();
        }

        function updatePlato() {
            let params = body;
            let plato = platos.find(x => x.id === idFromUrl());

            if (params.email !== plato.email && platos.find(x => x.email === params.email)) {
                return error(`Plato with the email ${params.email} already exists`);
            }

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save plato
            Object.assign(plato, params);
            localStorage.setItem(platosKey, JSON.stringify(platos));

            return ok();
        }

        function deletePlato() {
            platos = platos.filter(x => x.id !== idFromUrl());
            localStorage.setItem(platosKey, JSON.stringify(platos));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: any) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function basicDetails(plato: any) {
            const { id, title, firstName, lastName, email, role } = plato;
            return { id, title, firstName, lastName, email, role };
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newPlatoId() {
            return platos.length ? Math.max(...platos.map(x => x.id)) + 1 : 1;
        }
    }
}

export const fakeBackendProviderCrud = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};