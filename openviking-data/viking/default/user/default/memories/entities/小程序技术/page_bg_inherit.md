# 全局页面背景色铺满修复
小程序根节点 min-height:100% 依赖父级高度致背景不铺满，改用 uni-page-body 100vh 加根节点 inherit 全局解决。

## 现象与根因
- 页面根节点写 min-height:100%，百分比高度依赖父级已解析高度
- 小程序/H5 的 uni-page-body 高度等于内容高度时，父级高度=内容高度，100% 退化，背景只铺到内容底部
- 属全局根节点高度链断裂，非单页样式写错

## 解决方案
- 非 H5 端给 uni-page-body 加 min-height:100vh 建立视口高度基准
- 页面根节点 uni-page-body > view/div 的 min-height 从 100% 改为 inherit 继承父级视口高度
- 公共根类(.container/.container-box/.index-page/.user-info-box/.setting-page 等)统一改 min-height:inherit
- 用 inherit 而非全写 100vh，避免白底页透明区露白，有背景色页彻底铺满

## 验证与归属
- 验证会话 f1b859df（基线 6aca310）：用户报 TypeChoose.vue 灰背景不满一屏，要求全局排查所有页面
- 涉及文件：zhi2-mobile-shimin/src/uni.scss、TypeChoose.vue、App.vue、setting/index.vue、FormLocal.vue
- 所属项目：苏住房C；代码基线：6aca310

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "page_bg_inherit",
  "source_extraction_id": "c00494ad0ab84ac6adf97c304d84084f",
  "version": 1,
  "memory_type": "entities"
}
-->