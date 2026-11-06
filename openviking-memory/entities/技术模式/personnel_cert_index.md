# 专业资格证书列表序号列修复
苏州市房地产监测V3 项目中修复专业资格证书管理列表（`personnelCertificate/index.vue`）序号列为空的问题，改为通用序号列。
## 问题原因
- 列表「序号」列原绑定 `prop="billNo"`，接口无该字段导致列显示为空
## 修改内容
- 序号列改用 `type="index"`，宽度 80，并传入 `:index="tableIndex"`
- 新增 `tableIndex` 计算属性：`(pageNum - 1) * pageSize + index + 1`，按页码与每页条数生成连续序号
- 与机构备案、机构注销等列表写法保持一致
## 预期效果
- 刷新证书列表后序号显示 1、2、3…，翻页后接着上一页编号
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`personnelCertificate/index.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话ID：c7022489-2172-47ce-8e1e-dcbd234762d8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_cert_index",
  "source_extraction_id": "304d2d75b409484e82e286701584b3b9",
  "version": 1,
  "memory_type": "entities"
}
-->