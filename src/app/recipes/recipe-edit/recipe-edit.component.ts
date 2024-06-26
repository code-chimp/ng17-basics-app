import { Component, inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipesService } from '../../services/recipes.service';
import { IIngredient } from '../../@interfaces/IIngredient';
import { IRecipe } from '../../@interfaces/IRecipe';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  private recipesSvc = inject(RecipesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentId: number;
  editMode = false;
  recipeForm = new FormGroup({
    name: new FormControl<string>(null, Validators.required),
    imagePath: new FormControl<string>(null, Validators.required),
    description: new FormControl<string>(null, Validators.required),
    ingredients: new FormArray([]),
  });
  currentRecipe: IRecipe;

  private newIngredientGroup(ingredient?: IIngredient) {
    return new FormGroup({
      name: new FormControl<string>(ingredient?.name, Validators.required),
      amount: new FormControl<number>(ingredient?.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }

  @Input() set id(id: string) {
    this.editMode = !!id;

    if (id) {
      this.currentId = +id;
      this.currentRecipe = { ...this.recipesSvc.getRecipe(+id) };
      const { name, imagePath, description, ingredients } = this.currentRecipe;

      for (let ingredient of ingredients) {
        this.recipeForm.controls.ingredients.push(this.newIngredientGroup(ingredient));
      }

      this.recipeForm.patchValue({
        name,
        imagePath,
        description,
      });
    }
  }

  get ingredientControls(): AbstractControl[] {
    return this.recipeForm.controls.ingredients.controls;
  }

  handleSubmit() {
    if (this.editMode) {
      this.recipesSvc.updateRecipe(this.currentId, {
        id: this.currentId,
        ...this.recipeForm.value,
      } as IRecipe);
    } else {
      this.recipesSvc.addRecipe(this.recipeForm.value as Omit<IRecipe, 'id'>);
    }

    this.handleCancel();
  }

  handleCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  handleAddIngredientClick() {
    this.recipeForm.controls.ingredients.push(this.newIngredientGroup());
  }

  handleDeleteIngredientClick(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }
}
