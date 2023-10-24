export type IUser = {
	userUID: string;
	email: string;
	firstName: string;
	lastName: string;
	followers_count: number;
	following_count: number;
	photoUri: string;
	pr_squat: number;
	pr_bench: number;
	pr_deadlift: number;
	username: string;
	password: string | undefined;
	token: string | undefined;
};
