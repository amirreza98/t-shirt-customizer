type LoginPayload = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
};

// fake API، بعداً به backend واقعی وصل می‌کنیم
export async function login(payload: LoginPayload): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: "1", email: payload.email });
    }, 500);
  });
}
