# 业主自治二维码地址环境变量化
泰兴G（zhi2-web-admin）将两类业主自治二维码地址抽成独立环境变量（完整地址），替换所有 appURL 拼接使用点。

## 修改内容
- 新增环境变量（完整地址，不再用公共前缀拼接）：VITE_APP_OWNER_DECISION_DETAIL_URL、VITE_APP_OWNER_ELECT_DETAIL_URL
- 写入 env/.env 与 env/.env.test
- 替换所有 appURL 使用点（共 5 处文件），删除 appURL 计算属性

## 涉及文件
- autonomy/components/VoteQrcodeDialog.vue：qrcodeUrl 改为 `${VITE_APP_OWNER_DECISION_DETAIL_URL}?id=...`
- autonomy/election/owner/vote/detail.vue：模板二维码地址改为 electDetailUrl，data 中 appURL 改为 electDetailUrl: import.meta.env.VITE_APP_OWNER_ELECT_DETAIL_URL
- autonomy/election/supervisory/vote/detail.vue
- autonomy/repair/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=G
- 所属项目：G（泰兴G / zhi2-web-admin）
- 来源会话：26e165bf-22a0-4580-8d7f-37cb7636e500；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qrcode_url_fix",
  "source_extraction_id": "b987838a35414e90a1de560ff479ae3b",
  "version": 1,
  "memory_type": "entities"
}
-->