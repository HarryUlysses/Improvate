const BASE_URL = 'http://localhost:3000/api'; // 根据部署环境修改

export function request(path: string, options: WechatMiniprogram.RequestOption = {}) {
  return new Promise<WechatMiniprogram.RequestSuccessCallbackResult>((resolve, reject) => {
    const token = wx.getStorageSync('token');
    wx.request({
      url: `${BASE_URL}${path}`,
      header: {
        ...(options.header || {}),
        Authorization: token || '',
      },
      ...options,
      success: res => resolve(res),
      fail: err => reject(err),
    });
  });
}

