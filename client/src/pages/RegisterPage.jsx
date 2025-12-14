// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard, RegisterForm } from '../components/auth/index.js';
import useAuth from '../hooks/useAuth.js';

function RegisterPage() {
  const navigate = typeof useNavigate === 'function' ? useNavigate() : null;
  const auth = useAuth();
  const [formError, setFormError] = useState(null);

  const handleSubmit = async ({ username, email, password }) => {
    setFormError(null);
    const res = await auth.register({ username, email, password });
    if (res.ok) {
      const redirectTo = '/';
      if (navigate) navigate(redirectTo);
      else window.location.href = redirectTo;
    } else {
      setFormError(res.message || 'Registration failed');
    }
  };

  return (
    <AuthCard title="Create account" subtitle="Start learning and teaching">
      <RegisterForm onSubmit={handleSubmit} loading={auth.loading} serverError={formError || auth.error} />
    </AuthCard>
  );
}

export default RegisterPage;