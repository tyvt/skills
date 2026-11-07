# UnifiedLogin 顶部搜索框彩色光带边框
门户 UnifiedLogin 顶部搜索框的彩色旋转光带边框样式在本页维护，不在 index-new.vue 横幅。

## 样式事实
- 彩色 mask 光带边框样式位于 src/views/home/UnifiedLogin.vue 顶部搜索框
- 设计稿色阶：透明→#00C8FF→#01FF56→#FFAF36→透明
- 描边环宽度由 mask 的 padding 控制（如 2px）
- 周期由 animation 时长控制（如 4.5s）
- 若要在 index-new.vue 横幅复用同款，需显式拷贝同一套样式而非假设共用

## 实现原理
- 旧实现把旋转渐变放在搜索框后面，搜索框背景半透明 rgba(255,255,255,0.42)，渐变透入看起来像内部光束而非边框环绕
- 现改用 CSS mask 镂空边框：渐变只渲染在 3px 宽边框环、中间完全镂空；光带叠在搜索框上方（z-index:2）不再从内部透出
- 用 @property --border-angle 只旋转渐变角度，mask 形状保持固定，光带沿边框匀速绕行
- 微调项：padding 3px 控边框粗细、3s 控环绕速度、渐变色值控光带颜色

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：彩色环绕边框在该页不在 index-new.vue、padding 3px→2px、animation 3s→4.5s、刷新 /UnifiedLogin 查看
- 涉及文件：src/views/home/UnifiedLogin.vue、src/views/home/index-new.vue、src/components/zs-input/zs-input.vue
- 所属项目：门户；来源会话：16ba347b-80c4-494d-b58c-7ecc0a738758、b952859d-fcbb-4bce-b690-b2e5ad915c03；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_light_border",
  "source_extraction_id": "6be841ec78ce48ffbef96f1e28cec6ee",
  "version": 2,
  "memory_type": "entities"
}
-->