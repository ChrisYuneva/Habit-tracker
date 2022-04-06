import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})


export class ContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

// test:number = 0;
//
//   constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
//               public card: Function) { }
//
//
//
//   ngOnInit(): void {
//       this.card = () => {
//         this.test++;
//         if(this.test>0) {
//           const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);
//           const componentRef = this.viewContainerRef.createComponent(componentFactory);
//         }
//       }
//
//
//
//   }

}
