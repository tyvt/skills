# 一般表决详情基本信息沉底修复
园区公共收益项目自治通用表决详情页在表决已结束态基本信息模块跑到底部的根因与修复。

## 根因
- 全局样式 zhi2-web-admin/src/styles/index.scss:265 使用 flex-direction: column-reverse 将末尾 operation-btn-group 顶到最上方
- 兄弟页面顶层仅一个 el-row 或 zs-tabs，反转无副作用
- autonomy/general/detail.vue 在 bizState=='2' 时渲染两个同级 el-row，被一起反转导致基本信息 el-row 掉到最底部

## 修复要点
- 仅修改 zhi2-web-admin/src/views/autonomy/general/detail.vue（1 文件，+13 -1）
- 模板约 107-112 行调整结构使基本信息不被反转沉底

## 涉及文件
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/views/autonomy/general/detail.vue
- zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=园区公共收益
- 所属项目：园区公共收益；来源会话ID：4e97a820-f6c5-43ad-913d-4d6436b2148e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_vote_detail_info_bottom",
  "source_extraction_id": "95cd5696de3f4e369b28c91aad42dc97",
  "version": 1,
  "memory_type": "entities"
}
-->