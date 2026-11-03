# 二维码地址拼接应抽为独立环境变量
废弃 `appURL` 拼接逻辑，新增 `VITE_APP_OWNER_DECISION_DETAIL_URL` 与 `VITE_APP_OWNER_ELECT_DETAIL_URL` 写入环境变量。

## 现象
- 原 `appURL` 拼接逻辑维护困难、易出错

## 解决方案
- 废弃拼接逻辑，新增 `VITE_APP_OWNER_DECISION_DETAIL_URL` 与 `VITE_APP_OWNER_ELECT_DETAIL_URL` 写入 `.env` 等
- 在 `VoteQrcodeDialog.vue` 等 5 处文件直接引用完整地址

## 关联信息
- 验证证据：src=G/003.md
- 涉及文件：VoteQrcodeDialog.vue
- 来源会话：26e165bf-22a0-4580-8d7f-37cb7636e500
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qrcode_env_var",
  "source_extraction_id": "926112b8f1dd4580a35269f495566a01",
  "version": 1,
  "memory_type": "entities"
}
-->