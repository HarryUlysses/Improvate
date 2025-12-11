-- 示例表结构，可根据需要扩展索引与约束

CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  openid VARCHAR(64),
  unionid VARCHAR(64),
  nickname VARCHAR(64),
  avatar TEXT,
  invite_code VARCHAR(32),
  inviter_id VARCHAR(64),
  points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  style_tag VARCHAR(64),
  status VARCHAR(16),
  cover_url TEXT,
  result_assets JSONB,
  purchase_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gen_tasks (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  plan_id INT NOT NULL,
  type VARCHAR(16),
  input_ref TEXT,
  status VARCHAR(16),
  result_ref JSONB,
  error TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  plan_id INT,
  amount DECIMAL(10,2),
  status VARCHAR(16),
  pay_txn VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  plan_id INT NOT NULL,
  content TEXT,
  status VARCHAR(16) DEFAULT 'ok',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  plan_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invite_rewards (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  inviter_id VARCHAR(64),
  reward_type VARCHAR(16),
  value INT,
  status VARCHAR(16),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

