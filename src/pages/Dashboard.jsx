import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobsApi, appsApi, usersApi } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { formatSalary, formatDate, JOB_STATUS, APP_STATUS } from '../utils/format';

function WorkerDashboard() {
  const [apps, setApps] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      appsApi.list({ page: 1, size: 50 }).catch(() => ({ data: { list: [] } })),
      usersApi.profile().catch(() => ({ data: {} })),
    ]).then(([a, p]) => {
      setApps(a.data?.list || a.data || []);
      setProfile(p.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">加载中...</div>;

  return (
    <div className="dash-content">
      <div className="dash-header">
        <h2>🧑‍🔧 求职者工作台</h2>
        <Link to="/jobs" className="btn btn-primary">去找岗位</Link>
      </div>

      <div className="dash-stats">
        <div className="dash-stat"><span className="num">{apps.length}</span><span className="label">投递记录</span></div>
        <div className="dash-stat"><span className="num">{apps.filter(a => a.status === 'accepted').length}</span><span className="label">已通过</span></div>
        <div className="dash-stat"><span className="num">{apps.filter(a => a.status === 'pending').length}</span><span className="label">待处理</span></div>
      </div>

      <section className="dash-section">
        <h3>投递记录</h3>
        {apps.length === 0 ? (
          <div className="empty">暂无投递记录，<Link to="/jobs">去看看岗位</Link></div>
        ) : (
          <div className="app-list">
            {apps.map((a) => (
              <div key={a.uuid || a.id} className="app-item">
                <div className="app-info">
                  <h4>{a.job_title || a.title}</h4>
                  <p>{a.company_name} · {formatSalary(a.salary_min, a.salary_max)}</p>
                  <span className="app-time">{formatDate(a.created_at)}</span>
                </div>
                <span className={`status-badge status-${a.status}`}>{APP_STATUS[a.status] || a.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    jobsApi.mine()
      .then((res) => setJobs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (uuid, current) => {
    const next = current === 'active' ? 'paused' : 'active';
    try {
      await jobsApi.updateStatus(uuid, next);
      setJobs(jobs.map(j => j.uuid === uuid ? { ...j, status: next } : j));
    } catch {}
  };

  if (loading) return <div className="loading">加载中...</div>;

  return (
    <div className="dash-content">
      <div className="dash-header">
        <h2>🏭 企业工作台</h2>
        <button className="btn btn-primary" onClick={() => navigate('/jobs/new')}>发布岗位</button>
      </div>

      <div className="dash-stats">
        <div className="dash-stat"><span className="num">{jobs.length}</span><span className="label">岗位总数</span></div>
        <div className="dash-stat"><span className="num">{jobs.filter(j => j.status === 'active').length}</span><span className="label">招聘中</span></div>
        <div className="dash-stat"><span className="num">{jobs.reduce((s, j) => s + (j.apply_count || 0), 0)}</span><span className="label">收到简历</span></div>
      </div>

      <section className="dash-section">
        <h3>我发布的岗位</h3>
        {jobs.length === 0 ? (
          <div className="empty">暂无岗位，点击上方按钮发布</div>
        ) : (
          <div className="job-manage-list">
            {jobs.map((j) => (
              <div key={j.uuid} className="job-manage-item">
                <div className="jm-info">
                  <h4><Link to={`/jobs/${j.uuid}`}>{j.title}</Link></h4>
                  <p>{formatSalary(j.salary_min, j.salary_max)} · {j.apply_count || 0}人投递 · {j.view_count || 0}次浏览</p>
                </div>
                <div className="jm-actions">
                  <span className={`status-badge status-${j.status}`}>{JOB_STATUS[j.status]}</span>
                  <button className="btn-sm" onClick={() => toggleStatus(j.uuid, j.status)}>
                    {j.status === 'active' ? '暂停' : '恢复'}
                  </button>
                  <button className="btn-sm" onClick={() => navigate(`/jobs/${j.uuid}/edit`)}>编辑</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="loading">加载中...</div>;
  if (!user) { navigate('/login'); return null; }

  return (
    <div className="dashboard-page">
      {user.role === 'employer' ? <EmployerDashboard /> : <WorkerDashboard />}
    </div>
  );
}
