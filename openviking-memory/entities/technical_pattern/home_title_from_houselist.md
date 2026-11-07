# Home Title From HouseList
DisplayHouseTitle and displayHouseSubTitle in home.vue now read from userStore.houseList[0] with fallback texts.

## Source Files
- zhi2-mobile-admin-h5-c-unlimited/src/pages/index/home.vue
- src/App.vue, src/store/user.js, src/pages/index/useProjectState.js, src/pages/index/property.vue

## Behavior
- displayHouseTitle takes userStore.houseList[0].complexName, fallback "我的房屋"
- displayHouseSubTitle takes userStore.houseList[0].address, fallback "请选择房屋"

## Verification
- Evidence: src=i淮安公版/002.md
- Source session: 888c04f6-7ea6-471f-a22f-fd6d92d637f3

## 验证与归属
- 所属项目：i淮安公版
- 验证证据：extracted source=cursor project=i淮安公版
- 来源会话：888c04f6-7ea6-471f-a22f-fd6d92d637f3


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "home_title_from_houselist",
  "source_extraction_id": "2bcf1d30c3a547de9ea1ba2aa3fb1c87",
  "version": 1,
  "memory_type": "entities"
}
-->
