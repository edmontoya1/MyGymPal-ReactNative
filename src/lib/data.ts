export type User = {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: {
    title: string;
    key_skill: string;
  };
  address: {
    city: string;
    street_name: string;
    street_address: string;
    zip_code: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  credit_card: {
    cc_number: string;
  };
  subscription: {
    plan: string;
    status: string;
    payment_method: string;
    term: string;
  };
};

export const fakeItems = [
  {
    id: 3746,
    uid: "d4f98885-b19d-4abb-802e-9a0092d87b93",
    password: "KYsZqohd9B",
    first_name: "First First",
    last_name: "First Last",
    username: "bernard.keeling",
    email: "bernard.keeling@email.com",
    avatar:
      "https://robohash.org/autessedolorem.png?size=300x300\u0026set=set1",
    gender: "Male",
    phone_number: "+82 464-220-6140",
    social_insurance_number: "447369984",
    date_of_birth: "1990-05-03",
    employment: {
      title: "Human Advertising Supervisor",
      key_skill: "Problem solving",
    },
    address: {
      city: "New Dorashire",
      street_name: "Louisa Views",
      street_address: "4345 Garret Cliff",
      zip_code: "08653-0629",
      state: "Louisiana",
      country: "United States",
      coordinates: { lat: 65.29441805642324, lng: 178.2384966279826 },
    },
    credit_card: { cc_number: "5438-2830-3191-0592" },
    subscription: {
      plan: "Platinum",
      status: "Blocked",
      payment_method: "Cheque",
      term: "Monthly",
    },
  },
  {
    id: 3747,
    uid: "d4f98885-b19d-4abb-802e-9a0092d87b93",
    password: "KYsZqohd9B",
    first_name: "Second First",
    last_name: "Second Last",
    username: "bernard.keeling",
    email: "bernard.keeling@email.com",
    avatar:
      "https://robohash.org/autessedolorem.png?size=300x300\u0026set=set1",
    gender: "Male",
    phone_number: "+82 464-220-6140",
    social_insurance_number: "447369984",
    date_of_birth: "1990-05-03",
    employment: {
      title: "Human Advertising Supervisor",
      key_skill: "Problem solving",
    },
    address: {
      city: "New Dorashire",
      street_name: "Louisa Views",
      street_address: "4345 Garret Cliff",
      zip_code: "08653-0629",
      state: "Louisiana",
      country: "United States",
      coordinates: { lat: 65.29441805642324, lng: 178.2384966279826 },
    },
    credit_card: { cc_number: "5438-2830-3191-0592" },
    subscription: {
      plan: "Platinum",
      status: "Blocked",
      payment_method: "Cheque",
      term: "Monthly",
    },
  },
  {
    id: 3748,
    uid: "d4f98885-b19d-4abb-802e-9a0092d87b93",
    password: "KYsZqohd9B",
    first_name: "Third First",
    last_name: "Third Last",
    username: "bernard.keeling",
    email: "bernard.keeling@email.com",
    avatar:
      "https://robohash.org/autessedolorem.png?size=300x300\u0026set=set1",
    gender: "Male",
    phone_number: "+82 464-220-6140",
    social_insurance_number: "447369984",
    date_of_birth: "1990-05-03",
    employment: {
      title: "Human Advertising Supervisor",
      key_skill: "Problem solving",
    },
    address: {
      city: "New Dorashire",
      street_name: "Louisa Views",
      street_address: "4345 Garret Cliff",
      zip_code: "08653-0629",
      state: "Louisiana",
      country: "United States",
      coordinates: { lat: 65.29441805642324, lng: 178.2384966279826 },
    },
    credit_card: { cc_number: "5438-2830-3191-0592" },
    subscription: {
      plan: "Platinum",
      status: "Blocked",
      payment_method: "Cheque",
      term: "Monthly",
    },
  },
  {
    id: 1,
    uid: "d4f98885-b19d-4abb-802e-9a0092d87b93",
    password: "KYsZqohd9B",
    first_name: "Fourth First",
    last_name: "Fourth Last",
    username: "bernard.keeling",
    email: "bernard.keeling@email.com",
    avatar:
      "https://robohash.org/autessedolorem.png?size=300x300\u0026set=set1",
    gender: "Male",
    phone_number: "+82 464-220-6140",
    social_insurance_number: "447369984",
    date_of_birth: "1990-05-03",
    employment: {
      title: "Human Advertising Supervisor",
      key_skill: "Problem solving",
    },
    address: {
      city: "New Dorashire",
      street_name: "Louisa Views",
      street_address: "4345 Garret Cliff",
      zip_code: "08653-0629",
      state: "Louisiana",
      country: "United States",
      coordinates: { lat: 65.29441805642324, lng: 178.2384966279826 },
    },
    credit_card: { cc_number: "5438-2830-3191-0592" },
    subscription: {
      plan: "Platinum",
      status: "Blocked",
      payment_method: "Cheque",
      term: "Monthly",
    },
  },
  {
    id: 2,
    uid: "d4f98885-b19d-4abb-802e-9a0092d87b93",
    password: "KYsZqohd9B",
    first_name: "Fith First",
    last_name: "Fith Last",
    username: "bernard.keeling",
    email: "bernard.keeling@email.com",
    avatar:
      "https://robohash.org/autessedolorem.png?size=300x300\u0026set=set1",
    gender: "Male",
    phone_number: "+82 464-220-6140",
    social_insurance_number: "447369984",
    date_of_birth: "1990-05-03",
    employment: {
      title: "Human Advertising Supervisor",
      key_skill: "Problem solving",
    },
    address: {
      city: "New Dorashire",
      street_name: "Louisa Views",
      street_address: "4345 Garret Cliff",
      zip_code: "08653-0629",
      state: "Louisiana",
      country: "United States",
      coordinates: { lat: 65.29441805642324, lng: 178.2384966279826 },
    },
    credit_card: { cc_number: "5438-2830-3191-0592" },
    subscription: {
      plan: "Platinum",
      status: "Blocked",
      payment_method: "Cheque",
      term: "Monthly",
    },
  },
];
