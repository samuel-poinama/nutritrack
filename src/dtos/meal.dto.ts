import { Meal } from "../models/user.model";

export class MealDto {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    date: string;


    constructor(meal: Meal) {
        this.name = meal.name;
        this.calories = meal.calories;
        this.protein = meal.protein;
        this.fat = meal.fat;
        this.date = meal.date.toDateString();
    }
}