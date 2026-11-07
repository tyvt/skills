# New house swiper null protection and unstable key crash
SuZhuFang C new house carousel component lacked null protection and used index as key, causing item undefined error in WeChat mini program after video insertion.

## Symptoms and Root Cause
- Carousel rendered item.fileSite without null protection; detail.vue pushed items one by one with :key="index" unstable
- In WeChat mini program, inserting video shifted indices, making item undefined and triggering property access error
- Pattern shared across swiperComponent.vue, detail.vue and multiple house detail pages

## Solution
- Use optional chaining item?.fileSite in template to avoid null crashes
- Change key to item.fileSite || index instead of pure index for stable identity
- Assign this.allImg = mediaList in one shot in detail.vue to avoid intermediate push states

## Verification and Attribution
- Verification evidence: src=苏住房C/063.md
- Involved files: src/components/commonNew/swiperComponent.vue, src/pages_transaction/newHouse/detail.vue, src/pages/commonNew/swiperComponent.vue, src/pages_transaction/stockHouse/detail.vue, src/pages_main/houseMap/components/NewHouse.vue, src/pages_transaction/newHouse/houseTypeDetail.vue, src/pages_transaction/buildingAlbum/index.vue, src/utils/index.js
- Project: SuZhuFang C; source session: db12bfb7-5b5d-404f-93cd-258941957c3c; code baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：db12bfb7-5b5d-404f-93cd-258941957c3c


<!-- MEMORY_FIELDS
{
  "category": "suzhufang_c_tech",
  "name": "swiper_null_key_bug",
  "source_extraction_id": "0424bc6fcd5a49b3a343fdf938f08ef6",
  "version": 1,
  "memory_type": "entities"
}
-->
