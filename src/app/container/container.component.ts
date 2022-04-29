import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {BackendService} from "../services/backend.service";
import {Habit, HABIT_TYPE} from "../models/habit.model";
import {FormControl, FormGroup} from "@angular/forms";
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

  // @ts-ignore
  // @Input()
  // test: habitForm;

  // public habitForm = new FormGroup({
  //   name: new FormControl(''),
  //   type: new FormControl(HABIT_TYPE.GOOD),
  //   difficulty: new FormControl(1)
  // });

  constructor(private backendService: BackendService, private modalComponent: ModalComponent) {
  }

  habits: Habit[] = [];
  modalVisible: boolean = false;

  @ViewChild('dynamic', { read: ViewContainerRef })
  private viewRef: ViewContainerRef | any;

  openModal(): void {
    this.modalVisible = true;
  }

  showDynamicComponent(): void {
    this.viewRef.createComponent(CardComponent);
  }

  removeDynamicComponent(): void {
    this.viewRef.detach();
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
