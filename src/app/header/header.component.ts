import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DropdownDirective } from '../directives/dropdown.directive';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownDirective],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private dataStorageSvc = inject(DataStorageService);

  handleSaveDataClick() {
    this.dataStorageSvc.storeRecipes();
  }

  handleFetchDataClick() {
    this.dataStorageSvc.fetchRecipes().subscribe();
  }
}
