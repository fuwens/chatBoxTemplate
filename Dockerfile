FROM node:20.18-alpine
ENV PNPM_AUTO_INSTALL=true

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
RUN pnpm install

RUN pnpm run build

# 使用 nginx 作为服务
FROM nginx:alpine

# 复制构建后的静态文件到 nginx 的默认公开目录
COPY --from=0 /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
# 拷贝自定义的 Nginx 配置文件（如果有的话）
COPY --from=0 /app/nginx.conf /etc/nginx/conf.d

# 暴露应用运行的端口（nginx 默认是 80 端口）
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
