import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../services/backend.service";

export class User {
  constructor(public login: string,
              public password: string) {
  }
}

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  // login: string = 'test';
  // password: string = 'Qazwsxedc_01022';
  uncorrected: boolean = false;

  constructor(private router: Router, private backendService: BackendService) {
  }

  user: User = new User('', '');

  addUser() {
    // if (this.user.login === this.login && this.user.password === this.password) {
    //   this.router.navigate(['/habits']);
    // } else {
    //   this.uncorrected = true;
    // }
    this.backendService.entrance(this.user);
  }

  ngOnInit(): void {

  }
}
