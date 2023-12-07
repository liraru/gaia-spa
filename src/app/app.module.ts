import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './modules/layout/footer/footer.module';
import { MenuModule } from './modules/layout/menu/menu.module';
import { NavbarModule } from './modules/layout/navbar/navbar.module';
import { NavigationStatusService } from './services/navigation-status.service';
import { LANG } from './constants/languages.constant';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // * ANGULAR * //
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: LANG.ES,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // * LAYOUT * //
    FooterModule,
    MenuModule,
    NavbarModule
  ],
  providers: [provideClientHydration(), NavigationStatusService],
  bootstrap: [AppComponent]
})
export class AppModule {}
