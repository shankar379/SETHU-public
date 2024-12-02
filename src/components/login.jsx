import React, { useState } from 'react'; 
import { database } from "../firebase";
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const sanitizedEmail = email.replace('.', '_');
      const userRef = ref(database, 'users/' + sanitizedEmail);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password) {
          setIsLoggedIn(true);
          navigate(`/${sanitizedEmail}/sethu`);
        } else {
          setLoginError('Invalid password');
        }
      } else {
        setLoginError('No user found with this email');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Login failed, please try again.');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: 'url(/images/sethu3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#FFFFFF',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="p-6 sm:p-8 lg:p-10 rounded-lg shadow-2xl"
        style={{
          maxWidth: '360px', // Increased by 25px from 500px
          width: '100%',
          backgroundColor: 'rgba(240, 240, 240, 0.35)',
          borderRadius: '20px',
          border: '1px solid #333',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6" style={{ color: '#2b2b2b', letterSpacing: '1px' }}>
          Welcome Back
        </h2>
        <p className="text-center mb-4 sm:mb-6" style={{ color: '#4b4b4b' }}>Login to your account</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4 sm:mb-6">
            <label className="block font-semibold mb-2" style={{ color: '#7b7b7b' }}>Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{ backgroundColor: '#e0e0e0', color: '#333' }}
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block font-semibold mb-2" style={{ color: '#7b7b7b' }}>Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{ backgroundColor: '#e0e0e0', color: '#333' }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 sm:py-3 rounded-lg font-bold text-lg sm:text-xl hover:bg-blue-700 transition duration-300"
            style={{
              backgroundColor: '#002b36',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 43, 54, 0.4)',
            }}
          >
            Login
          </button>
        </form>
        {loginError && (
          <p className="mt-4 text-red-600 text-center">
            {loginError}
          </p>
        )}
        <p className="mt-4 sm:mt-6 text-center" style={{ color: '#5e5e5e' }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#00b3b3' }} className="font-semibold hover:text-blue-400 transition duration-200">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
