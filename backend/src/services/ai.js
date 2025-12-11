// 占位的生成逻辑，实际应替换为 AI 推理/第三方服务调用
export async function fakeImagePlan(inputRef) {
  return {
    cover: inputRef || 'https://placekitten.com/600/800',
    hairstyle: '短寸清爽',
    outfit: '简约街头风',
    accessories: ['黑色墨镜', '银色链条'],
  };
}

export async function fakeChatScript(inputRef) {
  return {
    topic: '轻松开场',
    script: [
      '嘿，看到你喜欢户外，周末有推荐的路线吗？',
      '我最近在练习咖啡拉花，你更喜欢拿铁还是美式？',
      `PS: 已读取片段 ${inputRef?.slice?.(0, 20) || 'N/A'}...`,
    ],
  };
}

