import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.css']
})
export class ModalWarningComponent implements OnInit {

  @Input()
  public visible = false;

  @Input()
  public warningType = false;

  @Output()
  public warningClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  caution: string = 'О-ооу!';
  cautionContent: string = 'Кажется, у Вас закончилось здоровье, но вы можете вернуть его обратно, если постараетесь! Накопите опыт, чтобы перейти на новый уровень и получите новую порцию здоровья!';
  congratulation: string = 'Вааау!'
  congratulationContent: string = 'Так держать! Вы достигли нового уровня! Дальше - больше!!!'
  alert = '';
  alertContent = '';

  close(): void {
    this.warningClosed.emit();
  }

  ngOnInit(): void {
    if (this.warningType) {
      this.alert = this.congratulation;
      this.alertContent = this.congratulationContent;
    } else {
      this.alert = this.caution;
      this.alertContent = this.cautionContent;
    }
  }
}
