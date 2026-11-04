# 子包组件原生img相对路径必500
苏住房C 小程序子包组件内用原生 <img> + 相对路径写静态图必 500，须统一走 ZsImage/resolveStaticUrl 的分包感知解析。

## 问题现象
- pages_my/verification/AuthorizedSuccess 页面 UI 损坏，控制台报 Failed to load local image resource /components/shared/images/authorized.png status 500
- 同组件 fail/warning 分支用 ZsImage 正常，仅 success 分支坏

## 根因
- components/shared/SuccessCard.vue 的 success 分支用原生 <img src="images/authorized.png">
- 微信小程序里组件内相对路径按「组件所在目录」解析，拼成 /components/shared/images/authorized.png 不存在路径
- resolveStaticUrl 会按 MAIN_STATIC_PATHS 判断是否主包，否则查 SUBPACKAGE_STATIC_IMAGES 映射（images/authorized.png → ['pages_my','pages_owner']）并用 inferSubpackageFromRoute() 从 getCurrentPages() 栈顶 route 首段推断分包，最终拼成 /<分包>/static/<path>；原生 <img> 完全没有这层逻辑

## 解决方案
- 小程序内所有本地图一律用 ZsImage（或直接调 resolveStaticUrl），禁止原生 <img> + 相对路径
- 公共卡片多个状态分支要统一控件类型，避免只改到其中一支
- 该组件被 pages_owner 下多个成功页复用，改一处即全域生效

## 验证与归属
- 验证证据：会话 1b2ede19（基线 4630e8e）用户报 AuthorizedSuccess 页面 UI 损坏并贴出 500 日志；结论确认 SuccessCard.vue 的 success 分支用原生 <img> 导致相对路径按组件目录解析；核对当前代码 SuccessCard.vue 四分支均已改为 ZsImage，utils/index.js 的 resolveStaticUrl、resolveSubpackageForStatic、inferSubpackageFromRoute、分包映射均与描述一致
- 涉及文件：src/components/shared/SuccessCard.vue、src/components/ZsImage/ZsImage.vue、src/utils/index.js、src/utils/mainStaticPaths.js、src/pages_my/verification/AuthorizedSuccess.vue
- 所属项目：苏住房C；来源会话ID：1b2ede19-fcac-48a1-8f1a-9548ba379034；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_native_img_500",
  "source_extraction_id": "eb359f7e64864e958b7f30e05e2bdbc4",
  "version": 1,
  "memory_type": "entities"
}
-->