import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './modules/layout/footer/footer.module';
import { MenuModule } from './modules/layout/menu/menu.module';
import { NavbarModule } from './modules/layout/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { NavigationStatusService } from './services/navigation-status.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // * ANGULAR * //
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    // * LAYOUT * //
    FooterModule,
    MenuModule,
    NavbarModule,
    MenuModule
  ],
  providers: [
    provideClientHydration(),
    NavigationStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
