# ZsImage分包路径自动推断修复
苏住房C小程序中因静态资源主包路径解析错误导致图片加载500，已通过路由自动推断分包修复。

## 问题原因
- `dianhua.svg`、`building_banner.png`、`dunpai.png` 实际在分包 `pages_transaction/static/images/szf/` 下
- `ZsImage` 未指定 `subpackage` 时，`resolveStaticUrl` 解析成主包路径，主包无这些文件返回500

## 修复内容
- 在 `resolveStaticUrl` 中增加路由自动推断：当前页面在 `pages_transaction`、`pages_owner` 等分包内时自动使用对应分包 `static` 目录
- 修改文件：`src/utils/index.js` 新增 `inferSubpackageFromRoute` 函数（约111-135行）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/utils/index.js`、`Project_Suzhufang.vue`、`manifest.js`、`ZsMap.vue`、`manifest.json`、`utils/file.js`
- 来源会话ID：e3873d64-6106-455a-aff6-e426cf0638d1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zsimage_subpackage_infer_fix",
  "source_extraction_id": "f112774c505640e3b6c48d36ad3aaf81",
  "version": 1,
  "memory_type": "entities"
}
-->