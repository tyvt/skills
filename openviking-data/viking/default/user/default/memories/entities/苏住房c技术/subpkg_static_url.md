# 分包静态资源须用resolveStaticUrl解析
苏住房C分包内WXSS引用本地图片因路径错误报无法通过WXSS获取，须用resolveStaticUrl按分包名拼路径。
## 问题现象
- 控制台报「pages_owner/ownerCard/index.wxss中的本地资源图片无法通过WXSS获取」
- 指向background-image:url("../static/images/szf/Bg.svg")
- 改用@/static/images/szf/Bg.svg后node层报找不到模块
## 根因
- Bg.svg实际在分包目录pages_owner/static/images/szf/Bg.svg，不在主包src/static
- @/别名固定指向src，拼出主包路径文件不存在
- WXSS写相对路径违反小程序「WXSS不能引用本地图片」限制
## 解决方案
- 分包资源统一用resolveStaticUrl('images/szf/Bg.svg','pages_owner')按分包名拼出/pages_owner/static/images/szf/Bg.svg
- 背景图在script先算URL再绑style（backgroundImage），不写wxss的url()
- 先确认资源在主包src/static还是分包static：主包可跨分包引用，分包只能本包用
- 同页已用resolveStaticUrl的图标（如questionIcon）当模板参考，新增照抄
## 验证与归属
- 会话ec20b896：ownerCard/index.wxss报本地资源图片无法获取，Bg.svg位于分包static，@/static找不到；改为resolveStaticUrl
- 涉及文件：src/pages_owner/ownerCard/index.vue、src/utils/index.js、src/pages_owner/static/images/szf/Bg.svg
- 所属项目：苏住房C；来源会话ID：ec20b896-8b24-4392-8c67-822594278f60；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpkg_static_url",
  "source_extraction_id": "1d069700b22d47f4910ca8e2360f52a7",
  "version": 1,
  "memory_type": "entities"
}
-->