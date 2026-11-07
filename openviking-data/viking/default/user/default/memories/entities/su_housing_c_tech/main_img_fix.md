# 主包图片误解析到分包路径修复
苏住房C 小程序主包静态图片因 resolveStaticUrl 按分包推断路径导致 500 错误，已通过主包清单优先加载修复。

## 问题根因
- `play.png`、`close.png`、`soldOut-shadow.png`、`default-avatar.png`、`default.png`、`aixin_r.png` 均位于主包 `src/static/images/`。
- `resolveStaticUrl` 根据当前页面分包自动推断路径，例如在 `pages_transaction/newHouse/detail` 页面将 `images/szf/soldOut-shadow.png` 解析为 `/pages_transaction/static/images/szf/soldOut-shadow.png`（错误），正确应为 `/static/images/szf/soldOut-shadow.png`。
- 分包目录无这些文件，微信开发者工具报 500。

## 修复方案
- 新增 `src/utils/mainStaticPaths.js`，维护主包 `static` 下全部资源路径清单。
- 调整 `resolveStaticUrl`：若资源在主包清单中，优先走主包 `/static/`，不被分包路由推断覆盖。
- 修正 `pages_owner` 中 3 处 `question.svg` / `ques...` 引用。

## 涉及文件
- `src/utils/mainStaticPaths.js`
- `src/utils/index.js`
- `src/components/commonNew/swiperComponent.vue`
- `src/components/collectBtn/collectBtn.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：b6ae18fa-c2e7-4036-8bde-244c6a95c718
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "main_img_fix",
  "source_extraction_id": "8742ccd3462a4edebd58a07c474a1c2d",
  "version": 1,
  "memory_type": "entities"
}
-->