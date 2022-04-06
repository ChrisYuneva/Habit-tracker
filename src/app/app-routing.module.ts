import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {ContainerComponent} from "./container/container.component";

const routes: Routes = [
  { path: '', redirectTo: '/authorization', pathMatch: 'full' },
  { path: 'authorization', component: AuthorizationComponent},
  { path: 'statistics', component: StatisticsComponent },
  { path: 'habits', component: ContainerComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
