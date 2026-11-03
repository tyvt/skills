# ZsImage图标塌陷为0加卡片被压窄
苏住房C业主端认证页选项卡片不铺满、右侧单选圆圈不可见，由三处独立原因叠加。

## 问题根因
- ZsImage内部width/height:100%只填父容器无固有尺寸，TitleCard右侧插槽无确定高度解析为0×0
- .page-container用align-items:center使flex交叉轴居中收紧子项宽度
- 按钮挂通用long类（宽88%）在满宽布局留白

## 解决方案
- 给ZsImage/ZsIcon类组件父容器补固定尺寸如.icon-slot{width:20px;height:20px}
- 满宽flex纵向容器不写align-items:center直接width:100%
- 满宽场景按钮改用width:100%不复用long类

## 验证与归属
- 验证会话：b057f782，用户贴图指出宽度不对选择框看不见
- 涉及文件：zhi2-mobile-shimin/src/pages_owner/house/owner/authentication.vue、src/pages_owner/house/components/TitleCard.vue、src/pages_owner/house/addTypeChoose.vue、src/components/ZsImage/ZsImage.vue
- 代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsimage_collapse_bug",
  "source_extraction_id": "2b4445ef78724ef68f75a93c4eeae34d",
  "version": 1,
  "memory_type": "entities"
}
-->