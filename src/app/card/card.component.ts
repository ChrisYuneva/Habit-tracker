import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Habit} from "../models/habit.model";
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  count: number = 0;

  // Передача данных в дочерний компонент
  @Input()
  habit!: Habit;

  @Input()
  public adding = false;

  // Привязка к событиям дочернего компонента
  @Output()
  public completedCard: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public edit: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public scale: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
  }

  plus(): void {
    this.count === 8 ? this.count : this.count++;
  }

  minus(): void {
    this.count === 0 ? this.count : this.count--;
  }

  scaleChange(change: any): void {
    // emit генерирует событие, содержащее переданное значение
    this.scale.emit(change);
  }

  deleteHabit(id: number): void {
    this.backendService.deleteHabit(this.habit.id);
  }
}
