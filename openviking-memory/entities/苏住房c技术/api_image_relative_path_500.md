# 接口图片相对路径须补全域名
苏住房C 小程序把以 / 开头的接口图片地址当包内资源加载致 500，须先经 resolveFullMediaUrl/resolveMediaUrl 补全域名或改用 ZsImage。

## 问题现象
- 用户上传头像后「我的」页报 Failed to load local image resource /zhi2-pro/2026/.../xxx.png the server responded with a status of 500
- 个人信息页（userInfo.vue）同一头像正常显示

## 根因
- 接口返回的头像等图片字段是文件服务相对路径（以 / 开头，如 /zhi2-pro/...）
- 微信小程序把「以 / 开头的 src」优先解释为小程序包内本地资源，不走网络请求，渲染层打本地文件返回 500
- userInfo.vue 用 <ZsImage :local="false">，组件内部拼 IMAGE_BASE 输出完整 https 地址故正常
- 与「静态资源按分包推断」是两类不同问题：前者 src 是服务端相对路径漏了域名，后者是本地 static 包路径推断错

## 解决方案
- 凡绑定接口返回的图片字段（头像、房源图、证件照）一律先过 resolveFullMediaUrl()/resolveMediaUrl() 转成完整 URL 再用，或统一改用 <ZsImage :local="false">
- 不要在模板里把接口字段直接塞进原生 <image>
- 排查口径：看到 Failed to load local image resource + 路径形如服务端目录（/zhi2-pro、/zs-fym）即可判定为漏拼域名
- 补完域名后仍不显示，再检查微信开发者工具 downloadFile 合法域名是否包含该图片域名

## 验证与归属
- 验证证据：会话 785096f4（基线 4d6dba9）用户贴出 Failed to load local image resource /zhi2-pro/... 500 并说明上传头像后被当本地图片；结论 My_Suzhufang.vue 原生 <image> 直接绑 userStore.avatar 是错误写法，userInfo.vue 因 ZsImage :local="false" 正确；修复为改用 resolveFullMediaUrl() 解析，失败时再查 downloadFile 合法域名
- 涉及文件：src/pages/index/components/My_Suzhufang.vue、src/pages_my/setting/userInfo.vue、src/components/ZsImage/ZsImage.vue、src/utils/index.js、src/env/mp.js
- 所属项目：苏住房C；来源会话ID：785096f4-4ab9-4c30-b361-cd9f73a774e6；代码基线：4d6dba9

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "api_image_relative_path_500",
  "source_extraction_id": "eb359f7e64864e958b7f30e05e2bdbc4",
  "version": 1,
  "memory_type": "entities"
}
-->