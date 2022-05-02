import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Habit, HABIT_TYPE} from "../models/habit.model";
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input()
  // @ts-ignore
  habit: Habit;
  @Input()
  public adding = false;

  @Output()
  public modalClosed: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public completedCard: EventEmitter<void> = new EventEmitter<void>();


  public habitForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(HABIT_TYPE.GOOD),
    difficulty: new FormControl(1)
  });

  constructor(private backendService: BackendService) {
  }

  close(): void {
    this.modalClosed.emit();
  }

  addHabit(): void {
    const habit = this.habitForm.value;
    this.backendService.addHabit(habit);
    this.completedCard.emit();
    this.close();
  }

  ngOnInit() {

  }

}
