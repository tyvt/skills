# 不动产权证书详情弹窗按钮无响应与项目名为空修复
苏州市房地产监测V3 不动产权证书详情因废弃指令与预填时机导致弹窗按钮无响应及项目名为空，已修复。

## 问题根因
- `stateLandLic/detail.vue` 根节点使用已废弃 `v-waiting`，指令未注册致子组件渲染与事件失败，按钮无反应
- 项目备案编辑页内嵌模式项目名称输入框只读禁用，预填时机偏早或详情未带 `projectName` 致空值

## 修复内容
- `stateLandLic/detail.vue` 将 `v-waiting` 改为 `v-loading="loading"`
- `projectEmbeddedCertificateDetail.js` 监听 `embedProject`，新增时再次预填项目，`detailCallback` 拉取证书详情后处理

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`stateLandLic/detail.vue`、`form.js`、`projectEmbeddedCertificateDetail.js`
- 所属项目：苏州市房地产监测V3；来源会话：2bfeccba-a62e-459e-b49e-c47c3b7085a9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "state_land_lic_vwaiting_fix",
  "source_extraction_id": "366a442c32ce460e8f96d6df14fbd0d7",
  "version": 1,
  "memory_type": "entities"
}
-->