export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  followers_count: number;
  following_count: number;
  photoUrl: string;
  pr_squat: number;
  pr_bench: number;
  pr_deadlift: number;
  username: string;
};
/*
const createUsers = async () => {
  for (let i = 0; i < 10; i++) {
    await addDoc(collection(db, "users"), {
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      followers_count: Math.floor(Math.random() * 100),
      following_count: Math.floor(Math.random() * 100),
      photoUrl: "http://photourl.com",
      pr_squat: Math.floor(Math.random() * 100),
      pr_bench: Math.floor(Math.random() * 100),
      pr_deadlift: Math.floor(Math.random() * 100),
      username: faker.person.fullName(),
    });
  }
};
*/
