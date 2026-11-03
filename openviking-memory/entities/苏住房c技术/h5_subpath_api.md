# 苏住房C H5子路径部署接口必须用相对路径
苏住房C 的 H5 部署在子目录（如 /testh5/）时，.env 的接口前缀必须用 ./ 相对路径而非 /api，否则请求打到域名根全部 404。

## 问题现象
- H5 部署在 https://szf.szzfcjj.cn/testh5/ 子目录下，.env.production 写 VITE_APP_API_BASE_URL=/api/v2.0 时请求打到 https://szf.szzfcjj.cn/api/v2.0 而非子目录，全部 404

## 根因
- 绝对路径以站点根为基准，相对路径以当前文档 URL 为基准；子路径部署只能靠相对路径自适应部署目录，换目录也不用重新构建

## 解决方案
- 生产/测试环境统一写 VITE_APP_API_BASE_URL=./api/v2.0、VITE_APP_API_BASE_URL_V1=./szf
- .env.development 保持 /api/v2.0 让 Vite devServer 代理照常生效
- 服务端 Nginx 必须把 /testh5/api/ 反代到真实后端，否则相对路径只是把 404 从根目录挪到子目录
- 改完需 npm run build / npm run test 重新打包，env 只在构建期读取

## 验证与归属
- 验证会话 c48b7743（基线 f1939b0）：改 .env.production/.env.test 为 ./api/v2.0 与 ./szf，.env.development 仍 /api/v2.0，提示 Nginx 反代 /testh5/api/
- 涉及文件：.env.production、src/api/index.js、src/api/v1Instance.js、src/env/mp.js、vite.config.ts
- 所属项目：苏住房C；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "h5_subpath_api",
  "source_extraction_id": "ceeab5991c4441bf91972f5b0aa75c6e",
  "version": 1,
  "memory_type": "entities"
}
-->