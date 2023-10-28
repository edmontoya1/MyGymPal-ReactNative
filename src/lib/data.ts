import { IPost } from "../types/post.definition";

export const fakePostData: IPost[] = [
	{
		userUID: "jkdhfso01",
		username: "edmont",

		timestamp: Date.now().toString(),
		image:
			"file:///Users/eduardomontoya/Library/Developer/CoreSimulator/Devices/26B2ACE4-0B64-4AF2-B473-24430E7A1E35/data/Containers/Data/Application/299ADE89-0CE5-4969-8E7A-E0E38F212786/Library/Caches/ExponentExperienceData/%2540edmontoya%252FMyGymPal/ImagePicker/6FE61B07-80AD-499E-A7BD-E80D19C04184.jpg",
		comment: "comment 1",
		likeCount: 10,
		comments: ["Cool", "Nice"]
	},
	{
		userUID: "jkdhfso02",
		username: "edmont2",
		timestamp: Date.now().toString(),
		image:
			"file:///Users/eduardomontoya/Library/Developer/CoreSimulator/Devices/26B2ACE4-0B64-4AF2-B473-24430E7A1E35/data/Containers/Data/Application/299ADE89-0CE5-4969-8E7A-E0E38F212786/Library/Caches/ExponentExperienceData/%2540edmontoya%252FMyGymPal/ImagePicker/6FE61B07-80AD-499E-A7BD-E80D19C04184.jpg",

		comment: "comment 2",
		likeCount: 10,
		comments: ["Cool", "Nice"]
	},
	{
		userUID: "jkdhfso03",
		username: "edmont3",
		timestamp: Date.now().toString(),
		image:
			"file:///Users/eduardomontoya/Library/Developer/CoreSimulator/Devices/26B2ACE4-0B64-4AF2-B473-24430E7A1E35/data/Containers/Data/Application/299ADE89-0CE5-4969-8E7A-E0E38F212786/Library/Caches/ExponentExperienceData/%2540edmontoya%252FMyGymPal/ImagePicker/6FE61B07-80AD-499E-A7BD-E80D19C04184.jpg",

		comment: "comment 3",
		likeCount: 10,
		comments: ["Cool", "Nice"]
	}
];
