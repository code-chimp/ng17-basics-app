import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import RecipeModel from '../../models/recipe.model';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<RecipeModel> = [];
  sub: Subscription;

  constructor(
    private svc: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipes = this.svc.getRecipes();

    this.sub = this.svc.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleNewRecipeClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
