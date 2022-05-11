import {Component, Input, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {Habit} from "../models/habit.model";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  @Input()
  habit!: Habit;

  constructor(private backendService: BackendService, public cardComponent: CardComponent) {
  }

  habits: Habit[] = [];
  modalVisible: boolean = false;
  modalAdding: boolean = false;
  healthCount: number = 50;
  experienceCount: number = 0;
  scaleChange: boolean = false;
  habitToUpdate!: Habit;

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
    if (this.healthCount <= 0) {
      this.healthCount = 0;
    }
    if (this.experienceCount >= 50) {
      this.experienceCount = 50;
    }
  }

  ngOnInit() {
    this.backendService.habits$.subscribe((habits: Habit[]) => {
      this.habits = habits;
    })
  }
}
