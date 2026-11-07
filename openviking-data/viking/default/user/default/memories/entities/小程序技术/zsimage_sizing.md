# ZsImage尺寸须外层定尺寸盒子
ZsImage组件内部写死width/height:100%，页面直接挂固定尺寸class会被撑满父容器，必须外层包定尺寸盒子。
## 问题现象
- 「关于我们」页UI紊乱：logo-szf.svg（设计80×80）被拉满整屏宽度，底部联系信息错位
- ZsImage内部<image>设width:100%;height:100%，页面class="logo"优先级更低被吃掉
## 根因
- ZsImage本身无尺寸，尺寸完全由父盒决定；内部样式压过页面同名规则
## 解决方案
- 不在ZsImage上写尺寸class，改用固定尺寸容器包裹：logo用80×80px盒子、电话/地址图标用16×16px盒子
- ZsImage放在盒子里100%撑满即可，此为项目内cancellationWarning等已有页面既定写法
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；来源会话ID：cf3f235e-357f-45ef-a9c7-36f63007668f；代码基线：9832ba3
- 涉及文件：src/pages_main/about/AboutUs.vue、src/components/ZsImage/ZsImage.vue、src/static/images/logo-szf.svg

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsimage_sizing",
  "source_extraction_id": "81d7f40afe12428c8e47232291933096",
  "version": 1,
  "memory_type": "entities"
}
-->