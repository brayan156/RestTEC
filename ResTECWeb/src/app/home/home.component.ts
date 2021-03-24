/*
gets all users from the user service and makes them available to the template via a users array property.
*/
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
 })

export class HomeComponent {
    loading = false;
    users: User[] = [];

    [x: string]: any;
    currentUser!: User;

    constructor(
        private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService
        ) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
         }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }


    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}