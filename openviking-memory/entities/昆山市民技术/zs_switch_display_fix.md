# 小区资产开关显示异常修复
「小区资产」页面（物业服务项目资产公示 assetsPublicity）中 zs-switch 组件开关显示异常已修复。

## 问题原因
- 滑块尺寸：`aspect-ratio` 在小程序环境可能不生效，圆形滑块无法正确渲染
- 滑块位移：`translateX(calc(100% + 4rpx))` 仅按滑块自身宽度移动，无法滑到轨道右侧，易与文字重叠
- 文字对齐：`justify-content: center` 使「是/否」居中，未避开滑块区域

## 修改内容
- `zs-switch.vue`：滑块设固定宽高；改用 `left` 定位实现左右滑动；关闭态文字右对齐、开启态左对齐；设轨道最小宽度
- `assetsPublicity/index.vue`：删除未使用的 `.mid-switch` 冗余样式

## 验证与归属
- 所属项目：昆山市民；来源会话ID：3123da20-6d5f-4805-879f-6708af6c6456；代码基线：none
- 涉及文件：zs-switch.vue、assetsPublicity/index.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "zs_switch_display_fix",
  "source_extraction_id": "6cbdc70be8eb43dc9c57c1104ea75c4c",
  "version": 1,
  "memory_type": "entities"
}
-->