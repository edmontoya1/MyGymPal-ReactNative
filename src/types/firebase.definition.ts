import { FullMetadata } from "firebase/storage";

export type UploadResponse = {
	downloadUrl: string;
	metadata: FullMetadata;
};
