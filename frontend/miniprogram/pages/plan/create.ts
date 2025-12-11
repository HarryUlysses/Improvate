import { request } from '../../utils/request';

Page({
  data: {
    style: 'urban',
    imageUrl: '',
    creating: false,
  },
  onStyleChange(e: WechatMiniprogram.PickerChange) {
    const styles = ['urban', 'business', 'sports'];
    this.setData({ style: styles[Number(e.detail.value)] || 'urban' });
  },
  onChooseImage() {
    wx.chooseImage({
      count: 1,
      success: res => {
        const filePath = res.tempFilePaths[0];
        this.setData({ imageUrl: filePath });
      },
    });
  },
  async onSubmit() {
    if (this.data.creating) return;
    this.setData({ creating: true });
    try {
      const planRes = await request('/plans', {
        method: 'POST',
        data: { style: this.data.style, coverUrl: this.data.imageUrl },
      });
      const planId = planRes.data.id;
      await request('/tasks', {
        method: 'POST',
        data: { planId, type: 'image', inputRef: this.data.imageUrl },
      });
      wx.showToast({ title: '已创建，前往查看', icon: 'success' });
      wx.navigateTo({ url: `/pages/task/status?id=${planId}` });
    } catch (e) {
      wx.showToast({ title: '创建失败', icon: 'error' });
    } finally {
      this.setData({ creating: false });
    }
  },
});

