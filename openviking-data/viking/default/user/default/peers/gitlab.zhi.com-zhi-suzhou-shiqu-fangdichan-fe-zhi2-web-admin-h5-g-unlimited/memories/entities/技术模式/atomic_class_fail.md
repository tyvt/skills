
# zhi2-web-admin 原子类生成不全
该项目（门户 zhi2-web-admin）的 UnoCSS/Tailwind 对部分原子类生成不全，任意值类与部分间距/尺寸类未生效，需用内联样式兜底。

## 问题表现
- `w-[84px]`、`w-[46px]` 等任意值宽度类未生成，元素回退默认宽或被压缩（标签列 84px 实际渲染 70px）
- `gap-x-3`、`gap-y-5` 等间距类未生成，相邻元素贴边无间隙
- `aspect-square` 未生成，正方形容器宽度被压成 100px 导致饼图细小
- `h-full` 受父容器高度约束，尺寸被卡死

## 解决方案
- 改用内联 `style` 固定像素宽高与 margin/row-gap，绕过原子类生成依赖
- 示例：饼图容器 `style="width:172px;height:172px"`，图例列 `style="width:88px"`，数值 `style="width:54px;text-align:right"`

## 归属
- 发现场景：BuyerOverviewPanel.vue 图例/饼图布局调试（2026-11-04）
- 所属项目：门户 zhi2-web-admin


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "atomic_class_fail",
  "source_extraction_id": "074d316248104bb7b1d35c56ae13c0f2",
  "version": 1,
  "memory_type": "entities"
}
-->