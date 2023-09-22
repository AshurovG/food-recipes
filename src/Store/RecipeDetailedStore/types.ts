export type RecipeData = {
    id: number;
    preparationMinutes: string;
    cookingMinutes: string;
    image: string;
    aggregateLikes: string;
    readyMinutes: string;
    servings: string;
    title: string;
    summary: string | TrustedHTML;
    extendedIngredients: [];
    equipment: [];
} | null;

export type Params = {
    id: string;
};