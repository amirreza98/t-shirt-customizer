export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
};

export async function login(payload: LoginPayload): Promise<User> {
  // فعلاً فیک، بعداً وصلش می‌کنیم به بک‌اند
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        email: payload.email,
      });
    }, 500);
  });
}
