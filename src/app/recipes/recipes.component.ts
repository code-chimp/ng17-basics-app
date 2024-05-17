import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent, RouterOutlet],
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {}
