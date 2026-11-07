# 物管会备案详情跳转用户授权预填锁定与重选并存
从物管会备案详情进「用户授权」时，预填锁定须与校验失败可重选并存，避免只锁死或只清空一侧。

## 跳转条件与参数
- 按钮条件与「创建工作人员」对齐：businessType 为物管会、bizState==2、非新增、且有 committeeVersionId
- goUserAuth 跳 autonomy/userAuth/detail/add 并带 businessType、committeeVersionId、committeeName、complexId、complexName、backUrl

## 预填与锁定
- 新增页 applyRoutePrefill 按 query 预填并调 checkUserUnique；进入同路径清 session 草稿并设 skipFormCache 防误写缓存
- organizationPrefilled 仅在「路由带 committeeVersionId 且表单仍保留 committeeVersionId」时为 true，校验失败清空组织后解除锁定允许重选
- 预填成功时组织类型/组织名称不可改，物业管理区域保持只读

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：zhi2-web-admin/src/views/autonomy/record/components/detail.vue、autonomy/record/components/directDetail.vue、autonomy/userAuth/detail.vue
- 所属项目：园区公共收益；来源会话：b76adf07-3bf8-4aba-b92c-e654a01213ae；代码基线：ca05ff6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auth_prefill_lock",
  "source_extraction_id": "7f591e2941124ffe888ff01baea64df3",
  "version": 1,
  "memory_type": "entities"
}
-->