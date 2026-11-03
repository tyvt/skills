# 下线外部能力保留后端契约
苏住房C uni-app 项目清理人脸/原生桥接能力时，只删调用与页面、保留后端契约字段与工具文件，避免流程断。

## 适用与根因
- 适用 zhi2-mobile-admin-h5-c-unlimited 与 zhi2-mobile-shimin 整体下线人脸/原生桥接
- 能力耦合五处：页面目录+工具文件+路由白名单+表单签字流+后端接口字段
- 只删页面会导致白名单放行旧路径、签字流 await 不存在步骤、误删后端字段

## 解决方案
- 先按能力名全仓 grep 列出页面/工具/白名单/API 四类命中
- 删页面与工具后回首改路由白名单与所有跳转点
- 流程节点改签字后直接提交，验证链路改调本地业务方法
- 后端契约字段保留、前端不再调 SDK，失败文案改中性（人脸识别失败→身份验证失败）
- 遗留入口一并清掉，按主链路回归添加房屋→实名认证→授权

## 验证与归属
- 验证会话 220195cd（基线 d43894b）：移除人脸后白名单更新、保留 faceRecognition:'1'、文案改身份验证失败
- 验证会话 1a8b3ac8（基线 a444c05）：删 utils/app.js 后原生桥接替换为 uni API，提示暂未开放
- 涉及文件：usePortal.js、App.vue、home.vue、utils/app.js、api/security.js
- 所属项目：苏住房C；来源会话ID：220195cd, 1a8b3ac8

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "capability_cleanup_keep_contract",
  "source_extraction_id": "c00494ad0ab84ac6adf97c304d84084f",
  "version": 1,
  "memory_type": "entities"
}
-->