# 小程序背景图改用 PageBg 组件
苏住房C 小程序中装饰性背景图禁止手拼内联 :style backgroundImage url(相对/静态资源路径)，应统一使用项目 PageBg 组件。

## 问题根因
- house/index.vue 与 TypeChoose_Suzhufang.vue 把装饰背景改成内联 :style="{ backgroundImage: url(...) }"，微信端整块背景消失（城市剪影、白色胶囊、蓝色弧形表头），H5 可能正常。
- 小程序渲染层对 background-image+url() 支持不完整，相对路径不被 Vite 处理，运行时拼成相对路径或丢弃，控制台不一定报错。
- 非「内联 style 一律不可用」：data:image/svg+xml 水印由工具函数生成可行，禁的是手拼相对/静态资源路径。

## 解决方案
- 装饰背景统一用 src/components/PageBg/PageBg.vue，传相对资源路径，内部走静态资源解析。
- 固定尺寸横幅给 PageBg 定高外层，避免 inset:0+cover 被 flex:1 拉满。
- tenant/index.vue 等兄弟页同批改成同一方案，避免一页两种画法。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 41740334（2026-08-25，基线 5f0f4dc）用户报「我的房屋缺少样式、表头样式丢失」，修复为三页统一 PageBg；TypeChoose_Suzhufang.vue 还丢 ZsNav 导航栏。
- 涉及文件：zhi2-mobile-shimin/src/pages_owner/house/index.vue、TypeChoose_Suzhufang.vue、tenant/index.vue、src/components/PageBg/PageBg.vue。
- 所属项目：苏住房C；来源会话ID：41740334-7cda-42d7-b1c3-97712e6c8e6a；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "miniprogram_bg_pagebg",
  "source_extraction_id": "43f131e44907422ab73f0bd6432bc67f",
  "version": 1,
  "memory_type": "entities"
}
-->