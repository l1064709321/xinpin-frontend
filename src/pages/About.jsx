export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>关于信聘</h1>
        <p>让每个蓝领工作者都能找到值得信赖的工作</p>
      </section>

      <section className="about-content">
        <div className="about-block">
          <h2>我们的使命</h2>
          <p>
            信聘是一个专注于高信任度的蓝领招聘服务平台，致力于通过技术创新和模式创新，
            构建一个安全可靠、高效便捷的蓝领就业生态体系。平台以"让每个蓝领工作者都能找到值得信赖的工作"为使命，
            通过多重认证、智能匹配、信用评价等核心功能，打造蓝领招聘领域的信任标杆。
          </p>
        </div>

        <div className="about-block">
          <h2>核心价值</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🛡️ 高信任度保障</h3>
              <p>企业资质认证、岗位真实性验证、用户信用评价等多重机制，构建完善的信任体系。</p>
            </div>
            <div className="value-card">
              <h3>🤖 精准匹配服务</h3>
              <p>基于大数据分析和人工智能算法，实现求职者与岗位的智能匹配。</p>
            </div>
            <div className="value-card">
              <h3>📋 全流程服务</h3>
              <p>从求职咨询、岗位推荐、面试安排到入职跟踪的一站式服务。</p>
            </div>
            <div className="value-card">
              <h3>⚖️ 权益保障机制</h3>
              <p>完善的劳动权益保护体系，提供法律咨询和纠纷调解服务。</p>
            </div>
          </div>
        </div>

        <div className="about-block">
          <h2>发展目标</h2>
          <div className="goals">
            <div className="goal">
              <span className="goal-num">100万</span>
              <span className="goal-desc">1-2年注册用户</span>
            </div>
            <div className="goal">
              <span className="goal-num">5000家</span>
              <span className="goal-desc">1-2年合作企业</span>
            </div>
            <div className="goal">
              <span className="goal-num">500万</span>
              <span className="goal-desc">3-5年注册用户</span>
            </div>
            <div className="goal">
              <span className="goal-num">1亿+</span>
              <span className="goal-desc">长期服务蓝领工作者</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
