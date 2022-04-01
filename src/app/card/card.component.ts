import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  count: number = 0;
  del: number = 0;

  habit: string = 'Привычка';

  constructor() {
  }

  ngOnInit(): void {
  }

  test(): void {
    // this.count=true;
    this.count++;
    console.log(this.count);
  }

  minus(): void {
    this.count--;
    console.log(this.count);
  }

  delCard(): void {
    this.del++;
  }

}
