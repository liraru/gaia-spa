import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './modules/layout/footer/footer.module';
import { MenuModule } from './modules/layout/menu/menu.module';
import { NavbarModule } from './modules/layout/navbar/navbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FooterModule, MenuModule, NavbarModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule {}
