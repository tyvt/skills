# App.vue嵌入H5小区房屋信息初始化修复
无锡市区小程序嵌入H5在App.vue中新增initH5Context，修复嵌入场景未同步完整小区与房屋信息的问题。

## 根因
- App.vue在H5嵌入场景只写project与projectName，未通过setProjectInfo同步完整小区与房屋信息

## 修复方案
- 新增initH5Context：有token时拉取房屋列表getMyHouseList
- 有houseId：匹配房屋后调用applyHouseSelection写入regionName、subdistrictName、communityName、address等
- 有complexId：拉取小区列表后调用applyProjectSelection写入完整小区字段及关联房屋地址
- useProjectState.js新增applyHouseSelection，逻辑与newHome.vue一致，从房屋数据一次性写入全部userStore字段
- benefit/index.vue补全同步逻辑：找到当前小区时也同步setProjectInfo，保证projectAddress正确拼接

## 验证与归属
- 来源会话：ba74b018-bf87-4283-b5cd-cdbfcdac22a7；代码基线：none
- 涉及文件：src/App.vue、src/useProjectState.js、src/pages_owner/house/newHome.vue、src/pages_benefit/benefit/index.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "app_vue_h5_context_init",
  "source_extraction_id": "cf58481ce1b44a29b214f040fd405c89",
  "version": 1,
  "memory_type": "entities"
}
-->