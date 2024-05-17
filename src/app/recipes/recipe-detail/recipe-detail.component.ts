import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import RecipeModel from '../../models/recipe.model';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { RecipesService } from '../../services/recipes.service';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective, RouterLink],
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  recipe: RecipeModel | null;
  currentId: number;

  @Input() set id(id: string) {
    this.currentId = +id;
    this.recipe = this.recipeSvc.getRecipe(+id);
  }

  constructor(
    private shoppingSvc: ShoppingListService,
    private recipeSvc: RecipesService,
    private router: Router,
  ) {}

  handleAddToShoppingList() {
    this.shoppingSvc.addIngredients(this.recipe.ingredients);
  }

  handleDelete() {
    this.recipeSvc.deleteRecipe(this.currentId);
    this.router.navigate(['/recipes']);
  }
}
