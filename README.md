# chat box 项目模版

本项目是一个基于 React、Vite 和 TypeScript 的前端模板，旨在帮助开发者快速搭建现代化的 Chat Web 项目。

## 特性

- **快速启动**：利用 Vite 的快速构建和热更新特性，提升开发效率。
- **TypeScript 支持**：内置 TypeScript 配置，提供静态类型检查，增强代码可靠性。
- **路由懒加载**：集成 React Router，实现路由懒加载，优化首屏加载性能。
- **状态管理**：内置 Zustand 状态管理库，简化全局状态管理。
- **代码规范**：集成 ESLint、Prettier 和 Stylelint，确保代码质量和一致性。
- **环境变量**：支持多环境配置，方便不同环境下的构建和部署。

## 目录结构

```plaintext
├── public/                  # 公共静态资源
├── src/                     # 源代码
│   ├── assets/              # 静态资源（如图片、字体等）
│   ├── components/          # 公共组件
│   ├── hooks/               # 自定义 hooks
│   ├── layouts/             # 页面布局
│   ├── pages/               # 页面组件
│   ├── router/              # 路由配置
│   ├── services/            # API 服务
│   ├── store/               # 状态管理
│   ├── styles/              # 样式文件
│   ├── types/               # TypeScript 类型定义
│   └── utils/               # 工具函数
├── .editorconfig            # 编辑器配置
├── .eslintrc.js             # ESLint 配置
├── .gitignore               # Git 忽略文件
├── .prettierrc.js           # Prettier 配置
├── index.html               # HTML 模板
├── package.json             # 项目依赖和脚本
├── tsconfig.json            # TypeScript 配置
└── vite.config.ts           # Vite 配置
```

## 安装

```bash
# 克隆项目
git clone chatBoxTemplate

# 进入项目目录
cd chatBoxTemplate

# 安装依赖
pnpm install
```

## 开发

```bash
# 启动开发服务器
pnpm run dev
```

打开浏览器，访问 `http://localhost:3000` 即可查看项目效果。

## 构建

```bash
# 构建生产环境代码
npm run build
```

构建后的文件将输出到 `dist/` 目录。

## 代码规范

本项目集成了以下代码规范工具：

- **ESLint**：用于检查 JavaScript 和 TypeScript 代码的质量和风格。
- **Prettier**：用于自动格式化代码，保持代码风格一致。
- **Stylelint**：用于检查 CSS 和 SCSS 代码的质量和风格。

在提交代码前，建议运行以下命令进行代码检查和格式化：

```bash
# 检查代码
npm run lint

# 格式化代码
npm run format
```

## 贡献

欢迎提交 Issues 或 Pull Requests，帮助我们改进这个模板项目。

## 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。
