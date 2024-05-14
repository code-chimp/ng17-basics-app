import { Component, Input } from '@angular/core';
import RecipeModel from '../../models/recipe.model';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipesService } from '../../services/recipes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe: RecipeModel | null;
  currentId: number;

  @Input() set id(id: string) {
    this.currentId = +id;
    this.recipe = this.recipeSvc.getRecipe(+id);
  }

  constructor(
    private shoppingService: ShoppingListService,
    private recipeSvc: RecipesService,
  ) {}

  handleAddToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }
}
