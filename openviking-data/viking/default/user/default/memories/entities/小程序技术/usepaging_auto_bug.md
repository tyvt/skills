# 分页hook自动请求早于onLoad设参致接口未调用
苏住房C新房列表因usePaging默认auto:true在onLoad读参前发请求，导致参数错或似未调用接口。

## 问题现象
- 新房列表参数写URL query（type=1/2等），进入页面列表无数据，用户确认「没调用接口，后台有数据」
- 户型集锦、最新楼盘、在售楼盘同族页面均有此问题

## 根因
- usePaging默认auto:true在onLoad读type前发首次请求，专用参数（如halfYearAgo）落默认值0，正确值应为1，请求参数错或像没请求
- 页面内跳转手工拼`indexMore?type=1?type=2`二次问号致参数乱

## 解决方案
- 依赖onLoad解析参数的列表页统一设auto:false，在onLoad赋值后显式refresh()
- 跳转改用菜单/卡片配置里的row.url，不手工拼二次问号
- 全局排查同类页一次改完；联调时「请求已发但列表空」可能是环境数据问题：halfYearAgo=1返0条、=0返132条，需看total并让后端确认口径

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话65dd03cf用户报新房列表接口未加载→全局排查→改indexMore为auto:false且onLoad设type后refresh，跳转用row.url；实测halfYearAgo=1返0条、=0返132条
- 涉及文件：src/pages_transaction/newHouse/index.vue、indexMore.vue、src/hooks/usePaging.js、src/api/httpInstance.js、src/api/transaction.js、src/pages_tab/components/Project_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：65dd03cf-f8dc-4995-a394-050462f88b56；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "usepaging_auto_bug",
  "source_extraction_id": "1d9fd369a2874e6797cb9e988e9c0653",
  "version": 1,
  "memory_type": "entities"
}
-->