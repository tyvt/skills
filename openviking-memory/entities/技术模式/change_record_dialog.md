
# 淮安物管变更详情变更记录弹窗接入
多个业务域变更详情页通过公共组件 change-record-dialog + 工具 contentInfoChange.js 增加「变更记录」按钮，展示 contentInfo 白名单内且有变化的字段前后值。

## 背景与原因
- 各变更单详情实现分散，每页手写对比表导致字段口径不一致；后端返回字段名与 form 嵌套结构不统一，需公共能力收口。

## 解决方案
- 以详情页 contentInfo（及 contentInfo2/3…）为字段白名单，用 originalObj 与当前 form diff，仅输出有差异且在白名单内的行。
- 弹窗顶部按需展示变更时间、变更人、变更说明（无值则隐藏说明区）。
- 各变更 detail 或共用 detail 组件接入按钮与弹窗，按需求清单逐模块挂接（行业管理/物业管理/业主自治/公共收益/项目楼盘表等）。
- 与「变更前/后单表合并」互补：本条是「从详情展示 schema 反推可比字段」的接入套路。

## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 会话 e54a78dd（2026-07-06，基线 3e560be）与 95b62123（2026-07-01，基线 22a1d9d）用户给出跨模块变更记录需求清单；实现组件并多页接入。
- 范围：淮安物管一次性接入约 11+ 个变更详情页，合并分支 feature/company-change-record → develop/v2.6.1-huaian。
- 涉及文件：change-record-dialog.vue、contentInfoChange.js、companyManagement/components/detail.vue、companyManagement/change/detail.vue 等；来源会话：e54a78dd-db5f-4130-8a53-38052902a30c, 95b62123-9914-4e98-aca3-4d7acff520aa；代码基线：22a1d9d。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_record_dialog",
  "source_extraction_id": "829524b31da8427facda7c3ea75fe26b",
  "version": 4,
  "memory_type": "entities"
}
-->