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
  healthCount: number = 0;
  healthChange: boolean = false;
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

  healthCounter(change: any, complexity: number): void {
    this.healthChange = change;
    if(change) {
      this.healthCount += complexity;
    }
    else {
      if(this.healthCount < 0) {
        this.healthCount = 0;
      }
      else {
        this.healthCount -= complexity;
      }
    }
  }

  ngOnInit() {
    this.backendService.habits$.subscribe((habits: Habit[]) => {
      this.habits = habits;
    })
  }
}
