import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuid } from 'uuid';
import { fakeImagePlan, fakeChatScript } from './services/ai.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const users = [];
const plans = [];
const tasks = [];
let likes = {};
let comments = [];

function getUserId(req) {
  // 简化：从 header 取用户 ID，没有则创建 mock 用户
  const uid = req.headers['x-user-id'];
  if (uid) return uid;
  if (users.length === 0) {
    const id = uuid();
    users.push({ id, nickname: 'demo-user' });
    return id;
  }
  return users[0].id;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.post('/api/auth/mock-login', (req, res) => {
  const { nickname = 'demo', inviteCode } = req.body || {};
  const id = uuid();
  users.push({ id, nickname, inviteCode });
  res.json({ token: `mock-${id}`, userId: id });
});

app.post('/api/plans', async (req, res) => {
  const userId = getUserId(req);
  const { style = 'urban', coverUrl = '' } = req.body || {};
  const id = plans.length + 1;
  const plan = {
    id,
    userId,
    style,
    coverUrl,
    status: 'draft',
    resultAssets: null,
    createdAt: new Date().toISOString(),
  };
  plans.push(plan);
  res.json(plan);
});

app.get('/api/plans', (_req, res) => {
  res.json(plans.map(p => ({ ...p, likes: likes[p.id] || 0 })));
});

app.get('/api/plans/:id', (req, res) => {
  const plan = plans.find(p => p.id === Number(req.params.id));
  if (!plan) return res.status(404).json({ message: 'not found' });
  res.json({ ...plan, comments: comments.filter(c => c.planId === plan.id) });
});

app.post('/api/tasks', async (req, res) => {
  const userId = getUserId(req);
  const { planId, type = 'image', inputRef = '' } = req.body || {};
  if (!planId) return res.status(400).json({ message: 'planId required' });
  const id = tasks.length + 1;
  const task = { id, userId, planId, type, inputRef, status: 'pending' };
  tasks.push(task);

  // 简化：直接同步生成
  try {
    if (type === 'image') {
      const resultAssets = await fakeImagePlan(inputRef);
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        plan.status = 'done';
        plan.resultAssets = resultAssets;
      }
      task.status = 'done';
      task.resultRef = resultAssets;
    } else {
      const resultAssets = await fakeChatScript(inputRef);
      task.status = 'done';
      task.resultRef = resultAssets;
    }
  } catch (err) {
    task.status = 'error';
    task.error = err.message || 'generate failed';
  }

  res.json(task);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: 'not found' });
  res.json(task);
});

app.post('/api/community/like/:id', (req, res) => {
  const planId = Number(req.params.id);
  likes[planId] = (likes[planId] || 0) + 1;
  res.json({ planId, likes: likes[planId] });
});

app.post('/api/community/comment/:id', (req, res) => {
  const planId = Number(req.params.id);
  const userId = getUserId(req);
  const { content = '' } = req.body || {};
  const comment = { id: comments.length + 1, planId, userId, content, createdAt: new Date().toISOString() };
  comments.push(comment);
  res.json(comment);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

