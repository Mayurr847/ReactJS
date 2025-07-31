import React from 'react'
import { Link } from 'react-router-dom'
// 2nd step
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../features/form/formSlice'; // Adjust the path as needed

const Login:React.FC = () => {
    //2nd step
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const userData = JSON.parse(storedData);
            if (userData.email === email && userData.password === password) {
                //condition matched
                dispatch(setAuthenticated(true)); // Dispatch action to set authenticated state
                navigate('/home');
            } else {
                //condition not matched
                setError('Invalid email or password');
            }
        } else {
            setError('No user data found');
        }
    };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f7f9fa" }}>
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">Login</h3>
        </div>
        <form className="card-body" onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary fw-bold">Login</button>
          </div>
          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
