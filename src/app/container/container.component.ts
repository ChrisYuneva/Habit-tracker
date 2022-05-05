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
    // @ts-ignore
  habit: Habit;

  constructor(private backendService: BackendService, public cardComponent: CardComponent) {
  }

  habits: Habit[] = [];
  modalVisible: boolean = false;
  modalAdding: boolean = false;
  healthNum: number = 0;
  healthCurrently: number = 0;
  healthChange: boolean = false;
  // @ts-ignore
  habitToUpdate: Habit;

  addHabit(): void {
    this.modalAdding = true;
    this.modalVisible = true;
  }

  update(habit: Habit): void {
    // зачем нужно указывать, что habitToUpdate - это habit?
    this.habitToUpdate = habit;
    this.modalAdding = false;
    this.modalVisible = true;
  }

  health(change: any, habitDif: number): void {
    this.healthChange = change;
    this.healthNum = habitDif;
    // if(habitDif<0) {
    //   habitDif==0;
    // }
    // else {
    //   change?habitDif++:habitDif--;
    if(change) {
      this.healthCurrently = this.healthCurrently+habitDif;
    }
    else {
      this.healthCurrently -= habitDif;
    }
  }

  ngOnInit() {
    this.backendService.habits$.subscribe((habits: Habit[]) => {
      this.habits = habits;
    })
  }
}
