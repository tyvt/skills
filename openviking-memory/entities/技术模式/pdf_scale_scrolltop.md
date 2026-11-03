# 多页PDF缩放scrollTop问题
i淮安H5 多页 PDF 缩放因未计入 scrollTop 以文档顶部为基准导致画面跳页。

## 现象
- 多页 PDF 缩放仅按屏幕坐标计算，未计入 scrollTop，导致以文档顶部为基准缩放而画面跳页

## 解决方案
- 双指缩放与双击放大时将滚动距离换算进 translate
- 以手指或点击中心为锚点进行缩放
- 缩放过程中锁定页面滚动，还原时滚回原位置

## 验证与归属
- 验证：src=i淮安H5/001.md
- 涉及文件：src/pages/index/propertyMenuConfig.js、src/pages_owner/company/info/contracts.vue、src/pages_owner/company/info/index.vue、src/components/FileList/Type2.vue、src/utils/index.js、src/api/common.js、src/components/FileList/FileList.vue、src/env/mp.js
- 所属项目：i淮安H5；来源会话：2e69c567-5946-4947-85a3-4f0ff815c7c5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pdf_scale_scrolltop",
  "source_extraction_id": "9505a034bcf340cb94beac01c0553352",
  "version": 1,
  "memory_type": "entities"
}
-->