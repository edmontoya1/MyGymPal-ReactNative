export type IUser = {
	userUID: string;
	email: string;
	firstName: string;
	lastName: string;
	followers_count: number;
	following_count: number;
	pr_squat: number;
	pr_bench: number;
	pr_deadlift: number;
	username: string;
	password: string | undefined;
	token: string | undefined;
	profileImageDownloadUrl: string;
};

export type UserSignUp = {
	email: string;
	password: string;
	profileImageUri: string;
	profileImageDownloadUrl: string;
	firstName: string;
	lastName: string;
	userName: string;
};

export type UserAuth = {
	email: string;
	password: string;
};
