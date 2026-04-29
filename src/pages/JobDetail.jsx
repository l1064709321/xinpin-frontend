import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobsApi, appsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { formatSalary, formatDate, JOB_STATUS } from '../utils/format';

export default function JobDetail() {
  const { uuid } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    jobsApi.detail(uuid)
      .then((res) => setJob(res.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [uuid]);

  const handleApply = async () => {
    if (!user) return navigate('/login');
    setApplying(true);
    try {
      await appsApi.apply(uuid);
      setApplied(true);
      setMsg('投递成功！');
    } catch (e) {
      setMsg(e.message || '投递失败');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="loading">加载中...</div>;
  if (!job) return <div className="empty">岗位不存在</div>;

  const welfare = typeof job.welfare === 'string' ? JSON.parse(job.welfare || '[]') : (job.welfare || []);

  return (
    <div className="detail-page">
      <div className="detail-header">
        <div className="detail-header-inner">
          <div>
            <h1>{job.title}</h1>
            <div className="detail-salary">{formatSalary(job.salary_min, job.salary_max, job.salary_type)}</div>
            <div className="detail-meta">
              <span>📍 {job.province}{job.city}{job.district}</span>
              <span>📅 {formatDate(job.published_at)}</span>
              <span>👥 {job.apply_count || 0}人投递</span>
              <span>👁 {job.view_count || 0}次浏览</span>
            </div>
          </div>
          <div className="detail-actions">
            {applied ? (
              <span className="applied-badge">✅ 已投递</span>
            ) : (
              <button className="btn btn-primary" onClick={handleApply} disabled={applying || job.status !== 'active'}>
                {applying ? '投递中...' : '立即投递'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-main">
          <section className="detail-section">
            <h3>岗位描述</h3>
            <div className="detail-text">{job.description || '暂无描述'}</div>
          </section>

          {job.requirements && (
            <section className="detail-section">
              <h3>任职要求</h3>
              <div className="detail-text">{job.requirements}</div>
            </section>
          )}

          {job.skills?.length > 0 && (
            <section className="detail-section">
              <h3>技能要求</h3>
              <div className="skill-list">
                {job.skills.map((s, i) => (
                  <span key={i} className={`skill-tag ${s.required ? 'required' : ''}`}>
                    {s.name}{s.required ? '(必须)' : ''}
                  </span>
                ))}
              </div>
            </section>
          )}

          {welfare.length > 0 && (
            <section className="detail-section">
              <h3>福利待遇</h3>
              <div className="welfare-list">
                {welfare.map((w, i) => <span key={i} className="welfare-tag">{w}</span>)}
              </div>
            </section>
          )}
        </div>

        <aside className="detail-side">
          <div className="side-card">
            <h3>公司信息</h3>
            <div className="company-info">
              {job.logo_url && <img src={job.logo_url} alt="" className="company-logo" />}
              <div>
                <h4>{job.company_name}</h4>
                {job.company_verified && <span className="badge-verified">已认证</span>}
              </div>
            </div>
            {job.company_scale && <p>规模：{job.company_scale}</p>}
            {job.company_industry && <p>行业：{job.company_industry}</p>}
            {job.company_desc && <p className="company-desc">{job.company_desc}</p>}
          </div>

          <div className="side-card">
            <h3>岗位信息</h3>
            <ul className="job-info-list">
              <li><span>招聘人数</span><span>{job.headcount || '若干'}</span></li>
              <li><span>学历要求</span><span>{job.education_req || '不限'}</span></li>
              <li><span>经验要求</span><span>{job.experience_req || '不限'}</span></li>
              {job.age_min && <li><span>年龄范围</span><span>{job.age_min}-{job.age_max}岁</span></li>}
              <li><span>薪资类型</span><span>{job.salary_type === 'monthly' ? '月薪' : job.salary_type === 'daily' ? '日薪' : '时薪'}</span></li>
              <li><span>状态</span><span>{JOB_STATUS[job.status] || job.status}</span></li>
            </ul>
          </div>

          {job.similar_jobs?.length > 0 && (
            <div className="side-card">
              <h3>相似岗位</h3>
              {job.similar_jobs.map((s) => (
                <Link key={s.uuid} to={`/jobs/${s.uuid}`} className="similar-job">
                  <span className="similar-title">{s.title}</span>
                  <span className="similar-salary">{formatSalary(s.salary_min, s.salary_max)}</span>
                  <span className="similar-city">{s.city}</span>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>

      {msg && <div className="toast">{msg}</div>}
    </div>
  );
}
