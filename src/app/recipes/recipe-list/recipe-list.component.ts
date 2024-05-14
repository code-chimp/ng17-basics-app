import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import RecipeModel from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Array<RecipeModel> = [];

  constructor(
    private svc: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipes = this.svc.getRecipes();
  }

  handleNewRecipeClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
