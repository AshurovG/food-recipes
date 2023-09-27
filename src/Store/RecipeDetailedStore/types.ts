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
    extendedIngredients: [{
        original: string
    }];
    equipment: [
        {
            equipment: {
                name: string
            }[],
            number: number,
            step: string
        }
    ];
} | null;

export type Params = {
    id: string;
};