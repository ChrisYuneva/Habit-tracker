import {Component, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  public userForm!: FormGroup;
  uncorrected: boolean = false;

  constructor(public backendService: BackendService) {
    this.userForm = new FormGroup({
      'login': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl()
    })
  }

  enter() {
    const users = this.userForm.value;
    this.backendService.entrance(users);
  }

  ngOnInit(): void {

  }
}
