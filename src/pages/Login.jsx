import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api';

export default function Login() {
  const [mode, setMode] = useState('sms'); // sms | password
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { smsLogin, login } = useAuth();
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
    setLoading(true);
    try {
      if (mode === 'sms') {
        await smsLogin(phone, code);
      } else {
        await login(phone, password);
      }
      navigate('/dashboard');
    } catch (e) {
      setMsg(e.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>登录信聘</h2>
        <div className="auth-tabs">
          <button className={`tab ${mode === 'sms' ? 'active' : ''}`} onClick={() => setMode('sms')}>验证码登录</button>
          <button className={`tab ${mode === 'password' ? 'active' : ''}`} onClick={() => setMode('password')}>密码登录</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>手机号</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="请输入手机号" maxLength={11} required />
          </div>

          {mode === 'sms' ? (
            <div className="form-group">
              <label>验证码</label>
              <div className="code-row">
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="6位验证码" maxLength={6} required />
                <button type="button" className="btn-code" onClick={sendCode} disabled={countdown > 0}>
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label>密码</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码" required />
            </div>
          )}

          {msg && <p className="auth-msg">{msg}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="auth-footer">
          还没有账号？<Link to="/register">立即注册</Link>
        </p>
      </div>
    </div>
  );
}
