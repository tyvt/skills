# 列表滑动图片穿透底部固定栏
苏住房C新房详情页滑动时内容/图片盖到固定「购房咨询」底部栏上，由三层根因叠加导致。

## 现象
- 新房详情页上下滑动时，「户型介绍」等下方内容与图片会盖到固定的「购房咨询」底部栏上(穿屏)
- 滑到「项目周边」地图区域时更明显

## 根因
- 底部栏z-index:998太低，低于页面里部分浮层/图片的层级
- 底部栏组件被放在滚动内容容器内部，形成层叠上下文后跟着内容一起被后续节点覆盖
- 未处理底部安全区，底栏与内容留白都不足

## 修复做法与限制
- 全局底部栏bottomBtn.vue：z-index提到9999，加transform:translateZ(0)强制独立合成层，补env(safe-area-inset-bottom)
- 页面侧把<bottom-btn>移出滚动内容容器(与houseTypeDetail.vue保持一致)
- 内容底部留白改calc(120px + env(safe-area-inset-bottom))，内容根节点加position:relative;z-index:1
- 小程序原生map组件永远在最顶层，属已知限制，无法靠z-index解决，需单独降级方案

## 验证与归属
- 来源会话fb9e853d(基线77666f8)：用户报「新房详情，滑动的过程中会出现穿屏」
- 涉及文件：bottomBtn.vue、newHouse/detail.vue、houseTypeDetail.vue、ZsRichText.vue
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "bottom_bar_penetrate",
  "source_extraction_id": "91c4dec38b054bbba12cbff6d880442c",
  "version": 1,
  "memory_type": "entities"
}
-->