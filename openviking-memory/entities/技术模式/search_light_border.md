# UnifiedLogin 顶部搜索框彩色光带边框
门户 UnifiedLogin 顶部搜索框的彩色旋转光带边框样式在本页维护，不在 index-new.vue 横幅。

## 样式事实
- 彩色 mask 光带边框样式位于 src/views/home/UnifiedLogin.vue 顶部搜索框
- 设计稿色阶：透明→#00C8FF→#01FF56→#FFAF36→透明
- 描边环宽度由 mask 的 padding 控制（如 2px）
- 周期由 animation 时长控制（如 4.5s）
- 若要在 index-new.vue 横幅复用同款，需显式拷贝同一套样式而非假设共用

## 验证与归属
- 验证证据：彩色环绕边框在该页不在 index-new.vue、padding 3px→2px、animation 3s→4.5s、刷新 /UnifiedLogin 查看
- 涉及文件：src/views/home/UnifiedLogin.vue、src/views/home/index-new.vue
- 所属项目：门户；来源会话：16ba347b-80c4-494d-b58c-7ecc0a738758；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_light_border",
  "source_extraction_id": "7540a34f05f848419ec0e5ae05fd41db",
  "version": 1,
  "memory_type": "entities"
}
-->