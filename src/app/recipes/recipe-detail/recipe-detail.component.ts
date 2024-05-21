import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { DropdownDirective } from '../../directives/dropdown.directive';
import { RecipesService } from '../../services/recipes.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { IRecipe } from '../../@interfaces/IRecipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink, DropdownDirective],
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  private recipeSvc = inject(RecipesService);
  private shoppingSvc = inject(ShoppingListService);
  private router = inject(Router);

  recipe: IRecipe | null;
  currentId: number;

  @Input() set id(id: string) {
    this.currentId = +id;
    this.recipe = this.recipeSvc.getRecipe(+id);
  }

  handleAddToShoppingList() {
    this.shoppingSvc.addIngredients(this.recipe.ingredients);
  }

  handleDelete() {
    this.recipeSvc.deleteRecipe(this.currentId);
    this.router.navigate(['/recipes']);
  }
}
