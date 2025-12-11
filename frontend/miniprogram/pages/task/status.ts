import { request } from '../../utils/request';

Page({
  data: {
    id: 0,
    plan: null as any,
  },
  async onLoad(query: any) {
    const id = Number(query.id || 0);
    this.setData({ id });
    this.poll();
  },
  async poll() {
    await this.fetch();
    if (this.data.plan?.status === 'done') {
      wx.showToast({ title: '生成完成', icon: 'success' });
      return;
    }
    setTimeout(() => this.poll(), 2000);
  },
  async fetch() {
    try {
      const res = await request(`/plans/${this.data.id}`, { method: 'GET' });
      this.setData({ plan: res.data });
    } catch (e) {
      wx.showToast({ title: '查询失败', icon: 'error' });
    }
  },
  goDetail() {
    wx.navigateTo({ url: `/pages/plan/detail?id=${this.data.id}` });
  },
});

