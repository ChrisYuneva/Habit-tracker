import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  constructor() {
  }

  @ViewChild('dynamic', { read: ViewContainerRef })
  private viewRef: ViewContainerRef | any;

  showDynamicComponent(): void {
    this.viewRef.createComponent(CardComponent);
  }

  removeDynamicComponent(): void {
    this.viewRef.detach();
  }

  ngOnInit() {
  }
}
