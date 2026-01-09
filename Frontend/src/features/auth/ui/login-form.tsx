// auth/ui/login-form.tsx

import { login } from "../api";
import { setUser } from "../model/auth.store";

export function LoginForm() {
  const handleLogin = async () => {
    const user = await login({
      email: "test@test.com",
      password: "123456",
    });

    setUser(user);
    alert("لاگین شدی");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
