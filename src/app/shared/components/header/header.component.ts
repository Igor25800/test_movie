import {Component, DestroyRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  activeRouteName!: string;

  constructor(
    private router: Router,
    private destroyRef: DestroyRef,
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.activeRouteName = this.getCurrentRouteName();
    });
  }

  getCurrentRouteName(): string {
    const currentUrl = this.router.url;
    const routeParts = currentUrl.split('/');
    const routeName = routeParts[routeParts.length - 1];
    return routeName;
  }

  navigateHome(): void {
    this.router.navigate(['home'])
  }

  navigate(event: string): void {
    this.router.navigate([event]);
  }
}
