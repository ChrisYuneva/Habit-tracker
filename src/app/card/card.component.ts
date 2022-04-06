import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  count: number = 0;
  habit: string = 'Привычка';

  constructor() {
  }

  ngOnInit(): void {
  }

  plus(): void {
    this.count===8?this.count:this.count++;
  }

  minus(): void {
    this.count===0?this.count:this.count--;
  }
}
