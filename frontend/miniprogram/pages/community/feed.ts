import { request } from '../../utils/request';

Page({
  data: {
    list: [] as any[],
    loading: true,
  },
  async onLoad() {
    await this.fetch();
  },
  async fetch() {
    this.setData({ loading: true });
    try {
      const res = await request('/plans', { method: 'GET' });
      this.setData({ list: res.data });
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'error' });
    } finally {
      this.setData({ loading: false });
    }
  },
  async onLike(e: any) {
    const id = e.currentTarget.dataset.id;
    await request(`/community/like/${id}`, { method: 'POST' });
    this.fetch();
  },
  goDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/plan/detail?id=${id}` });
  },
});

