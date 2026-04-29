import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-badge"><span className="dot"></span> 高信任度蓝领招聘平台</div>
        <h1>
          让每个蓝领工作者<br/>
          都能找到<span className="highlight">值得信赖</span>的工作
        </h1>
        <p className="hero-sub">
          信聘通过多重认证、智能匹配和信用评价体系，构建安全可靠、高效便捷的蓝领就业生态。
        </p>
        <div className="hero-actions">
          <Link to="/jobs" className="btn btn-primary">🔍 找岗位</Link>
          <Link to="/register" className="btn btn-outline">🏭 企业入驻</Link>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat"><div className="stat-num">4亿+</div><div className="stat-label">蓝领工人总量</div></div>
          <div className="stat"><div className="stat-num">500亿</div><div className="stat-label">年市场规模</div></div>
          <div className="stat"><div className="stat-num">30%+</div><div className="stat-label">年均流动率</div></div>
          <div className="stat"><div className="stat-num">&lt;20%</div><div className="stat-label">数字化渗透率</div></div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="section painpoints" id="painpoints">
        <div className="section-header fade-in">
          <div className="section-tag">行业痛点</div>
          <h2 className="section-title">传统蓝领招聘的四大困境</h2>
          <p className="section-desc">信息不对称、信任缺失、效率低下、服务断层，严重制约劳动力市场健康发展</p>
        </div>
        <div className="pain-grid fade-in">
          <div className="pain-card"><div className="pain-icon red">🚫</div><div><h3>虚假招聘信息泛滥</h3><p>薪资不符、岗位描述造假、黑中介横行，求职者难以辨别信息真伪。</p></div></div>
          <div className="pain-card"><div className="pain-icon yellow">🔍</div><div><h3>人岗匹配效率低下</h3><p>传统关键词匹配精度低，求职者投递大量简历石沉大海。</p></div></div>
          <div className="pain-card"><div className="pain-icon blue">📋</div><div><h3>缺乏信用评价体系</h3><p>企业和求职者双方信息不透明，无有效信用记录。</p></div></div>
          <div className="pain-card"><div className="pain-icon purple">🔗</div><div><h3>服务链条断裂</h3><p>招聘、入职、培训、权益保障各自为政，缺乏全流程支持。</p></div></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-header fade-in">
          <div className="section-tag">核心功能</div>
          <h2 className="section-title">六大核心能力，重新定义蓝领招聘</h2>
        </div>
        <div className="features-grid fade-in">
          <div className="feature-card"><div className="feature-icon">🛡️</div><h3>企业资质认证</h3><p>营业执照验证 + 实地考察 + 薪资发放记录追踪，三重保障。</p></div>
          <div className="feature-card"><div className="feature-icon">🤖</div><h3>AI 智能匹配</h3><p>基于技能、地理位置、薪资期望等多维度分析，精准人岗匹配。</p></div>
          <div className="feature-card"><div className="feature-icon">⭐</div><h3>双向信用评价</h3><p>企业与求职者互评、动态信用评级，构建透明可信就业生态。</p></div>
          <div className="feature-card"><div className="feature-icon">📊</div><h3>数据分析平台</h3><p>行业薪资报告、招聘效果分析、员工稳定性预测。</p></div>
          <div className="feature-card"><div className="feature-icon">🎓</div><h3>职业技能培训</h3><p>技能评估、在线培训、职业规划咨询，提升竞争力。</p></div>
          <div className="feature-card"><div className="feature-icon">⚖️</div><h3>权益保障服务</h3><p>法律咨询、纠纷调解、劳动权益保护，坚实保护伞。</p></div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>让信任成为蓝领就业的基石</h2>
        <p>加入信聘，和我们一起打造中国最值得信赖的蓝领招聘平台</p>
        <div className="cta-actions">
          <Link to="/register?role=worker" className="btn btn-white">🧑‍🔧 我要找工作</Link>
          <Link to="/register?role=employer" className="btn btn-ghost">🏭 企业入驻合作</Link>
        </div>
      </section>
    </>
  );
}
