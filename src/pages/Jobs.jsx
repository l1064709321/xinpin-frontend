import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jobsApi } from '../api';
import JobCard from '../components/JobCard';

const CITIES = ['全部', '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '苏州', '东莞', '佛山'];
const CATEGORIES = ['全部', '制造业', '建筑业', '服务业', '物流', '餐饮', '家政', '零售', '技术工种'];
const SORTS = [
  { value: '', label: '默认排序' },
  { value: 'salary_desc', label: '薪资从高到低' },
  { value: 'salary_asc', label: '薪资从低到高' },
];

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [city, setCity] = useState(searchParams.get('city') || '全部');
  const [category, setCategory] = useState(searchParams.get('category') || '全部');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = { page, size: 20 };
      const sq = searchParams.get('q');
      const sc = searchParams.get('city');
      const scat = searchParams.get('category');
      const ss = searchParams.get('sort');
      if (sq) params.q = sq;
      if (sc && sc !== '全部') params.city = sc;
      if (scat && scat !== '全部') params.category = scat;
      if (ss) params.sort = ss;

      const res = sq ? await jobsApi.search(params) : await jobsApi.list(params);
      setJobs(res.data.list || []);
      setTotal(res.data.pagination?.total || 0);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const doSearch = (e) => {
    e.preventDefault();
    const p = {};
    if (q) p.q = q;
    if (city !== '全部') p.city = city;
    if (category !== '全部') p.category = category;
    if (sort) p.sort = sort;
    p.page = '1';
    setSearchParams(p);
  };

  const changePage = (p) => {
    const params = Object.fromEntries(searchParams);
    params.page = String(p);
    setSearchParams(params);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="jobs-page">
      <div className="jobs-hero">
        <h1>找岗位</h1>
        <p>海量真实认证岗位，智能匹配你的技能</p>
        <form className="search-bar" onSubmit={doSearch}>
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索岗位名称、关键词..." />
          <button type="submit" className="btn btn-primary">搜索</button>
        </form>
      </div>

      <div className="jobs-content">
        <aside className="jobs-filters">
          <h3>筛选</h3>
          <div className="filter-group">
            <label>城市</label>
            <div className="filter-options">
              {CITIES.map((c) => (
                <button key={c} className={`filter-btn ${city === c ? 'active' : ''}`}
                  onClick={() => { setCity(c); setSearchParams({ ...Object.fromEntries(searchParams), city: c, page: '1' }); }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>行业</label>
            <div className="filter-options">
              {CATEGORIES.map((c) => (
                <button key={c} className={`filter-btn ${category === c ? 'active' : ''}`}
                  onClick={() => { setCategory(c); setSearchParams({ ...Object.fromEntries(searchParams), category: c, page: '1' }); }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>排序</label>
            <select value={sort} onChange={(e) => { setSort(e.target.value); setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value, page: '1' }); }}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </aside>

        <main className="jobs-list">
          {loading ? (
            <div className="loading">加载中...</div>
          ) : jobs.length === 0 ? (
            <div className="empty">暂无岗位，换个关键词试试</div>
          ) : (
            <>
              <p className="jobs-count">共 {total} 个岗位</p>
              <div className="jobs-grid">
                {jobs.map((j) => <JobCard key={j.uuid} job={j} />)}
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={page <= 1} onClick={() => changePage(page - 1)}>上一页</button>
                  <span>{page} / {totalPages}</span>
                  <button disabled={page >= totalPages} onClick={() => changePage(page + 1)}>下一页</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
