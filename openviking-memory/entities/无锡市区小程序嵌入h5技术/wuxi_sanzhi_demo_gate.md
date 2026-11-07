# 无锡三资监管演示门禁
无锡小程序嵌入H5在对外演示时未登录仅允许访问newHome极简门户，移除TabBar后401统一reLaunch回首页。

## 场景与需求
- 小程序嵌入H5需对外展示极简门户，未登录不能进业务页
- 若需「无论有无Token都只能看首页」需再收紧拦截逻辑

## 实现要点
- `App.vue` 全局路由拦截：无Token时只允许 `/pages/index/newHome`，否则 `uni.reLaunch` 回首页
- 有Token时保留正常嵌入访问
- `newHome.vue` 仅居中展示「无锡三资监管」文案，去掉轮播/菜单/接口
- `pages.json` 将newHome设为启动页并去掉TabBar
- `api/index.js` 的401处理改为reLaunch到newHome（因已无TabBar）

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：092e322c-b977-4c98-acfd-3459f57a3abb
- 代码基线：2e9862a
- 涉及文件：src/App.vue、src/pages/index/newHome.vue、src/pages.json
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "wuxi_sanzhi_demo_gate",
  "source_extraction_id": "259ccd137522413f8a275a710d09c982",
  "version": 1,
  "memory_type": "entities"
}
-->