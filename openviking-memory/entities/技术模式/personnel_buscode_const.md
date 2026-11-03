# 经纪机构从业人员附件业务码固定为 jgcyryba
经纪机构从业人员附件的 `busCode` 原依赖路由配置，易出错或缺失；已固定为常量 'jgcyryba'。
## 问题根因
- 从业人员登记附件的 `busCode` 依赖路由配置，容易误配或遗漏
## 解决方案
- 在 `src/api/company/personnelRecord.js` 中，`resolvePersonnelAppendixBusCode` 对 `institution`/`agencyPersonnel*` 路由短路处理，并在 `listAppendixPackage` payload 中强制 `busCode: 'jgcyryba'`
## 验证与文件
- 验证证据：src=苏州市房地产监测V3-leftover/118.md
- 涉及文件：personnelRecord.js、AgencyPersonnelDetail.vue、agencyPersonnelApply/detail.vue、personnelRecordMenuConstants.js
- 所属项目：苏州市房地产监测V3；来源会话：01a16303-698b-70c5-a400-763bf5d63eb9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_buscode_const",
  "source_extraction_id": "79584e92e2ae4481aa8379386e8f45ba",
  "version": 2,
  "memory_type": "entities"
}
-->