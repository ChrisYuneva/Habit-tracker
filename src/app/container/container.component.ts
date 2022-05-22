import {Component, Input, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {Habit} from "../models/habit.model";


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  @Input()
  habit!: Habit;

  constructor(private backendService: BackendService) {
  }

  habits: Habit[] = [];
  modalVisible: boolean = false;
  warningVisible: boolean = false;
  modalAdding: boolean = false;
  habitToUpdate!: Habit;
  healthCount: number = Number(JSON.parse(localStorage.getItem('Health') || '50'));
  experienceCount: number = Number(JSON.parse(localStorage.getItem('Experience') || '0'));
  scaleChange: boolean = false;
  level: number = Number(JSON.parse(localStorage.getItem('Level') || '1'));
  warningType: boolean = false;

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
    localStorage.setItem('Health', JSON.stringify(this.healthCount));
    localStorage.setItem('Experience', JSON.stringify(this.experienceCount));
    localStorage.setItem('Level', JSON.stringify(this.level));
  }

  ngOnInit() {
    this.backendService.habits$.subscribe((habits: Habit[]) => {
      this.habits = habits;
    })
  }
}
