import {Component, Input, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {Habit} from "../models/habit.model";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  @Input()
  habit!: Habit;

  constructor(public router: Router, private backendService: BackendService) {
  }

  habits: Habit[] = [];
  modalVisible: boolean = false;
  warningVisible: boolean = false;
  modalAdding: boolean = false;
  habitToUpdate!: Habit;
  users = JSON.parse(localStorage.getItem('Users'));
  currentUser = this.users.find((l: User) => l.login === this.userName);
  healthCount: number = 50;
  experienceCount: number = 0;
  level: number = 1;
  scaleChange: boolean = false;
  warningType: boolean = false;
  userName = localStorage.getItem('Login');

  addHabit(): void {
    this.modalAdding = true;
    this.modalVisible = true;
  }

  update(habit: Habit): void {
    this.habitToUpdate = habit;
    this.modalAdding = false;
    this.modalVisible = true;
  }

  scaleCounter(change: any, complexity: number): void {
    if (change) {
      this.experienceCount += complexity;
    } else {
      this.healthCount -= complexity;
    }
    if (this.healthCount < 0) {
      this.healthCount = 0;
      this.warningVisible = true;
      this.warningType = false;
    }
    if (this.experienceCount >= 50) {
      this.experienceCount = 0;
      this.level++;
      this.healthCount = 50;
      this.warningType = true;
      this.warningVisible = true;
    }
    this.setParam();
  }

  setParam(): void {
    let users = JSON.parse(localStorage.getItem('Users'));
    const currentUser = users.find((l: User) => l.login === this.userName);
    currentUser.health = this.healthCount;
    currentUser.experience = this.experienceCount;
    currentUser.level = this.level;
    localStorage.setItem('Users', JSON.stringify(users));
  }

  ngOnInit() {
    const login = localStorage.getItem('Login');
    const users = JSON.parse(localStorage.getItem('Users') || '');
    if (login && users.find((l: User) => l.login === login)) {
      const currentUser = users.find((l: User) => l.login === this.userName);
      this.healthCount = currentUser.health;
      this.experienceCount = currentUser.experience;
      this.level = currentUser.level;
      this.backendService.getHabitsByLogin().subscribe((habits: Habit[]) => {
        this.habits = habits;

      })
    } else {
      this.router.navigate(['/authorization']);
    }
  }
}
