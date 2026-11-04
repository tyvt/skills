# Property supermarket thumbnail missing overflow causes watermark overflow
In the 苏住房C mobile end property supermarket list page, the thumbnail container lacked overflow:hidden and fixed dimensions, causing the watermark large image to overflow into the right-side text area.

## Root Cause
- WeChat mini program `<img>` object-fit:cover / mode='aspectFill' does not take effect
- The supermarket logo used HTML `<img>` with invalid mode='aspectFill', so the large image rendered at original size and overflowed into a gray ring watermark
- The property supermarket list page thumbnail container lacked overflow:hidden and fixed dimensions
- This caused the watermark large image to overflow into the right-side text area

## Solution
- Add overflow:hidden and fixed dimensions to the container
- Switch to the `<image>` component

## Verification and Attribution
- Evidence: src=cursor session=8c3976ef-34b9-45cd-8872-edd95968dc75 and session=9576e757-ad86-4348-8122-af82c2ba31b7
- Files (session 8c3976ef): pages.json, pages_transaction/houseSupermarket/index.vue, components/ZsImage/ZsImage.vue, utils/index.js, pages_transaction/service/bankList.vue, pages_transaction/goodProject/index.vue, uno.config.ts, env/mp.js
- Files (session 9576e757): pages_transaction/houseSupermarket/index.vue, components/ZsImage/ZsImage.vue, utils/index.js, pages_transaction/service/bankList.vue, pages_transaction/houseSupermarket/detail.vue, pages_tab/components/Property_Suzhufang.vue
- Project: 苏住房C (zhi2-mobile-shimin); source sessions: 8c3976ef-34b9-45cd-8872-edd95968dc75, 9576e757-ad86-4348-8122-af82c2ba31b7; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "supermarket_thumb_overflow",
  "source_extraction_id": "5edfa1599d644844a125308dfde52d91",
  "version": 2,
  "memory_type": "entities"
}
-->