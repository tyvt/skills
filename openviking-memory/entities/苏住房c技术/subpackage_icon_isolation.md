# 分包页面跨包引用图标不显示
苏住房C 移动端「电子业主卡」页面图标全不显示，根因为微信分包隔离限制，须复制资源到本分包并改 subpackage。

## 问题现象
- pages_owner_extra 分包的「我的→电子业主卡」页面功能入口图标、箭头、背景图全部不显示
- 路径用 subpackage/resolveStaticUrl 拼出来完全正确，开发者工具里也能找到文件，但真机加载失败

## 根因
- 微信小程序限制分包页面不能引用其他分包的静态资源，资源不在当前分包产物里则加载必失败
- scoped 样式穿不透 ZsImage 内部 img，图标即使加载出来尺寸也是错的

## 解决方案
- 把图标资源整体复制到当前分包自己的 static 目录（images/xxx.png、icon/xxx.svg、背景 svg、箭头小图标一并复制）
- 把 ZsImage 的 subpackage 从源分包改为当前分包，背景图与图标走 resolveStaticUrl 的地方同步改
- 用 :deep() 修图标尺寸样式
- 心智模型：页面在哪个分包，静态资源就必须在该分包或主包 src/static 下

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 9b333521 用户报电子业主卡图标不显示；结论复制 owner_nav_1~3.png/jiantou.png/question-dark.svg/Bg.svg 到 pages_owner_extra/static/，subpackage 从 pages_owner 改为 pages_owner_extra 并同步 resolveStaticUrl，加 :deep() 修尺寸
- 涉及文件：src/pages_owner_extra/ownerCard/index.vue、src/pages_owner/ownerCard/index.vue、src/pages.json
- 所属项目：苏住房C；来源会话ID：9b333521-93bd-4e07-8e91-b6a53dcd962f；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_icon_isolation",
  "source_extraction_id": "d03b04d8de7b4dfa8319ee812c43be64",
  "version": 1,
  "memory_type": "entities"
}
-->