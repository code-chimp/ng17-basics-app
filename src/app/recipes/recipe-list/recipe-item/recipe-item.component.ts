import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import RecipeModel from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  @Input({ required: true }) recipe!: RecipeModel;

  constructor() {}
}
