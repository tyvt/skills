# 苏住房工单分类诉求对象渲染修复（Bug #6071）
苏住房生产环境项目管理-马上办-工单分类页，报修分类列表的诉求对象曾与编辑弹窗不一致，已于 2026-11-03 修复闭环。
## 根因
- 报修分类诉求对象产品规则固定为「物业/物管会/业委会」，编辑弹窗 CategoryDialog 强制 applicableObjects=property。
- 列表页 requestObjectsFormatter 按后端历史数据渲染，历史报修分类 APPLICABLE_OBJECTS 存旧值 public,city,district…，命中 values.includes('public') 分支后一律显示「公开」。
## 修复方案
- 在工单分类列表 index.vue 的 requestObjectsFormatter 增加短路：categoryType === '2'（报修）直接展示「物业/物管会/业委会」，与编辑弹窗口径一致。
- 不改历史数据，避免影响其它消费方。
## 验证方式
- 构建后经 nginx 站点 8101 实测：报修分类（共用部分/共用设备/共用设施）诉求对象均显示「物业/物管会/业委会」；报事回归仍显示「公开」。
## 提交与回写
- 子模块 zhi2-web-admin 分支 develop/v2.6.2-suzhufang 提交 a8fc9c156 已推送。
- 父仓库苏住房G（gitlink）同分支提交 ac19c96 已推送。
- 禅道 Bug #6071 回写 resolved/fixed/trunk/tiany/zhunan，resolvedDate 2026-11-03 11:25:33。

<!-- MEMORY_FIELDS
{
  "category": "苏住房技术",
  "name": "workorder_category_fix",
  "source_extraction_id": "273974872d834310a09462546810c45b",
  "version": 1,
  "memory_type": "entities"
}
-->