import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#cce2fe]">
      {/* Header */}
      <div className="bg-[#cce2fe] border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <span className="text-[#4287f5] text-xl font-bold">CardSetHub</span>
            </Link>
            <nav className="flex space-x-2">
              <Link to="/set-search">
                <Button variant="ghost" className="text-gray-800 hover:bg-blue-100">
                  SETS
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#4287f5] p-3 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Please login to your account' : 'Please fill in your information'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-50 border-gray-300 focus:ring-[#4287f5] focus:border-[#4287f5]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-gray-50 border-gray-300 focus:ring-[#4287f5] focus:border-[#4287f5]"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-gray-50 border-gray-300 focus:ring-[#4287f5] focus:border-[#4287f5]"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-[#4287f5] hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#4287f5] hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#4287f5] hover:underline text-sm"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth; 