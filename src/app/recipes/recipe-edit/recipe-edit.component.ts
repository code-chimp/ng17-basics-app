import { Component, Input } from '@angular/core';
import RecipeModel from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  currentId: number | null;
  currentRecipe: RecipeModel | null;
  mode = 'unknown';

  constructor(private recipeSvc: RecipesService) {}

  @Input() set id(id: string) {
    this.mode = id ? 'edit' : 'new';
    if (id) {
      this.currentId = +id;
      this.currentRecipe = { ...this.recipeSvc.getRecipe(+id) };
    }
  }
}
