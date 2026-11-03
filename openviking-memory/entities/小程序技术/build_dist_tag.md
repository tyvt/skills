# 主分支打包输出目录必须为dist且分支发版需打tag
苏住房C在 main-v2.1 / sfb 等分支并行发版，主分支 build 脚本输出目录被改成非 dist 破坏构建链路，需恢复 dist 并逐分支核对 tag。

## 问题现象
- 用户指出 main-v2.1 没打 tag，要求“主分支怎么打包有这个逻辑，该回去”
- 主分支 package.json 的 build 脚本输出目录非 dist，与“产物必须落仓库根 dist 供微信开发者工具导入”约定不一致

## 根因
- 主分支 build 脚本疑似沿用 build.sh 定制逻辑改了输出目录，导致微信开发者工具导入与后处理脚本（relocate-datetime-picker / validate-dist）契约全错
- 多分支发版时容易只给当前分支打 tag，漏掉同版本其它分支

## 解决方案
- 主分支统一恢复 build 输出为 dist（提交 fix(build): 恢复主分支打包输出目录为 dist）
- 每个分支发版核对三件事：build 脚本输出目录、dist 实际产物、该分支是否打过同版本 tag
- 子模块先提交推送，父仓库再更新指针并单独打 tag，保证父仓与子模块 tag 对应

## 验证与归属
- 验证：会话 830bdf69（2026-08-14，基线 db06361）子模块提交 b7608ec7+tag v2.1.0.16，父仓库提交 f88c743 更新指针+tag v2.1.0.16
- 涉及文件：zhi2-mobile-shimin/package.json、vite.config.ts、build.sh
- 所属项目：苏住房C；来源会话ID：830bdf69-ebf5-4372-8f53-e837a521a019；代码基线：db06361

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "build_dist_tag",
  "source_extraction_id": "b9a53a62e5144180a2e64278aff6fe0f",
  "version": 1,
  "memory_type": "entities"
}
-->