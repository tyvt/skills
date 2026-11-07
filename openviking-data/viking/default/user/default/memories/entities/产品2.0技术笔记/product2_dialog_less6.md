# 产品2.0 少字段详情改弹窗
产品2.0 中字段数少于等于 6 的子维护页改用 zs-dialog 弹窗承载，列表保留操作列。

## 适用场景
- 计费公式、物业收费标准、收支项目明细等字段很少（≤6）的页面。
- 字段多的业务（合同、入网、备案等）仍必须整页承载。

## 做法
- 同目录 components 下新建 XxxDialog.vue：zs-dialog + zs-size="mini"。
- 新增/编辑走 zs-form 表单，查看态复用 DetailTemplate 展示。
- 列表页新增/编辑/查看全改打开弹窗，保留搜索、分页、批量删除和操作列。

## 验证与归属
- 验证会话 25aa8b31：用户要求字段不超过6用弹窗，参考收支分类设置详情。
- 涉及文件：feeCalculateFormula/index.vue、detail.vue、pubBusinessItem/index.vue、ListTemplate.js、listMixins.js。
- 所属项目：产品2.0；代码基线：2f68042。

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术笔记",
  "name": "product2_dialog_less6",
  "source_extraction_id": "ebabd8f7ad774dafbc19579a0e860e5b",
  "version": 1,
  "memory_type": "entities"
}
-->