# 毛泽东选集 · 锦囊妙计

基于毛泽东思想的 AI 战略顾问应用，运用《毛泽东选集》的智慧为你的问题提供"锦囊三计"。

## 功能特点

- 输入你面临的问题或困境
- AI 会分析主要矛盾，提供三条战略建议
- 每条建议包含毛主席语录和具体解读
- 精美的中国风界面设计

## 技术栈

- React 19 + TypeScript
- Vite
- Silicon Flow API (DeepSeek-V3)

## 本地运行

**前置条件:** Node.js

1. 安装依赖:
   ```bash
   npm install
   ```

2. 配置 API Key:
   在 `.env.local` 文件中设置你的 Silicon Flow API Key:
   ```
   SILICONFLOW_API_KEY=your_api_key_here
   ```

   获取 API Key: https://cloud.siliconflow.cn

3. 启动应用:
   ```bash
   npm run dev
   ```

4. 打开浏览器访问 http://localhost:3000

## 构建部署

```bash
npm run build
npm run preview
```
