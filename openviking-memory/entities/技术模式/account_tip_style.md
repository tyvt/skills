# 拟开户账户名称提示框样式调整（苏住房G）
苏住房G 项目 zhi2-web-admin 调整 benefit/pubRegulatoryAccount/detail.vue 中 `.proposed-account-name-tip` 样式，使 el-alert 提示框仅包住文字与图标。

## 问题原因
- `el-alert` 默认占满父容器整行宽度，导致文字左侧一小段、右侧大片蓝色空白

## 修复样式
- `display: inline-flex`：按内容收缩布局
- `width: fit-content`：宽度随文字变化
- `max-width: 100%`：窄屏时可换行不溢出

## 涉及文件与归属
- 涉及文件：src/views/benefit/pubRegulatoryAccount/detail.vue
- 所属项目：苏住房G（zhi2-web-admin）
- 来源会话ID：54b4e1e7-1b46-41b8-a497-2f06010c1c68

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_tip_style",
  "source_extraction_id": "a384d5a4404b42f0bbdba932aae859ab",
  "version": 1,
  "memory_type": "entities"
}
-->
