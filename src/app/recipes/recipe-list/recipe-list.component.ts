import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipesService } from '../../services/recipes.service';
import { IRecipe } from '../../@interfaces/IRecipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipesSvc = inject(RecipesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  recipes = signal<IRecipe[]>([]);
  recipesChangedSub: Subscription;

  ngOnInit(): void {
    this.recipes.set(this.recipesSvc.getRecipes());

    this.recipesChangedSub = this.recipesSvc.recipesChanged.subscribe(recipes => {
      this.recipes.set(recipes);
    });
  }

  ngOnDestroy() {
    this.recipesChangedSub.unsubscribe();
  }

  handleNewRecipeClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
