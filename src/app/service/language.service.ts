import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    language$ = new ReplaySubject<LangChangeEvent>(1);
    translate = this.translateService;
    // 國旗對照;
  
    constructor(private translateService: TranslateService) {}
  
    setInitState() {
      this.translateService.addLangs(['en', 'zh','vi']);
      if(localStorage.getItem("language") == null){
        const browserLang = (this.translate.getBrowserLang().includes('vi')) ? 'vi' : 'en'  ;
        this.setLang(browserLang);
        localStorage.setItem("language",browserLang);
      }else{
        this.setLang(localStorage.getItem("language"));
      }
      
    }
  
    setLang(lang: string) {
      this.translateService.onLangChange.pipe(take(1)).subscribe(result => {
        this.language$.next(result);
      });
      this.translateService.use(lang);
     
    }
  }