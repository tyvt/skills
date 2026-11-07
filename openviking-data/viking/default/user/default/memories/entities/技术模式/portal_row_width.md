# 门户首页上下栏列宽模型对齐
index-new 顶栏与底栏列宽模型不一致会导致上下栏不对齐。

## 现状差异
- 顶栏 grid-template-columns: max-content minmax(359px, 1fr)，宽度由流程区 intrinsic 决定
- 底栏仍为 665fr / 359fr，左右分界不再共用同一比例
- 设计稿 1024 下右侧栏宽易与底栏 359 比例不一致

## 修复方向
- 若产品要求上下栏线对齐，需统一两行列宽模型（如顶栏也用底栏 fr 比例，或业务区 minmax(0,…)+内部滚动）
- 不要只改 flow-steps 宽度

## 验证与归属
- HIGH：top-row 为 max-content + minmax(359,1fr)，bottom-row 仍为 665fr/359fr，左右边界不再共用同一比例
- 文件：src/views/home/index-new.vue、src/layout/index.vue；项目：门户；会话：0a743a90-328f-4c94-9f35-0f8b4f911423；基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_row_width",
  "source_extraction_id": "ebc898f91d76487682d9f8c6657d78bd",
  "version": 1,
  "memory_type": "entities"
}
-->