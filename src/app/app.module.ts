import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { LocalStorageService } from './services/local-storage.service';

import { HttpClientModule } from '@angular/common/http';

import { CarteModalPageModule } from './carte-modal/carte-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule, CarteModalPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: LocalStorageService}],
  bootstrap: [AppComponent],
})
export class AppModule {}
