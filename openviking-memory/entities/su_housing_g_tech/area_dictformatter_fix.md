# 行政区划 dictFormatter 回显改用全量区划数据
苏住房G(zhi2-web-admin) 行政区划回显数据原按默认行政区划代码过滤，已改为使用全量区划数据并合入 develop/v2.6.2。

## 修复内容
- src/main.js、src/mixins/area.js 调整 dictFormatter 回显逻辑，改用全量区划数据
- 子模块 zhi2-web-admin：develop/v2.6.2-suzhufang 提交 b4b5194e5，develop/v2.6.2 提交 3188aaa59（cherry-pick）
- 父仓库 苏住房G：develop/v2.6.2-suzhufang 提交 25c5b47，develop/v2.6.2 提交 edf708f
- 合入 develop/v2.6.2 时对子模块采用 cherry-pick 本次修复提交，避免无关文件冲突；本地已切回 develop/v2.6.2-suzhufang 继续开发

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：src/main.js、src/mixins/area.js、src/utils/tencentDistrictBoundary.js
- 来源会话ID：fd340866-6c8e-45fa-b262-2587b2f68ca9

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "area_dictformatter_fix",
  "source_extraction_id": "f6f0729ae96445aa9abdeb6bd96896bb",
  "version": 1,
  "memory_type": "entities"
}
-->