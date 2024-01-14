import { Injector, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { LANG } from 'app/constants/languages.constant';
import { FooterModule } from 'app/modules/layout/footer/footer.module';
import { MenuModule } from 'app/modules/layout/menu/menu.module';
import { NavbarModule } from 'app/modules/layout/navbar/navbar.module';
import { AuthInterceptor } from 'app/services/interceptor.service';
import { NavigationStatusService } from 'app/services/navigation-status.service';
import { NgxWebstorageModule } from 'ngx-webstorage';

export let AppInjector: Injector;

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // * ↓ ANGULAR ↓ * //
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: LANG.ES,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // * LAYOUT * //
    FooterModule,
    MenuModule,
    NavbarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    NavigationStatusService,
    provideHttpClient(withInterceptors([AuthInterceptor]), withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _injector: Injector) {
    AppInjector = this._injector;
  }
}
