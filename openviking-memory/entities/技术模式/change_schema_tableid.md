# 变更列表复用新增schema须白名单过滤并bump tableId
苏住房G项目中 propertyContractChange（变更列表）复用 contract info schema 后，请求侧残留旧字段且缓存未失效，须按 schema 白名单过滤并升版 tableId 做缓存击穿。

## 问题背景
- 变更列表从专用 isAddListPage 逻辑扩展为与新增列表共用 contract info schema（isContractInfoSchema 统一 formItems/columns/initDict/listCallback）
- 筛选字段由 contractStatus+recordTimeStart/End 换成 hasFilingForm 等新字段
- listMixins created 按路由 path 合并 cachedSearchParams 回 queryParams，getQueryParams() 把整个 queryParams（含残留旧字段）原样发接口
- 表现：UI 已换新筛选项，请求仍带旧参数做隐性过滤，列表结果莫名变少且极难排查

## 解决方案
- getQueryParams()（或合并缓存后）按当前 schema 白名单过滤，contract info schema 下显式剔除 contractStatus、recordTimeStart、recordTimeEnd
- 给变更列表 tableId 升版（property_propertyContract…_v2，仅 BUSINESS_TYPE.CHANGE 使用），换缓存空间让旧缓存自然失效
- 上线时清理对应 route 的 cachedSearchParams
- ADD 默认 bizState:'2'（已备案），CHANGE 不默认；CHANGE 旧版有「业务状态」列，contract info schema 无，若产品需要需在 columns 分支补 bizState 并确认 ADD 同步

## 与已知差异及验证
- 区别于已知 #930（只记 listMixins 搜索缓存残留已删除字段），本条补根因（缓存按路由 path 合并+全量发送）与 tableId 版本号第二道解法
- 验证：会话 4dc38163 审查 HIGH「变更列表路由搜索缓存带旧 schema 字段」；聚焦项结论表确认 tableId _v2 仅 CHANGE 使用、CHANGE 不默认 bizState:'2' 且含 hasFilingForm
- 涉及文件：views/property/propertyContract/components/index.vue、enums.js、mixins/listMixins
- 所属项目：苏住房G；来源会话：4dc38163-ebfe-4eb0-bebf-f3851a071ec1；代码基线：3192070

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_schema_tableid",
  "source_extraction_id": "379120973bb24c27ab7081046431e71c",
  "version": 1,
  "memory_type": "entities"
}
-->