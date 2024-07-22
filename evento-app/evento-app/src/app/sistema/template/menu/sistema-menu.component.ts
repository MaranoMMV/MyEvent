import { ChangeDetectorRef, Component, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sistema-menu',
  standalone: true,
  imports: [RouterModule,HttpClientModule,RouterOutlet ,MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './sistema-menu.component.html',
  styleUrl: './sistema-menu.component.scss',
})
export class SistemaMenuComponent {
  mobileQuery: MediaQueryList;
  isBrowser: boolean;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun(): boolean {
    return this.isBrowser && /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  }

  navigateVendedores(){
    this.router.navigate(['/sistema/vendedores']);
  }

  sair(){
    sessionStorage.removeItem("auth_token");
    sessionStorage.setItem("auth_token", "null");
    this.router.navigate(['']);
  }
}
