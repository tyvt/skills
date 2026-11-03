# RegionTabs 整卡横滚与标签内横滚分离
苏住房G 首页 v2 窄屏下「整卡横滚」与「只在标签行内滚」不能统一处理，需 RegionTabs embedInParentScroll 开关加父容器 min-width:0。

## 问题场景
- 首页 v2（index-v2.vue 及 KeyDataNav、CheckDataNav、SectionCard、RegionTabs）窄屏内容溢出丢失
- 第一版统一加 body-scroll-x + 内部 min-width:960px 整卡横滚，检查数据卡片被撑极宽、半宽栅格全乱，用户明确否掉

## 根因
- 整卡 min-width 把 flex/grid 列撑破，卡片不再随栅格列收缩
- flex 子项默认 min-width:auto，即使父级再窄 Tab 列表也不收缩，永远触发外层溢出，内部滚变整卡撑宽

## 解决方案
- 关键数据导航=整卡横滚：body-scroll-x + 指标行横滚，RegionTabs 传 embed-in-parent-scroll=true 共用同一条滚动条
- 检查数据导航=局部横滚：去掉 body-scroll-x 与 cd-inner 的 min-width，RegionTabs 默认 embedInParentScroll=false，只在 .rt__list 上 overflow-x:auto 标签行内横滑
- SectionCard 的 .sc__bd 补 min-width:0，半宽栅格下 Tab 列表才真正收缩并出现内部滚动

## 判据与验证
- 判据：想让内容内部滚，从最内层滚动容器到栅格列整条链都不能有 min-width/固定宽，否则溢出向上传递
- 验证证据：会话 b3c7bed2，用户先要求小屏横向滚动，二次反馈「检查数据导航不要按此方式处理，选择区域超出内部滚动、整区域太宽布局乱」
- 涉及文件：home/index-v2.vue、v2/components/RegionTabs.vue、SectionCard.vue、KeyDataNav.vue、CheckDataNav.vue
- 所属项目：苏住房G；代码基线：9e5c499；来源会话：b3c7bed2-97b5-4eae-818f-761a098b5431

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tabs_scroll",
  "source_extraction_id": "cf02b3f3f9344491b308ce9fec4efa24",
  "version": 1,
  "memory_type": "entities"
}
-->