import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { CardComponent } from './card/card.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    CardComponent,
    UserComponent,
    AuthorizationComponent,
    StatisticsComponent,
  ],
  entryComponents: [ ContainerComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [ CardComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
