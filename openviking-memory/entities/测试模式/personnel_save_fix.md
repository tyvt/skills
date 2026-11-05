# 从业人员测试用例保存按钮修复与E2E定位优化
产品2.0 的 zhi2-web-admin 从业人员增删改查用例中，02 新增阶段的保存按钮无响应问题已修复，E2E 定位方式同步优化。

## 问题根因
- detail.vue 的 operation-btn-group 未绑定 @save="submitForm"，点击「保存」不发送请求
- E2E 原使用 button:visible 过滤定位不准确

## 改动
- detail.vue 增加 @save="submitForm"
- detail.vue 增加 beforeSaveHook()（保存前补齐企业备案信息）
- detail.vue 增加 getForm()（只提交必要字段，避免 /add 返回 500）
- personnel-certificate-crud.spec.js 优化 clickSaveButton，改用 getByRole('button', { name: /保存/ })，填写后先等待「保存」按钮可见

## 验证与归属
- 本地验证：02 增 - 创建测试从业人员 已通过
- 已知限制：03 证书增删改查全量跑仍可能失败（服务器异常 / 没有访问权限），新建人员业务状态为待确认时后端对证书新增更新返回 500 或权限错误
- 涉及文件：detail.vue、personnel-certificate-crud.spec.js
- 所属项目：产品2.0；来源会话：840f26b2-59e0-4f58-a690-fdd616477176；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "personnel_save_fix",
  "source_extraction_id": "ce7689f8bffb4226a4a239088e1262fc",
  "version": 1,
  "memory_type": "entities"
}
-->