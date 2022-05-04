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

  @ViewChild('dynamic', { read: ViewContainerRef })
  private viewRef: ViewContainerRef | any;

  openModal(): void {
    this.modalVisible = true;
  }

  addHabit(): void {
      this.backendService.addHabit(this.modalComponent.habitForm.value);
  }


  ngOnInit() {
    this.backendService.habits$.subscribe((habits: Habit[]) => {
      this.habits = habits;
    })
  }
}
