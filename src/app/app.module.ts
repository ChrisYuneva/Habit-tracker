import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { CardComponent } from './card/card.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {CommonModule} from "@angular/common";
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdProgressbarBasicComponent } from './ngbd-progressbar-basic/ngbd-progressbar-basic.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    CardComponent,
    UserComponent,
    AuthorizationComponent,
    StatisticsComponent,
    ModalComponent,
    NgbdProgressbarBasicComponent,
  ],
  entryComponents: [ CardComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    NgbModule
  ],
  providers: [ CardComponent, ModalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
