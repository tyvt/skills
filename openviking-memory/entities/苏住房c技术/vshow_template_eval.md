# v-show 不阻止模板求值致首屏渲染崩
苏住房C 新房详情页因 v-show 隐藏下模板仍求值、空数组下标取属性，首屏直接 TypeError 打不开。

## 问题现象
- pages_transaction/newHouse/detail.vue 报 TypeError: Cannot read property 'icon' of undefined
- 栈在 Proxy._sfc_render（渲染函数内），页面打不开

## 根因
- 模板写 :src="facilityCategory[activeCategory]?.icon"，facilityCategory 初始空数组，onLoad 才赋值，首屏 [0] 为 undefined
- 根节点用 v-show="showPage"，仅 CSS 隐藏，模板表达式照样求值（v-if 才阻止渲染）

## 解决方案
- 配置类常量直接在 data() 用导入配置初始化（如 facilityCategory: FACILITY_CATEGORY），消除首屏空数据窗口
- 模板取值统一加可选链 ?. 兜底边界
- 排查渲染期 undefined 时定位模板中 `xxx[i].yyy` 写法，看首屏数组是否有值，勿查接口

## 验证与归属
- 会话 7f29f06a（基线 4630e8e）：用户贴报错栈，修复为 data 初始化+可选链
- 涉及文件：src/pages_transaction/newHouse/detail.vue、src/utils/transaction.js、src/pages_transaction/stockHouse/detail.vue
- 所属项目：苏住房C；来源会话ID：7f29f06a-70ca-4db2-9199-e681d3284e78

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "vshow_template_eval",
  "source_extraction_id": "c383dd4637e24cfe83f7be5dd47bdfb2",
  "version": 1,
  "memory_type": "entities"
}
-->