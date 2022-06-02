import {Component, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public userForm!: FormGroup;
  invalidPas: boolean = false;

  constructor(public backendService: BackendService, private router: Router) {
    this.userForm = new FormGroup({
      'login': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', Validators.pattern("(?=.*[a-zA-Z0-9]).{6,}")),
      'repPassword': new FormControl(),
    })
  }

  addUser(): void {
    const users = this.userForm.value;
    if (this.userForm.value.password === this.userForm.value.repPassword) {
      delete users.repPassword;
      this.backendService.addUser(users);
    } else {
      this.invalidPas = true;
    }
  }

  ngOnInit(): void {
  }

}
