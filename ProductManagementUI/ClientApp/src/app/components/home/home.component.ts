import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {}

    isUserLoggedIn = false;

    ngOnInit(): void {}

    login() {
        this.router.navigate(['dashboard']);
    }
    logout() {
        this.router.navigate(['dashboard']);
    }

    goToDashboard() {
        this.router.navigate(['dashboard']);
    }
}
