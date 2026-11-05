# 企业联系电话字段添加并合并
苏住房C子模块zhi2-mobile-shimin及父仓库新增企业联系电话字段(legalPersonPhone)并完成分支合并。

## 修改内容
- 子模块 `zhi2-mobile-shimin` 提交 `eef29d34` 于分支 `sfb`：feat(company): 物业服务企业信息新增企业联系电话字段
- 合并至 `suzhou-shiqu-suzhufang-main-v2.1` 提交 `9027ea0a`
- 父仓库 `zhi2-mobile-shimin-h5-zhishu-c-unlimited` 更新子模块引用提交 `bb01ec5` 于 `dev-sfb`，合并 `372fe3d`
- 合并冲突已手动将子模块指向 main-v2.1 合并提交

## 关键文件
- `src/pages_owner/company/info/index.vue`
- `src/api/property.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：a3ca1807-5aa2-4601-8e21-e239241b4895
- 当前本地分支：`dev-sfb`
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "legalpersonphone_field_add",
  "source_extraction_id": "4a5cd770e47e42c0a4dc5f927600c595",
  "version": 1,
  "memory_type": "entities"
}
-->