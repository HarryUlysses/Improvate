Page({
  data: {},
  goCreate() {
    wx.navigateTo({ url: '/pages/plan/create' });
  },
  goFeed() {
    wx.navigateTo({ url: '/pages/community/feed' });
  },
});

