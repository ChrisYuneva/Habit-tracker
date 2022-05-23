import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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

  constructor(private router: Router, public backendService: BackendService) {
    this.userForm = new FormGroup({
      'login': new FormControl(),
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
