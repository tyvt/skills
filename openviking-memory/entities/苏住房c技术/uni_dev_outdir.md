# uni dev脚本不支持--outDir参数
苏住房C 移动端 npm run dev 带上 --outDir 即报 Unknown option 启动失败，该参数仅 uni build 子命令解析，dev 产物固定落 dist/dev/mp-weixin。

## 现象与根因
- 执行 npm run dev（mp-weixin）启动即报 Unknown option --outDir，dev 起不来，而 build 正常
- @dcloudio vite-plugin-uni 的 CLI 只在 uni build 子命令上解析 --outDir，uni dev 不认这个参数，会以未知参数直接退出
- 项目 package.json 里 dev 脚本照抄了 build 的写法：uni -p mp-weixin --outDir ../dist

## 解决方案
- 把 dev 脚本改回 uni -p mp-weixin，build 脚本保留 --outDir ../dist
- dev 落 zhi2-mobile-shimin/dist/dev/mp-weixin，生产构建落 monorepo 根 dist；验收构建产物按对应目录看，别拿 dev 产物验证发布包（同源项目第 79 条踩过 dev 产物含未分包页面导致体积误判）
- 若确实要让 dev 也输出到 ../dist，只能在 vite.config.ts 里配 build.outDir，命令行传参一定不生效

## 验证与归属
- 会话 3541fbbe：用户贴 terminals/16.txt:16-26 的报错；结论写明「--outDir 只在 uni build 下有效，dev 不支持该参数」，从 dev 脚本移除后恢复
- 涉及文件：zhi2-mobile-shimin/package.json、vite.config.ts、根 package.json
- 所属项目：苏住房C；代码基线：9832ba3；来源会话ID：3541fbbe-c057-47a6-9bce-5cea5500bd20

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "uni_dev_outdir",
  "source_extraction_id": "2e192de19d9f4bb18647ef27da14cff8",
  "version": 1,
  "memory_type": "entities"
}
-->