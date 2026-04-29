import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../api';

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', category: '制造业', industry: '', description: '', requirements: '',
    salary_type: 'monthly', salary_min: '', salary_max: '',
    province: '', city: '', district: '', address: '',
    headcount: 1, education_req: 'none', experience_req: '',
    age_min: '', age_max: '', welfare: '', contact_name: '', contact_phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const set = (k, v) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const data = {
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        headcount: Number(form.headcount) || 1,
        age_min: form.age_min ? Number(form.age_min) : null,
        age_max: form.age_max ? Number(form.age_max) : null,
        welfare: form.welfare ? form.welfare.split(',').map(s => s.trim()).filter(Boolean) : [],
      };
      const res = await jobsApi.create(data);
      setMsg('创建成功！');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (e) {
      setMsg(e.message || '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h2>发布岗位</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-row">
          <div className="form-group"><label>岗位名称 *</label><input value={form.title} onChange={e => set('title', e.target.value)} required /></div>
          <div className="form-group">
            <label>行业分类 *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}>
              {['制造业', '建筑业', '服务业', '物流', '餐饮', '家政', '零售', '技术工种'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group"><label>具体行业</label><input value={form.industry} onChange={e => set('industry', e.target.value)} placeholder="如：电子制造、餐饮连锁" /></div>

        <div className="form-group"><label>岗位描述 *</label><textarea rows={6} value={form.description} onChange={e => set('description', e.target.value)} required placeholder="详细描述工作内容、环境、福利等" /></div>
        <div className="form-group"><label>任职要求</label><textarea rows={4} value={form.requirements} onChange={e => set('requirements', e.target.value)} placeholder="学历、技能、经验等要求" /></div>

        <div className="form-row">
          <div className="form-group">
            <label>薪资类型</label>
            <select value={form.salary_type} onChange={e => set('salary_type', e.target.value)}>
              <option value="monthly">月薪</option>
              <option value="daily">日薪</option>
              <option value="hourly">时薪</option>
            </select>
          </div>
          <div className="form-group"><label>最低薪资</label><input type="number" value={form.salary_min} onChange={e => set('salary_min', e.target.value)} /></div>
          <div className="form-group"><label>最高薪资</label><input type="number" value={form.salary_max} onChange={e => set('salary_max', e.target.value)} /></div>
        </div>

        <div className="form-row">
          <div className="form-group"><label>省</label><input value={form.province} onChange={e => set('province', e.target.value)} placeholder="如：广东" /></div>
          <div className="form-group"><label>市</label><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="如：深圳" /></div>
          <div className="form-group"><label>区</label><input value={form.district} onChange={e => set('district', e.target.value)} placeholder="如：宝安区" /></div>
        </div>

        <div className="form-group"><label>详细地址</label><input value={form.address} onChange={e => set('address', e.target.value)} placeholder="具体街道门牌号" /></div>

        <div className="form-row">
          <div className="form-group"><label>招聘人数</label><input type="number" value={form.headcount} onChange={e => set('headcount', e.target.value)} /></div>
          <div className="form-group">
            <label>学历要求</label>
            <select value={form.education_req} onChange={e => set('education_req', e.target.value)}>
              {['none', '初中', '高中', '中专', '大专', '本科'].map(c => <option key={c} value={c}>{c === 'none' ? '不限' : c}</option>)}
            </select>
          </div>
          <div className="form-group"><label>经验要求</label><input value={form.experience_req} onChange={e => set('experience_req', e.target.value)} placeholder="如：1-3年" /></div>
        </div>

        <div className="form-row">
          <div className="form-group"><label>最小年龄</label><input type="number" value={form.age_min} onChange={e => set('age_min', e.target.value)} /></div>
          <div className="form-group"><label>最大年龄</label><input type="number" value={form.age_max} onChange={e => set('age_max', e.target.value)} /></div>
        </div>

        <div className="form-group"><label>福利标签</label><input value={form.welfare} onChange={e => set('welfare', e.target.value)} placeholder="用逗号分隔，如：包吃,包住,五险一金" /></div>

        <div className="form-row">
          <div className="form-group"><label>联系人</label><input value={form.contact_name} onChange={e => set('contact_name', e.target.value)} /></div>
          <div className="form-group"><label>联系电话</label><input value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} /></div>
        </div>

        {msg && <p className="auth-msg">{msg}</p>}

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? '提交中...' : '发布岗位'}
        </button>
      </form>
    </div>
  );
}
