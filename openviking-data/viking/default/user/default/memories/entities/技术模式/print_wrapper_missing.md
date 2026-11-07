# 打印配置页缺包裹层致左侧树被挤隐藏
打印配置页 list-card 直接置于 list-container 占满整行，挤压 200px 宽的 menu-tree 致其被隐藏。

## 问题根因
- 打印配置页 list-card 直接置于 list-container 占满整行
- 挤压 200px 宽的 menu-tree 左侧树，导致其被隐藏不可见

## 解决方案
- 参照 fjflpz/index.vue 结构，为 list-card 与 PrintDialog 增加 table-container 包裹层
- table-container 设 width: calc(100% - 200px)，预留菜单树宽度

## 验证与归属
- 验证：extracted source=cursor session=e60200f4-3211-4dd2-b804-4418f9454b81
- 涉及文件：tool/print/index.vue、components/MenuTree/index.vue、property/chargeManage/chargeItem/index.vue、layout/index.vue、tool/fjflpz/index.vue、tool/file/index.vue、tool/workflow/index.vue、App.vue
- 所属项目：泰兴G/zhi2-web-admin；代码基线：none；来源会话：e60200f4-3211-4dd2-b804-4418f9454b81

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "print_wrapper_missing",
  "source_extraction_id": "b6ef5637059a4f3f841af431095bf281",
  "version": 1,
  "memory_type": "entities"
}
-->