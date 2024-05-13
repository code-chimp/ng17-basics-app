import { Component } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import RecipeModel from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Array<RecipeModel> = [
    new RecipeModel(
      1,
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    ),
    new RecipeModel(
      2,
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    ),
  ];
}
