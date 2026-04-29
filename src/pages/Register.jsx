import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api';

export default function Register() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get('role') || 'worker');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { register } = useAuth();
  const navigate = useNavigate();

  const sendCode = async () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) return setMsg('请输入正确的手机号');
    try {
      setMsg('');
      await authApi.sendCode(phone);
      setMsg('验证码已发送');
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((c) => { if (c <= 1) { clearInterval(timer); return 0; } return c - 1; });
      }, 1000);
    } catch (e) {
      setMsg(e.message || '发送失败');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (password !== confirm) return setMsg('两次密码不一致');
    if (password.length < 6) return setMsg('密码至少6位');
    setLoading(true);
    try {
      await register({ phone, password, role, code });
      navigate('/dashboard');
    } catch (e) {
      setMsg(e.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>注册信聘</h2>

        <div className="role-select">
          <button className={`role-btn ${role === 'worker' ? 'active' : ''}`} onClick={() => setRole('worker')}>
            🧑‍🔧 我是求职者
          </button>
          <button className={`role-btn ${role === 'employer' ? 'active' : ''}`} onClick={() => setRole('employer')}>
            🏭 我是企业
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>手机号</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="请输入手机号" maxLength={11} required />
          </div>

          <div className="form-group">
            <label>验证码</label>
            <div className="code-row">
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="6位验证码" maxLength={6} required />
              <button type="button" className="btn-code" onClick={sendCode} disabled={countdown > 0}>
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>密码</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="至少6位" required />
          </div>

          <div className="form-group">
            <label>确认密码</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="再次输入密码" required />
          </div>

          {msg && <p className="auth-msg">{msg}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? '注册中...' : '注册'}
          </button>
        </form>

        <p className="auth-footer">
          已有账号？<Link to="/login">立即登录</Link>
        </p>
      </div>
    </div>
  );
}
