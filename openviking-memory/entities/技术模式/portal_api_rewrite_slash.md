# 门户接口重写前导斜杠归一化
产品2.0 后台通过 portalApiRewrite.js 把旧 system/* 接口重写到门户 /portal/* 前缀，匹配前须补全前导斜杠否则懒加载路径静默漏匹配。

## 问题现象
- 部门管理页懒加载展开子部门时请求旧接口 /system/dept/list?parentId=100，重写规则没命中
- 懒加载路径写成不带前导斜杠的 `system/dept/list`，而映射表按「以前导 / 开头的完整路径」精确匹配，缺斜杠直接漏匹配且不报任何错误

## 解决方案
- 重写器内部在匹配前自动补全前导 /（normalize），让带不带斜杠都能命中
- 页面侧按约定统一拼 `/${moduleName}/${businessName}/${apiSuffix}` 生成路径
- 排查同类问题：某接口「明明配了重写却没生效」先打印实际发出的 path 字符串，核对首字符是不是 /

## 涉及与来源
- 涉及文件：zhi2-web-admin/src/utils/portalApiRewrite.js、zhi2-web-admin/src/views/system/dept/index.vue
- 所属项目：产品2.0；来源会话：06d23df6-d9e0-472b-bdcb-895195ece6ab；代码基线：eab0458

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_api_rewrite_slash",
  "source_extraction_id": "539ec7c1bcb244a59f86e9efe4783557",
  "version": 1,
  "memory_type": "entities"
}
-->