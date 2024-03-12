export async function login(baseUrl, username, password) {
  const url = `http://localhost:8000/token`;
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const response = await fetch(url, {
    method: "post",
    credentials: "include",
    body: form,
  });
  if (!response.ok) {
    throw Error("Failed to get token after login");
  }
  const data = await response.json();
  if (data.access_token) {
    return data.access_token;
  } else {
    throw Error("Failed to get token after login.");
  }
}

export async function register(accountData) {
//   const baseUrl = process.env.REACT_APP_USER_SERVICE_API_HOST;
//   if (!baseUrl) {
//     throw Error("REACT_APP_USER_SERVICE_API_HOST is not set");
//   }
  const response = await fetch(
    `http://localhost:8000/api/accounts`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(accountData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw Error(
      "Couldn't create account, please try a new username or email address"
    );
  }
  else {
      console.log('account created')
  }
}
