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
  habit!: Habit;

  // почему adding - это инпут, а не аутпут?
  @Input()
  public adding = false;

  @Output()
  public modalClosed: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public completedCard: EventEmitter<void> = new EventEmitter<void>();

  public habitForm!: FormGroup;

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

  updateHabit(): void {
    const habit = this.habitForm.value;
    habit.id = this.habit.id;
    this.backendService.updateHabit(habit);
    this.completedCard.emit();
    this.close();
  }

  ngOnInit() {
    if (this.adding) {
      this.habitForm = new FormGroup({
        name: new FormControl(''),
        type: new FormControl(HABIT_TYPE.GOOD),
        difficulty: new FormControl(1)
      });
    } else {
      this.habitForm = new FormGroup({
        name: new FormControl(this.habit.name),
        type: new FormControl(this.habit.type),
        difficulty: new FormControl(this.habit.difficulty)
      });
    }
  }
}
