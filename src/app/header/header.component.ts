import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

import { DropdownDirective } from '../directives/dropdown.directive';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownDirective],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSvc = inject(AuthService);
  private dataStorageSvc = inject(DataStorageService);
  private userSub: Subscription;

  protected isAuthenticated = signal<boolean>(false);

  ngOnInit() {
    this.userSub = this.authSvc.user.subscribe(user => {
      this.isAuthenticated.set(!!user);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  handleSaveDataClick() {
    this.dataStorageSvc.storeRecipes();
  }

  handleFetchDataClick() {
    this.dataStorageSvc.fetchRecipes().subscribe();
  }

  handleLogoutClick() {
    this.authSvc.signOut();
  }
}
