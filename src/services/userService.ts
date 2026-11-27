export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}

const API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  const data: User = await response.json();

  if (!data.id) {
    throw new Error("User not found");
  }

  return data;
};