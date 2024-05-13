import { Component } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import RecipeModel from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  currentRecipe: RecipeModel;

  handleRecipeSelected(recipe: RecipeModel) {
    this.currentRecipe = recipe;
  }
}
