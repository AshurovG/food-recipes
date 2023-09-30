export type SentUserInfo = {
    username: string;
    fullname?: string;
    password: string;
};

export type ReceivedUserInfo = {
    username: string;
    spoonacularPassword: string;
    hash: string;
} | null;