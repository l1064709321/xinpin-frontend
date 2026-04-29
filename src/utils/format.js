import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export const timeAgo = (d) => (d ? dayjs(d).fromNow() : '');
export const formatDate = (d) => (d ? dayjs(d).format('YYYY-MM-DD') : '');
export const formatSalary = (min, max, type = 'monthly') => {
  const unit = type === 'daily' ? '/天' : type === 'hourly' ? '/时' : '/月';
  if (!min && !max) return '面议';
  if (min === max) return `${min}${unit}`;
  return `${min}-${max}${unit}`;
};

export const ROLES = { worker: '求职者', employer: '企业用户', admin: '管理员' };
export const JOB_STATUS = { draft: '草稿', pending: '待审核', active: '招聘中', paused: '已暂停', closed: '已关闭' };
export const APP_STATUS = { pending: '待处理', accepted: '已通过', rejected: '已拒绝', cancelled: '已取消' };
