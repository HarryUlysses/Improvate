# 需求开发文档（2025-12-11）

## 项目概览
- 名称：型男改造计划微信小程序
- 目标：支持用户上传照片/选择目标风格生成改造计划；社区浏览互动；购买计划；上传聊天记录生成话术；邀请码增长。

## 本次改动摘要
- **README 更新**：补充仓库说明、目录结构、启动步骤、后续扩展建议。
- **后端骨架（Express）**：
  - `backend/src/app.js`：健康检查、mock 登录、计划创建/列表/详情、任务生成（含占位 AI 生成）、点赞、评论接口。
  - `backend/src/services/ai.js`：占位生成逻辑（发型/穿搭/配饰、聊天话术）。
  - `backend/src/db/schema.sql`：用户、计划、生成任务、订单、评论、点赞、邀请奖励等示例表结构。
  - `backend/package.json`：依赖与启动脚本。
- **前端小程序骨架**（原生/TS）：
  - 配置：`app.json/js/wxss`。
  - 请求封装：`utils/request.ts`（可配置 `BASE_URL`）。
  - 页面：
    - `pages/index`：入口跳转创建/社区。
    - `pages/plan/create`：选择风格、上传图片、创建计划并触发生成。
    - `pages/task/status`：轮询查看生成状态，跳转详情。
    - `pages/plan/detail`：查看计划、生成结果、评论。
    - `pages/community/feed`：计划列表、点赞、跳转详情。

## 使用与验证
1) 后端：`cd backend && npm install && npm run dev`（默认端口 3000）。
2) 前端：微信开发者工具导入 `frontend/miniprogram`，修改 `utils/request.ts` 的 `BASE_URL` 指向后端。
3) 通过创建计划 → 生成 → 查看进度 → 详情 → 社区点赞流程验证基础链路。

## 后续建议
- 接入真实登录（微信 code 换 session）、支付、内容安全；替换内存存储为 DB/Redis，队列 + AI 推理替换占位逻辑。
- 按业务需要补充字段索引、权限校验、错误处理、埋点与监控。

