import IngredientModel from './ingredient.model';

export default class RecipeModel {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Array<IngredientModel>;

  constructor(
    id: number,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Array<IngredientModel> = [],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
