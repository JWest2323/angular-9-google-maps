import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports:      [ BrowserModule, FormsModule, GoogleMapsModule, BrowserAnimationsModule, MatSidenavModule, MatToolbarModule, MatSelectModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
