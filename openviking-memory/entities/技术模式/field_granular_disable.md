# 置灰逻辑按字段粒度判定
业主自治-物管会变更页需按字段逐个控制可编辑性，且置灰字段仍保留只读导航能力，不能一刀切或删跳转入口。

## 问题背景
- autonomy/change/property/detail.vue 中「物业管理区域名称」与「任职起止日期」两个字段的禁用状态写反了
- 与产品确认：变更态下区域名称必须置灰不可编辑，任职起止日期反而可编辑
- 常见误伤是把「禁用」做成了「连跳转也一起干掉」

## 解决方案
- 按字段逐个下 disabled：区域名称 zs-input 直接 disabled，任职起止日期 zs-date-picker 去掉 disabled，仅 add/edit 可改
- 置灰字段仍保留只读导航：点击只调 goToComplexDetail()（有 complexId 才跳区域详情），把编辑态 openSelectDialog() 从点击链路摘掉
- 查看态照旧走 DetailTemplate 分支不动，禁用与「查看态渲染」是两条独立链路
- openSelectDialog 方法可保留（新增变更仍靠物管会编号 + setOwner 回填区域），不要因移除点击调用就连方法删

## 验证与归属
- 验证证据：会话 254661f7 用户贴图指出置灰反了并给出产品口径，最终按上述修改
- 涉及文件：zhi2-web-admin/src/views/autonomy/change/property/detail.vue、zhi2-web-admin/src/views/autonomy/change/property/index.vue、zhi2-web-admin/package.json、zhi2-web-admin/src/views/autonomy/change/industry/detail.vue、zhi2-web-admin/src/views/autonomy/change/supervisory/detail.vue、zhi2-web-admin/src/views/autonomy/record/components/detail.vue、zhi2-web-admin/src/mixins/detailMixins.js、zhi2-web-admin/src/views/autonomy/regulation/change/detail.vue
- 所属项目：苏住房G；来源会话ID：254661f7-ea9b-45c8-84f6-063fdca139f1；代码基线：4f7c2c3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "field_granular_disable",
  "source_extraction_id": "b2ccd8c8a7544a0a964a644555f9bb44",
  "version": 2,
  "memory_type": "entities"
}
-->