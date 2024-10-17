import { BrowserAnimationsModuleConfig } from '@angular/platform-browser/animations';
import { __importStar } from 'tslib';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BetForecast';


  isLoginOrLogoutOrRegisterRoute = false;

  static API_URL = "http://localhost:8080";

  constructor(private translate: TranslateService, private router: Router, private renderer: Renderer2 // Inject Renderer2 here
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      this.isLoginOrLogoutOrRegisterRoute = currentRoute === '/login' || currentRoute === '/logout' || currentRoute === '/register' || currentRoute.startsWith("/verify-otp")
        || currentRoute.startsWith("/forgot-password") || currentRoute.startsWith("/forgot-otp-verify") || currentRoute.startsWith("/change-password");
    });
  }
  ngAfterViewInit() {
    this.adjustFooter();
  }

  adjustFooter() {
    setTimeout(() => {
      const footer = document.querySelector('app-footer');
      const content = document.querySelector('.content');
      if (footer && content) {
        if (content.clientHeight < window.innerHeight) {
          this.renderer.addClass(footer, 'static-footer');
        } else {
          this.renderer.removeClass(footer, 'static-footer');
        }
      }
    }, 0);
  }

  showDashboard: boolean = false;

  toggleDashboard() {
    this.showDashboard = !this.showDashboard;
  }
}
