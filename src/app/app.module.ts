import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MyNavComponent} from './my-nav/my-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {HttpService} from "./services/http.service";
import {AngularMaterialsModule} from "./angular-materials/angular-materials.module";
import {TodoListComponent} from './todo-list/todo-list.component';
import {PendingListComponent} from './pending-list/pending-list.component';
import {TodoCardComponent} from './todo-card/todo-card.component';
import {FormsModule} from "@angular/forms";
import {DialogComponent} from './dialog/dialog.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    TodoListComponent,
    PendingListComponent,
    TodoCardComponent,
    DialogComponent,
    AlertsComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialsModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
