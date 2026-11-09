# 园区市民h5智数仓库
苏州园区住房市民h5智数c前端仓库，使用 dev-v0 分支，无子模块，采用时间戳 tag 命名。

## 打 Tag 约定
- tag 命名格式为本地时间戳 `YYYYMMDDHHmm`（如 `202611061622`）
- 沿用上次规则，创建附注 tag 并推送到 origin，本地与远程一致
- 实例：关怀模式修复后，提交 39ce63a 打 tag 202611061622（前次最新 tag 为 202611061437）
- 实例：修复分享链接 token 登录态劫持后，提交 f19248f 打附注 tag 202611091537，tag 对象 b0e76c9，远程已推送且本地/远程一致

## 仓库结构
- 当前工作分支 dev-v0，无子模块，无需处理子模块引用
- HEAD = f19248f（Merge branch 'fix/url-token-session-fix' into dev-v0）

## 近期改动
- 关怀模式修复提交 4e1e63e：民意调查答题页微信关怀模式(大字)评星不可见/无法滚动修复
- 远程 tag 对象 52649a2 解引用到提交 39ce63a
- 修复分享链接携带 token 导致登录态劫持提交 f19248f：H5 地址栏剥离 token + 入口页校验 + token 一次性消费
- 新 tag 202611091537 对象 b0e76c9 解引用到提交 f19248f，已推送 origin 且本地/远程一致

## 关联信息
- 所属项目：苏州园区住房 fe zhi2 mobile 市民 h5 智数 c

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "shimin_h5_zhishu",
  "source_extraction_id": "abff5db8b31a41d78c5dbb23564ce684",
  "version": 2,
  "memory_type": "entities"
}
-->