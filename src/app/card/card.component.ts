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


  @Input()
  // @ts-ignore
  habit: Habit;

  @Input()
  public adding = false;

  @Output()
  public completedCard: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public edit: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public health: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public experience: EventEmitter<void> = new EventEmitter<void>();

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
  }

  plus(): void {
    this.count===8?this.count:this.count++;
  }

  minus(): void {
    this.count===0?this.count:this.count--;
  }

  // healthF(): void {
  //   this.healthCount++;
  //   console.log(this.healthCount)
  // }

  healthF(): void {
    this.health.emit()
}
  healthChange(change:any): void {
    this.health.emit(change)
  }

  deleteHabit(id: number): void {
    this.backendService.deleteHabit(this.habit.id);
  }
}
