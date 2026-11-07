# empty_house.png 分包迁移致主包路径失效修复
苏住房C `empty_house.png` 从主包迁移到分包后主包路径失效触发 500 错误，已统一分包解析逻辑。

## 问题根因
- `empty_house.png` 从主包 `static/images/` 迁至分包 `pages_transaction/static/images/`、`pages_owner/static/images/`，主包路径已不存在
- 代码引用 `images/empty_house.png`，`resolveStaticUrl` 未解析到分包时回退主包路径触发 500
- 生产构建 `./dist` 旧版本缺少 `SUBPACKAGE_STATIC_IMAGES` 分包回退逻辑

## 修复要点
- 统一 `ZsImage` 分包解析：移除组件内重复 `inferImageSubpackage`，全部交由 `resolveStaticUrl` 的 `SUBPACKAGE_STATIC_IMAGES` 处理
- `ZsEmpty` 支持 `subpackage` 属性并透传 `ZsImage`
- 交易/业主页面显式指定分包：`pages_transaction/*` 用 `subpackage="pages_transaction"`，`pages_owner/*` 用 `subpackage="pages_owner"`

## 涉及文件
- `pages_owner/components/house/HouseList.vue`
- `src/components/ZsEmpty/ZsEmpty.vue`
- `src/components/ZsImage/ZsImage.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：851aad11-4f50-47bb-a82c-ac1e0de178ab
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "empty_house_subpkg",
  "source_extraction_id": "ac50ecf9f90845419e67ae4bb989c614",
  "version": 1,
  "memory_type": "entities"
}
-->