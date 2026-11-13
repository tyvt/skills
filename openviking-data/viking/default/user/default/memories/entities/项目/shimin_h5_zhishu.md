# 园区市民h5智数仓库
苏州园区住房市民h5智数c前端仓库（gitlab 路径 zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c），使用 dev-v0 分支，无子模块，采用时间戳 tag 与版本号 tag 两套命名。

## 打 Tag 约定
- 时间戳 tag 命名格式为本地时间戳 `YYYYMMDDHHmm`（如 `202611061622`）
- 时间戳 tag 为 annotated tag（带描述，有 tag 对象），推送到 origin 保持本地/远程一致
- 版本号 tag 命名形如 `suzhou-yuanqu-homeland-vX.Y.Z`（如 `suzhou-yuanqu-homeland-v1.40.21`）
- 实例：关怀模式修复后，提交 39ce63a 打 annotated tag 202611061622（前次最新 tag 为 202611061437）
- 实例：修复分享链接 token 登录态劫持后，提交 f19248f 打 annotated tag 202611091537，远程已推送且本地/远程一致

## 仓库结构
- 当前工作分支 dev-v0，无子模块，无需处理子模块引用
- HEAD = e81b937（lockfile 修复提交）

## 近期改动
- 关怀模式修复提交 4e1e63e：民意调查答题页微信关怀模式(大字)评星不可见/无法滚动修复
- 时间戳 tag 202611061622 指向提交 39ce63a
- 修复分享链接携带 token 导致登录态劫持提交 f19248f：H5 地址栏剥离 token + 入口页校验 + token 一次性消费
- 时间戳 tag 202611091537 指向提交 f19248f，已推送 origin 且本地/远程一致
- 本次会话（2026-11-12）提交 e81b937（lockfile 修复）打 annotated tag 202611121822 并推送 origin；版本号 tag 本次未动
- 本次会话（2026-11-13）提交 d4f3320（移除 vConsole 构建期静态注入）连同 d01caad（头像十连击唤起 vConsole + 接口拦截器聚合打印入参与响应）打 annotated tag 202611131658 并推送 origin，描述「客服中心头像十连击唤起 vConsole，接口拦截器聚合打印入参与响应（移除构建期静态注入）」；工作区干净，dev-v0 与远程同步

## 关联信息
- 所属项目：苏州园区住房 fe zhi2 mobile 市民 h5 智数 c

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "shimin_h5_zhishu",
  "source_extraction_id": "ded69b004ec34ff2b0b7a47525ec6483",
  "version": 4,
  "memory_type": "entities"
}
-->