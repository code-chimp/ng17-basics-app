import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RecipesComponent, ShoppingListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private authSvc = inject(AuthService);

  ngOnInit(): void {
    this.authSvc.autoSignIn();
  }
}
