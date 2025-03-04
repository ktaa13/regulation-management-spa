import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:8080/perform_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username,
        password
      }),
      credentials: 'include'  // 🔥 Important for session authentication!
    });
  
    if (response.ok) {
      localStorage.setItem('token', 'authenticated'); 
      navigate('/');  
    } else {
      setError('خطأ في اسم المستخدم أو كلمة المرور');

      console.log(response.status)

    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center">تسجيل الدخول</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <label>اسم المستخدم:</label>
          <input 
            type="text" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>كلمة المرور:</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">دخول</button>
      </form>
    </div>
  );
};

export default LoginPage;
