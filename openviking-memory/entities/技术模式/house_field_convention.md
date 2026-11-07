# houseNum 字段命名与必填约定
惠山二期G 后台楼栋房产相关表单 houseNum 字段与后端命名一致且未设必填，ESLint 无报错，风险提示须无障碍关联。

## 字段约定
- house/detail.vue、houseChange/detail.vue、houseChange/index.vue 内 houseNum 表单及列表字段与后端命名一致。
- houseNum 未设必填，ESLint 无报错。

## 无障碍要求
- form-tip 风险提示文案须与输入框通过 aria-describedby 建立无障碍关联。

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证证据：src=惠山二期G/008.md
- 涉及文件：zhi2-web-admin/src/views/building/house/detail.vue、building/houseChange/detail.vue、building/houseChange/index.vue、building/unitChange/detail.vue、package.json
- 所属项目：惠山二期G；来源会话：88de92b5-3f00-4807-b98d-08daf1365189；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_field_convention",
  "source_extraction_id": "e65d0db6f82a47e2b9b2a6cb82142971",
  "version": 1,
  "memory_type": "entities"
}
-->