// Login page component handling user authentication

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard, LoginForm } from '../components/auth/index.jsx';
import { useAuth } from "../components/auth/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formError, setFormError] = useState(null);

  const handleSubmit = async ({ email, password }) => {
    console.log("Submitting Login:", email, password);
    setFormError(null);
    const res = await auth.login({ email, password });
    if (res.ok) {
      const redirectTo = '/home';
      if (navigate) navigate(redirectTo);
      else window.location.href = redirectTo;
    } else {
      setFormError(res.message || 'Login failed');
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to continue">
      <LoginForm onSubmit={handleSubmit} loading={auth.loading} serverError={formError || auth.error} />
    </AuthCard>
  );
}

export default LoginPage;