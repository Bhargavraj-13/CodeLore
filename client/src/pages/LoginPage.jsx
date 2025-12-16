// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard, LoginForm } from '../components/auth/index.js';
import useAuth from '../hooks/useAuth.js';

function LoginPage() {
  const navigate = typeof useNavigate === 'function' ? useNavigate() : null;
  const auth = useAuth();
  const [formError, setFormError] = useState(null);

  const handleSubmit = async ({ email, password }) => {
    setFormError(null);
    const res = await auth.login({ email, password });
    if (res.ok) {
      const redirectTo = '/';
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