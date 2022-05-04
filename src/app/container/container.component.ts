import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {Habit} from "../models/habit.model";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  @Input()
    // @ts-ignore
  habit: Habit;

  constructor(private backendService: BackendService, private modalComponent: ModalComponent) {
  }

  habits: Habit[] = [];
  modalVisible: boolean = false;
  modalAdding: boolean = false;
  // @ts-ignore
  habitToUpdate: Habit;

  @ViewChild('dynamic', { read: ViewContainerRef })
  private viewRef: ViewContainerRef | any;

  openModal(): void {
    this.modalAdding = true;
    this.modalVisible = true;
  }

  addHabit(): void {
    this.backendService.addHabit(this.modalComponent.habitForm.value);
  }

  update(habit: Habit): void {
    this.habitToUpdate = habit;
    this.modalAdding = false;
    this.modalVisible = true;
  }

  ngOnInit() {
    this.backendService.habits$.subscribe((habits: Habit[]) => {
      this.habits = habits;
    })
  }
}
