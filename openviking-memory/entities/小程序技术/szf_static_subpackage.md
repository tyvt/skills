# 小程序static路径解析不能只按当前页面路由推断分包
苏住房C小程序map找房页调 resolveStaticUrl 解析 images/szf/default.png 时报[渲染层网络层错误] Failed to load local image resource /pages_main/static/images/szf/default.png，HTTP 500，文件实际在 pages_transaction/static/images/szf/ 下。

## 根因
- resolveSubpackageForStatic 兜底 inferSubpackageFromRoute 取 getCurrentPages 最后一页路由首段当分包根
- images/szf/ 资源分散：pages_main 8个、pages_owner 22个、pages_vote 2个、pages_transaction 67个，同一张图在不同页面被推断到不同分包，跨分包引用必指到不存在路径
- 小程序对本地静态资源不存在返回500而非404，易误判服务端问题

## 解决方案
- 对多分包共存图片目录用显式文件名→分包映射表打底：utils/index.js 中 PAGES_MAIN_SZF_FILES/PAGES_VOTE_SZF_FILES/PAGES_OWNER_SZF_FILES 三个Set + resolveSzfImageSubpackage()，未命中默认落 pages_transaction；MAIN_STATIC_PATHS 收口主包专属路径
- 新增图片先确认落在哪个分包目录再决定是否补进映射表；组件侧（如collectBtn）未显式传subpackage时的默认值也要与映射表一致

## 验证与归属
- 验证：会话7f47849c报错Failed to load local image resource /pages_main/static/images/szf/aixin_g.png与default.png，状态500，文件实际在pages_transaction/static/images/szf/；修复为按文件名映射分包，修正collectBtn的imageSubpackage默认值
- 补充验证：会话 e3873d64（基线9832ba3）新房详情页 dianhua.svg/building_banner.png/dunpai.png 在 pages_transaction/static/images/szf/，ZsImage 未指定 subpackage 时 resolveStaticUrl 按主包前缀拼成主包路径致 500；在 utils/index.js 加 inferSubpackageFromRoute 按栈顶 route 首段推断分包修复；同批腾讯地图鉴权失败与图片无关
- 当前代码核实：utils/index.js:250-296三个Set+resolveSzfImageSubpackage，298-313 resolveSubpackageForStatic优先查表、最后inferSubpackageFromRoute；实测各分包static文件数pages_transaction 148、pages_tab 136、pages_owner 103、pages_owner_extra 45
- 涉及文件：src/utils/index.js、src/utils/mainStaticPaths.js、src/pages_main/houseMap/houseMap.vue、src/components/ZsImage/ZsImage.vue、src/components/collectBtn/collectBtn.vue
- 所属项目：苏住房C；来源会话ID：7f47849c-ba9e-4b0a-8c84-2445f8137134；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "szf_static_subpackage",
  "source_extraction_id": "c0fd305100de4799a4169c34e9bea617",
  "version": 2,
  "memory_type": "entities"
}
-->