import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Habit} from "../models/habit.model";
import {BackendService} from "../services/backend.service";
import {ContainerComponent} from "../container/container.component";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  count: number = 0;
  i:number = this.backendService.editingIndex;

  @Input()
  // @ts-ignore
  habit: Habit;

  @Input()
  public adding = false;

  @Output()
  public completedCard: EventEmitter<void> = new EventEmitter<void>();

  // // @ts-ignore
  // @Input()
  // test: habitForm;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  plus(): void {
    this.count===8?this.count:this.count++;
  }

  minus(): void {
    this.count===0?this.count:this.count--;
  }

  deleteHabit(id: number): void {
    console.log(this.habit);
    this.backendService.deleteHabit(this.habit.id);
  }

  setEditForm(index: number) {
    this.backendService.updateHabit(index);
  }

  upDate(): void {
    this.completedCard.emit()
  }

  // update(): void {
  //   this.backendService.updateHabit(this.habit.id);
  // }
}
