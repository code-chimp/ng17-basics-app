import { Component, OnInit } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import RecipeModel from '../models/recipe.model';
import { RecipesService } from '../services/recipes.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent, RouterOutlet],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  currentRecipe: RecipeModel;

  constructor(private svc: RecipesService) {}

  ngOnInit(): void {
    this.svc.recipeSelected.subscribe((recipe: RecipeModel) => {
      this.currentRecipe = recipe;
    });
  }
}
