# 门户二级页与弹窗字段标签去全角冒号
门户二级页与弹窗里字段标签后的全角冒号已统一去掉。

## 修改范围
- 楼幢列表项目摘要（项目名称等）：PropertyPages.vue
- 存量房库存汇总：InformationPages.vue
- 经纪人员/门店/机构详情弹层：BrokerPages.vue
- 租赁合同查询结果：RentalPages.vue
- 公司/预售许可/房屋详情弹窗：PropertyDetailDialog.vue
- 租赁企业/人员/信用详情弹窗：RentalDetailDialog.vue

## 未改动项
- 公告正文元数据公文格式：【来源：…】【索引号：…】
- 查询结果文案：合同备案日期为：2026年10月4日
- 预售许可「房屋用途」区块：标题已是「住宅/非住宅」，明细只保留「面积…共…套」，去掉重复「住宅：」「非住宅：」
- 查询表单（可售房屋、合同备案、租赁查询等）本身无标签冒号

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 刷新页面即可生效；遗漏处可据页面路径或截图补改
- 涉及文件：PropertyPages.vue、InformationPages.vue、BrokerPages.vue、RentalPages.vue、PropertyDetailDialog.vue、RentalDetailDialog.vue
- 所属项目：门户；来源会话ID：2fd56787-bd18-4625-bb06-d6a35e3562b5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_field_label_colon",
  "source_extraction_id": "52c39ff7d9024162adeec53c60ddde30",
  "version": 1,
  "memory_type": "entities"
}
-->