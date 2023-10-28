export interface IPost {
	userUID: string;
	username: string;
	timestamp: string;
	image: string;
	comment: string;
	likeCount: number;
	comments: string[];
}
