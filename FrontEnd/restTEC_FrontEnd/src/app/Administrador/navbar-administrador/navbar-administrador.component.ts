import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.css']
})
export class NavbarAdministradorComponent implements OnInit {

  constructor(private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  navigate(url) {
    this.router.navigateByUrl('/administrador/'.concat(url));
  }
}


