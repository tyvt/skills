# ZsImage 分包路径推断错误致500（非szf通用）
苏住房C 中 ZsImage 未显式指定 subpackage 时，resolveStaticUrl 按当前页面路由推断分包，导致资源指向错误分包而 500。

## 现象与根因
- 页面 ZsImage 引用图标整块不显示，控制台报 Failed to load local image resource 状态 500。
- 根因：resolveStaticUrl 按当前页面路由推断分包，非文件真实位置；主包图标被 pages_vote 页面引用解析到子包致 500，子包图标被其他页面引用解析到主包丢图。
- 微信小程序对不存在的本地静态资源返回 500 而非 404，易误判服务端问题。

## 解决方案
- 跨页面共用图标加入 src/utils/mainStaticPaths.js 的 MAIN_STATIC_PATHS 白名单强制走主包；分包独有图标调用处显式传 subpackage="pages_transaction" 等。
- 引用页需显式注册 components:{ ZsImage }，绕开 easycom 在分支切换后失效导致的静默不渲染。
- 注意：resolveStaticUrl / subpackage / mainStaticPaths 属 shimin 端实现，同源于 C 的其它项目需先核对是否有同名机制。

## 验证与归属
- 验证证据：会话 65302824（主包图标加白名单）、5c003f25（ownerCard 导航图标与箭头 500，根因 ZsImage default local 按当前路由推断分包，补 subpackage="pages_owner" 后恢复）、b6ae18fa（play.png/soldOut-shadow.png/default-avatar.png 等主包图在分包页被推断成 /pages_x/static/ 返回 500，新增 mainStaticPaths.js 让 resolveStaticUrl 优先主包，并修正 pages_owner 中 3 处 question.svg 显式分包）、13824f1b（子包图标显式 subpackage+定尺寸容器修复）。
- 涉及文件：src/utils/mainStaticPaths.js、src/utils/index.js、components/ZsImage/ZsImage.vue、pages_owner_extra/ownerCard/index.vue、pages_vote/elect/detail.vue、pages_transaction/publishHouse/type.vue、pages_owner/house/owner/authentication.vue 等。
- 所属项目：苏住房C；来源会话ID：65302824-2836-4c68-a79c-8824fab43793, 5c003f25-6041-4bd4-854d-61f76247907c, b6ae18fa-c2e7-4036-8bde-244c6a95c718, 13824f1b-0d06-4c7a-8d3f-79edcf5ccfe4；代码基线：8fc3cc5、b7bf813、9832ba3。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_subpackage_path_inference",
  "source_extraction_id": "c0fd305100de4799a4169c34e9bea617",
  "version": 1,
  "memory_type": "entities"
}
-->