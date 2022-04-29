import {Component, OnInit, Input, ViewChild, ViewContainerRef, Output, EventEmitter} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
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

  ngOnInit() {

  }

  addHabit(): void {
    const habit = this.habitForm.value;
  }
}
