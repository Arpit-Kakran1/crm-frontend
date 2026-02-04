// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, Link } from 'react-router-dom'
// import Card from '../../components/ui/Card.jsx'
// import Input from '../../components/ui/Input.jsx'
// import Button from '../../components/ui/Button.jsx'
// import { serverUrl } from '../../utils/serverUrl.js'
// import axios from 'axios'
// export default function AdminLogin() {
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleFormData = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true)
//     try {

//       const res = await axios.post(`${serverUrl}/api/auth/login`, formData, { withCredentials: true });
//       console.log(res, "this is the login response");
//       setLoading(false)
//       navigate("/admin")
//     } catch (error) {
//       console.log(error, " Login error")
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-crm-bg flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md">
//         <div className="mb-4 text-center">
//           <div className="text-lg font-semibold text-crm-text">Admin Login</div>
//           <div className="text-sm text-crm-muted">
//             Sign in with your admin account
//           </div>
//         </div>

//         <Card className="bg-white">
//           <form className="p-6 space-y-3" onSubmit={handleLogin}>
//             <Input
//               label="Email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleFormData}
//               autoComplete="email"
//               required
//             />
//             <Input
//               label="Password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleFormData}
//               autoComplete="current-password"
//               required
//             />

//             <Button
//               type="submit"
//               variant="primary"
//               className="w-full"
//               disabled={loading}
//             >
//               {loading ? 'Signing in…' : 'Sign in'}
//             </Button>
//             <div className="text-center text-sm text-crm-muted">
//               No account register
//               <span className='text-blue-300 hover:to-blue-500 cursor-pointer px-2' onClick={() => navigate("/admin/register")}>Register</span>


//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   )
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { serverUrl } from '../../utils/serverUrl.js';

export default function AdminLogin({ setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        formData
      );

      // ✅ STORE TOKEN
      localStorage.setItem('accessToken', res.data.token);
      console.log(res);
      // ✅ SET USER (for protected routes)
      setUser(res.data.user);

      setLoading(false);

      // ✅ REDIRECT
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-crm-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold text-crm-text">Admin Login</div>
          <div className="text-sm text-crm-muted">
            Sign in with your admin account
          </div>
        </div>

        <Card className="bg-white">
          <form className="p-6 space-y-3" onSubmit={handleLogin}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormData}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormData}
              autoComplete="current-password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
