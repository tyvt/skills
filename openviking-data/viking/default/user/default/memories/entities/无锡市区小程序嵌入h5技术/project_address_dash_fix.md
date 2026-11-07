# projectAddress显示为横杠修复
无锡市区小程序嵌入H5修复小程序嵌入时projectAddress因区划字段为空而显示"-"的问题。

## 根因
- projectAddress原先只拼接userStore的regionName、subdistrictName、communityName
- 小程序嵌入H5时App.vue往往只写project和projectName，区划字段为空，拼接结果为空字符串，模板显示"-"

## 修复方案
- 多级回退显示：优先区-街道-社区，其次userStore.address，最后从houseList取当前小区对应房屋信息
- 页面onShow时若上述字段都为空且已登录，调用房屋/小区接口通过applyHouseSelection或applyProjectSelection写入userStore
- 补全逻辑与App.vue的H5初始化一致

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：c484b1ef-d8e5-4052-a213-4476498f8145；代码基线：none
- 涉及文件：src/App.vue、src/pages_benefit/benefit/index.vue、src/store/user.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "project_address_dash_fix",
  "source_extraction_id": "cf58481ce1b44a29b214f040fd405c89",
  "version": 1,
  "memory_type": "entities"
}
-->