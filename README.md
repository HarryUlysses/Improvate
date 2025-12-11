# Improvate

本仓库提供一个「型男改造计划」微信小程序的基础骨架，包含前端小程序示例与后端 API（Express），以及示例数据库建表 SQL。

## 目录
- `frontend/miniprogram/`：小程序骨架（页面、请求封装）
- `backend/`：Express API、示例内存数据、任务与计划接口
- `prompt`：需求描述

## 快速开始
### 后端
1. 进入 `backend`：`cd backend`
2. 安装依赖：`npm install`
3. 启动：`npm run dev`（默认 3000 端口）

### 小程序前端
1. 使用微信开发者工具导入 `frontend/miniprogram` 目录
2. 将 `utils/request.ts` 中的 `BASE_URL` 指向后端地址
3. 运行预览即可查看示例页面与接口调用

## 下一步可扩展
- 接入真实数据库与 Redis，将 `schema.sql` 执行到 MySQL/PostgreSQL
- 替换内存存储为持久化 ORM（TypeORM/Prisma 等）
- 接入队列与 AI 推理服务，替换 `services/ai.js` 占位逻辑
- 接入微信登录、支付、内容安全接口
