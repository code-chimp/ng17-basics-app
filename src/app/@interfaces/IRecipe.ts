import { IIngredient } from './IIngredient';

export interface IRecipe {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: IIngredient[];
}
