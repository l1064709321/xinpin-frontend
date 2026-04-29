import { Link } from 'react-router-dom';
import { formatSalary, timeAgo } from '../utils/format';

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.uuid}`} className="job-card">
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-salary">{formatSalary(job.salary_min, job.salary_max, job.salary_type)}</span>
      </div>
      <div className="job-meta">
        <span>{job.city}{job.district ? `·${job.district}` : ''}</span>
        {job.experience_req && <span>{job.experience_req}</span>}
        {job.education_req && job.education_req !== 'none' && <span>{job.education_req}</span>}
      </div>
      <div className="job-card-footer">
        <div className="job-company">
          {job.logo_url && <img src={job.logo_url} alt="" className="company-logo-sm" />}
          <span>{job.company_name}</span>
          {job.company_verified && <span className="badge-verified">已认证</span>}
        </div>
        <span className="job-time">{timeAgo(job.published_at)}</span>
      </div>
      {job.is_urgent === 1 && <span className="badge-urgent">急招</span>}
      {job.welfare && (() => {
        const tags = typeof job.welfare === 'string' ? JSON.parse(job.welfare || '[]') : job.welfare;
        return tags.length > 0 ? (
          <div className="job-tags">
            {tags.slice(0, 4).map((t, i) => <span key={i} className="job-tag">{t}</span>)}
          </div>
        ) : null;
      })()}
    </Link>
  );
}
