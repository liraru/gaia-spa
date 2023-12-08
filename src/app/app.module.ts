import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LANG } from './constants/languages.constant';
import { FooterModule } from './modules/layout/footer/footer.module';
import { MenuModule } from './modules/layout/menu/menu.module';
import { NavbarModule } from './modules/layout/navbar/navbar.module';
import { InterceptorService } from './services/interceptor.service';
import { NavigationStatusService } from './services/navigation-status.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // * ANGULAR * //
    CommonModule,
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
    NavbarModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    NavigationStatusService,
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
