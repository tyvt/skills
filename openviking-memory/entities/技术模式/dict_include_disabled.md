# 全量字典接口改 listByType
getDictsIncludeDisabled 由 /system/dictData/list 分页改为 /system/dictData/listByType/{type}?isAll=1，响应取值由 res.rows 变 res.data。

## 问题背景
- 原实现调 /system/dictData/list?dictType=xxx&pageNum=1&pageSize=500，把 pageSize 写死 500 当全量用
- 分页接口拿全量要赌 pageSize 足够大，超出被静默截断，字典多了会悄悄丢项

## 解决方案
- 只改 dict.js 一个函数：URL 改成模板拼接 /listByType/${dictType}，参数对象传 { isAll: 1 }
- 解包改成 (res.data || [])，再 map 出 dictLabel、dictValue、remark、listClass、cssClass、status 六个字段
- 缓存 key 必须保持 ${dictType}_all，与普通 getDicts（不传 isAll）区分开，否则「含停用」和「仅启用」两份选项会互相覆盖
- 切换后全库不应再有 /system/dictData/list 调用，筛选下拉仍走 getDicts，业务页面代码零改动

## 验证与归属
- 验证证据：会话 58dcbdff 用户要求改用 listByType 接口查全量并用于回显，最终仅改 dict.js
- 涉及文件：zhi2-web-admin/src/utils/dict.js、zhi2-web-admin/src/views/company/staffManagement/components/index.vue、zhi2-web-admin/src/utils/companyListQuery.js
- 所属项目：苏住房G；来源会话ID：58dcbdff-1362-4418-9b41-bd4b7e15dd6c；代码基线：d5eee56

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_include_disabled",
  "source_extraction_id": "b2ccd8c8a7544a0a964a644555f9bb44",
  "version": 2,
  "memory_type": "entities"
}
-->