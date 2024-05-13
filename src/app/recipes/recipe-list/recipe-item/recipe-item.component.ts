import { Component, EventEmitter, Input, Output } from '@angular/core';
import RecipeModel from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input({ required: true }) recipe!: RecipeModel;
  @Output() recipeSelected = new EventEmitter<RecipeModel>();

  handleElementClick() {
    this.recipeSelected.emit(this.recipe);
  }
}
