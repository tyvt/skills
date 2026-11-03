# 字典改本地选项的四道口守护
propertyContract 列表将「是否上传备案表」从 sys_yes_no（Y/N）改为本地常量选项（'1'/'0'），并删除 normalizeHasFilingForm 与 listCallback，需同时守住归一化、colorMap 键、筛选参数、接口真值四道口。

## 问题根因
- 删除 normalizeHasFilingForm 后，布尔/Y/N 历史行数据无法收敛到新展示口径，直接裸露原始值
- dict-tag 的 rawDictParts 对布尔走 String(v) 得 'true'/'false'，既命不中「是/否」选项，也查不到 colorMap 键
- 筛选选项换常量后提交值从 Y/N 变 1/0，前端无法自证后端筛选参数是否同步
- listCallback 若承担「接口行→页面行」字段映射，删除前需确认无其他列依赖

## 修复方案
- 保留一个 normalize 函数，将布尔/数字/'1'/'Y' 等全部收敛到新口径，展示侧与提交侧分别只读此统一值
- 换本地选项时同步自检 colorMap/listClass 键覆盖，用样本值逐个跑而非只看代码
- 筛选值变更须单独与后端确认，前端读取侧兼容旧值、提交侧只传新值
- 删除 listCallback 前先确认无列依赖其字段映射

## 验证与归属
- 验证证据：会话 bbcf1fcb（2026-09-21，基线 ad5bbd9）diff 审查，结论严重度 high
- 涉及文件：property/propertyContract/components/index.vue、components/dict-tag/dict-tag.vue、mixins/listMixins.js
- 所属项目：苏住房G；来源会话：bbcf1fcb-341d-4924-a4e0-c14ea7c779ce；代码基线：ad5bbd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_local_refactor",
  "source_extraction_id": "294a6804316941388d16116e511fd383",
  "version": 1,
  "memory_type": "entities"
}
-->