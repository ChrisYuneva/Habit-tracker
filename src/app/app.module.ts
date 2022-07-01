import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { CardComponent } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {CommonModule} from "@angular/common";
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModalWarningComponent } from './modal-warning/modal-warning.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { ButtonComponent } from './button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    CardComponent,
    AuthorizationComponent,
    StatisticsComponent,
    ModalComponent,
    NotFoundComponent,
    ModalWarningComponent,
    RegistrationComponent,
    ChartComponent,
    ButtonComponent,
  ],
  entryComponents: [ CardComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    NgChartsModule
  ],
  providers: [ CardComponent, ModalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
