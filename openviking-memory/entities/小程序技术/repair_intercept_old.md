# 报事报修拦截失效因开发者工具跑dist/dev旧包
苏住房C电子业主卡报事报修加拦截后仍可点入，根因是微信开发者工具导入的是dist/dev旧产物而非新源码。

## 问题现象
- 给电子业主卡「报事报修」加入口拦截（点击只Toast「功能暂未开放」、不跳转），用户改完仍反馈「还是可以点进去」
- 同源泰兴经验只覆盖「tools点编译不生效、以dist/build为准」，此处指向不同：用户/容器默认挂在dist/dev上，dev与build两产物目录混用

## 根因
- 源码里拦截逻辑确实存在，但微信开发者工具导入的仍是zhi2-mobile-shimin/dist/dev/mp-weixin旧产物，该包里goToOther没有拦截分支
- 真机/工具验证的是旧包不是新代码，导致「改完还是不行」的误判

## 解决方案
- 先区分环境再排查代码：确认开发者工具导入dist/dev还是dist/build，或直接问用户在哪端（H5/小程序/App）测的
- 定位后重新编译（npm run dev或导入刚打出的dist/build），工具里「清缓存→重新编译」
- 不要因用户说「还是不行」就反复改源码，先核对产物里是否存在该字符串（如grep产物中的「功能暂未开放」）
- 加固侧把点击事件换成@tap.stop+抽出统一isRepairNav谓词，在入口click与goToOther两处双重拦截

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话eac9139c用户轮次4「还是可以点进去啊」；结论明确源码已加拦截但工具跑dist/dev旧包无该逻辑，要求改导dist/build、清缓存重新编译
- 涉及文件：src/pages_owner_extra/ownerCard/index.vue、src/pages_owner/ownerCard/index.vue
- 所属项目：苏住房C；来源会话ID：eac9139c-3367-4784-8577-a513c71c95c0；代码基线：48bdb17

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "repair_intercept_old",
  "source_extraction_id": "cc94cc1db25f4df5aeee6e6f8a3b8b62",
  "version": 1,
  "memory_type": "entities"
}
-->