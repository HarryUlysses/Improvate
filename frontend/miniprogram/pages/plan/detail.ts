import { request } from '../../utils/request';

Page({
  data: {
    id: 0,
    plan: null as any,
    loading: true,
  },
  async onLoad(query: any) {
    const id = Number(query.id || 0);
    this.setData({ id });
    await this.fetchDetail();
  },
  async fetchDetail() {
    this.setData({ loading: true });
    try {
      const res = await request(`/plans/${this.data.id}`, { method: 'GET' });
      this.setData({ plan: res.data });
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'error' });
    } finally {
      this.setData({ loading: false });
    }
  },
});

