import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-chef',
  templateUrl: './navbar-chef.component.html',
  styleUrls: ['./navbar-chef.component.css']
})
export class NavbarChefComponent implements OnInit {

  constructor(private route: Router){
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  navegation(route){
    this.route.navigateByUrl('/chef/'.concat(route));
  }
}
