interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const signInUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};