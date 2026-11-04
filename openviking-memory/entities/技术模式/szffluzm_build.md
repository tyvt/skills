# zhi2-mobile-shimin 打包产物与脚本命名约定
本项目从多品牌同源仓库复制而来，构建配置需去除 suzhufang 品牌后缀，产物目录改为 szffluzm。

## 背景
- 从多品牌同源仓库复制，构建配置保留大量 suzhufang 品牌后缀，产物目录还是默认 dist
- 用户要求打包目录改为 szffluzm，命令里默认就是 suzhufang，不需把品牌写进命令名

## 解决方案
- vite.config.ts 里 outDir 指向 szffluzm 下的对应端产物
- package.json 脚本收敛：development:suzhufang→dev、dev:suzhufang:mp-weixin→dev:mp-weixin、test:suzhufang→test:serve、build/build:suzhufang→build、build:suzhufang:test→build:test、build:suzhufang:mp-weixin→build:mp-weixin
- 同步根仓库 package.json 引用；vite.config.ts 必须补 dev→development 映射，否则 npm run dev 加载不到 .env.development
- 常用命令固定为 npm run dev / npm run test / npm run build

## 注意事项
- 验证产物要去看 szffluzm 目录而不是 dist
- .gitignore 也要同步排除新产物目录

## 验证与归属
- 验证证据：会话 5ebd895c（基线 a444c05）用户要求打包目录改 szffluzm 不用 dist、移除命令 suzhufang 字段，脚本完成重命名
- 涉及文件：zhi2-mobile-shimin/package.json、zhi2-mobile-shimin/vite.config.ts、package.json、.gitignore、zhi2-mobile-shimin/.gitignore
- 所属项目：苏住房C；来源会话：5ebd895c-0fec-43e6-b281-71292c6137e6；代码基线：a444c05

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "szffluzm_build",
  "source_extraction_id": "0bb48399527b42a8b82c414ecfd73497",
  "version": 1,
  "memory_type": "entities"
}
-->