import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  login: string = 'test';
  password: string = 'Qazwsxedc_01022';
  uncorrected: boolean = false;

  constructor(private router: Router) {
  }

  user: User = new User('', '')

  addUser() {
    console.log(this.user);
    if (this.user.login === this.login && this.user.password === this.password) {
      this.router.navigate(['/habits']);
    } else {
      this.uncorrected = true;
    }
  }

  ngOnInit(): void {

  }
}
