export type Option = {
    key: string;
    value: string;
};

export type DropdownCounts = {
    [key: string]: boolean
}

export type OneDayPlan = {
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    imageType: string;
};

export type WeekPlan = {
    [key: string]: {
      meals: OneDayPlan[];
      nutrients: Nutrients;
    } | null;
  } | null;

export type Nutrients = {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
}