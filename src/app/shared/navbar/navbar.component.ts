import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    loggedIn: boolean;

    constructor(public translate: TranslateService,
        private cookieService: CookieService,
        private route: ActivatedRoute, private router: Router,) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.loggedIn = this.cookieService.check('JWT');
        console.log('loggi', this.cookieService.check('JWT'));
    }

    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }

    logout() {
        this.cookieService.delete('JWT');
        this.loggedIn = false;
        this.router.navigate(['../coins'], { relativeTo: this.route.parent });
    }
}
