# 操作列固定宽度致留白过多
AgencyPersonnelList.vue 中 zs-operate-column 固定宽度 :width="480" 导致操作列留白多，移除该宽度后由组件按按钮文字自动计算列宽，保留 show-all 使按钮平铺不换行。

## 问题现象
- AgencyPersonnelList.vue 给 zs-operate-column 绑定固定 :width="480"
- 操作列按钮实际所需宽度远小于 480px，产生大量留白

## 修复方案
- 移除 :width="480" 绑定，改由 zs-operate-column 组件按按钮文字自动计算列宽
- 保留 show-all 属性使按钮平铺不换行

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/137.md
- 涉及文件：AgencyPersonnelList.vue、zs-operate-column.vue、package.json、e2e/institution/agency-personnel-real-api-flow.spec.js、vite.config.js、e2e/fixtures/institution-menu-config.js、institution-helpers.js、auth-helpers.js
- 所属项目：苏州市房地产监测V3；来源会话：c07f2835-00f4-4f26-8f40-499ded465259；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_whitespace",
  "source_extraction_id": "c15196f322ff4716b99fce5066c00e99",
  "version": 1,
  "memory_type": "entities"
}
-->