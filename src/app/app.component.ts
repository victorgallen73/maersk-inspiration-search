import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'maersk-inspiration-search';

  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>,
    private authService: AuthService
    ) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');


    // Configure initial language from local storage if exists. If no, read it from environment.
    const storedLang = localStorage.getItem('locale');
    const userLang = (storedLang && environment.langs.includes(storedLang)) ? storedLang : environment.defaultLang;
    localStorage.setItem('locale', userLang);
    this.translate.setDefaultLang(environment.defaultLang);
    this.translate.use(userLang);

    this.dateAdapter.setLocale(environment.defaultLang);

    moment.locale(environment.defaultLang);

    // When the language changes, updates locale from Moment and DateAdapter
    this.translate.onLangChange.subscribe(event => {
      moment.locale(event.lang);
      this.dateAdapter.setLocale(event.lang);
    });
  }
}
