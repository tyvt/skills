# 详情页临时下线一块 UI 套路
无锡 H5 中需暂时隐藏某块 UI 但保留一键恢复能力时，采用布尔开关 + 模板 v-if + 逻辑层跳过对应接口的组合套路。

## 实现方式
- 定义 `showAttachments=false`（注释写明恢复方式）
- 模板附件区块包 `v-if="showAttachments"`，避免渲染 FileList
- 脚本里 getList/拉附件只在 showAttachments 为 true 时调用，避免无意义请求与空态闪烁
- 其余信息卡片不受影响

## 恢复方式
- 改回 true 即可，无需删组件或路由
- 应用在物业合同详情 contracts.vue 的附件区临时隐藏

## 验证与归属
- 验证证据：会话 db7a9453 实现 showAttachments、v-if FileList、条件 getList
- 涉及文件：src/pages_owner/company/info/contracts.vue、src/components/FileList/FileList.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：db7a9453-11c1-4ef8-8673-2248b9101df6；代码基线：1cce226

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "temp_hide_ui_pattern",
  "source_extraction_id": "cd81d20ab5a649d4ac1a4172157e807a",
  "version": 1,
  "memory_type": "entities"
}
-->