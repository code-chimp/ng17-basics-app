import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IRecipe } from '../@interfaces/IRecipe';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged = new Subject<IRecipe[]>();

  private recipes: IRecipe[] = [
    {
      id: 1,
      name: 'Tasty Schnitzel',
      description: 'A super tasty schnitzel - Just awesome!',
      imagePath:
        'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/05/thumb-1200x675.jpg',
      ingredients: [
        { name: 'Pork Cutlet', amount: 1 },
        { name: 'Pommes Frites', amount: 20 },
      ],
    },
    {
      id: 2,
      name: 'Big Fat Burger',
      description: 'What else needs be said?',
      imagePath: 'https://www.fatbrands.com/wp-content/uploads/2023/03/fatburger-listing.jpg',
      ingredients: [
        { name: 'Buns', amount: 2 },
        { name: 'Meat', amount: 3 },
        { name: 'Cheese', amount: 3 },
      ],
    },
  ];

  getRecipes(): IRecipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): IRecipe | null {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Omit<IRecipe, 'id'>) {
    const id = Math.max(...this.recipes.map(r => r.id)) + 1;

    this.recipes.push({ id, ...recipe });

    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: IRecipe) {
    const index = this.recipes.findIndex(r => r.id === id);
    this.recipes[index] = { ...recipe };

    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(r => r.id === id);
    this.recipes.splice(index, 1);

    this.recipesChanged.next(this.recipes.slice());
  }
}
