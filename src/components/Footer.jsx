import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>信聘</h3>
          <p>高信任度蓝领招聘平台，<br/>让每个蓝领工作者都能找到值得信赖的工作。</p>
        </div>
        <div className="footer-col">
          <h4>产品</h4>
          <Link to="/jobs">求职者端</Link>
          <Link to="/register">企业入驻</Link>
          <Link to="/about">信用体系</Link>
          <Link to="/about">智能匹配</Link>
        </div>
        <div className="footer-col">
          <h4>支持</h4>
          <Link to="/about">帮助中心</Link>
          <Link to="/about">法律咨询</Link>
          <Link to="/about">权益保障</Link>
          <Link to="/about">联系我们</Link>
        </div>
        <div className="footer-col">
          <h4>关于</h4>
          <Link to="/about">关于我们</Link>
          <Link to="/about">加入团队</Link>
          <Link to="/about">隐私政策</Link>
          <Link to="/about">用户协议</Link>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 信聘 XinPin. All rights reserved.
      </div>
    </footer>
  );
}
