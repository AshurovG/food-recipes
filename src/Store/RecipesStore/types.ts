export type IngredientData = {
    name: string,
}

export type NutrientsData = {
    amount: number,
}

export type ReceivedRecipeData = {
    id: number;
    title: string;
    image: string;
    readyInMinutes: string;
    nutrition: {
        nutrients: NutrientsData[];
        ingredients: IngredientData[];
    };
}

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    readyInMinutes?: string;
    caloricContent?: string;
    ingredients: string
}