# 账户注销协议空白修复
苏住房C 小程序「我的-设置-账号安全-账户注销」页协议区域空白，已修复。

## 问题原因
- 账户注销页 `cancellationWarning.vue` 使用旧配置键 `jyq.cancellation` 拉取协议
- 项目其他用户协议已统一改为 `szf.user.*` 前缀（如 `szf.user.protocol`、`szf.user.policy`、`szf.user.third`），旧键返回空数据

## 修复内容
- 配置键改为 `szf.user.cancellation`
- 兼容多种接口返回格式（`data` 字符串、`data.configValue`、`msg` 字段）
- 文件：`src/pages_my/setting/cancellationWarning.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；来源会话ID：de821fae-638a-46f8-93fc-2174c53953d4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "cancel_cfg_key_fix",
  "source_extraction_id": "7e3e0be08a0d49459cf6cdab5cb477e0",
  "version": 1,
  "memory_type": "entities"
}
-->