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

  // Передача данных в дочерний компонент
  @Input()
  habit!: Habit;

  @Input()
  public adding = false;

  // Привязка к событиям дочернего компонента
  @Output()
  public modalClosed: EventEmitter<void> = new EventEmitter<void>();

  public habitForm!: FormGroup;

  invalid: boolean = false;
  warning: string = '';

  constructor(private backendService: BackendService) {
  }

  close(): void {
    this.modalClosed.emit();
  }

  addHabit(): void {
    const habit = this.habitForm.value;
    if (habit.name === '') {
      this.invalid = true;
      this.warning = 'Введите название привычки';
    } else if (habit.difficulty > 5) {
      this.invalid = true;
      this.warning = 'Максимальная сложность привычки равна 5';
    } else if (habit.difficulty < 1) {
      this.invalid = true;
      this.warning = 'Минимальная сложность привычки равна 1';
    }
    else {
      this.backendService.addHabit(habit);
      this.close();
    }
  }

  updateHabit(): void {
    const habit = this.habitForm.value;
    habit.id = this.habit.id;
    if (habit.name === '') {
      this.invalid = true;
      this.warning = 'Введите название привычки';
    } else if (habit.difficulty > 5) {
      this.invalid = true;
      this.warning = 'Максимальная сложность привычки равна 5';
    } else if (habit.difficulty < 1) {
      this.invalid = true;
      this.warning = 'Минимальная сложность привычки равна 1';
    }
    else {
      this.backendService.updateHabit(habit);
      this.close();
    }
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
