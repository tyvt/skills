# 能力开关走 getCustomConfig 两级取值
按后台配置决定按钮显示需走 /building/common/getCustomConfig，按「模块名→配置键」两级取值，不用布尔强制转换。

## 问题现象
- 楼幢页「提取」按钮读 isShowSycBtn，自治模块发布按钮读 isShowPublishButton，误用会恒定 undefined 导致按钮不显示且不报错
- $get 返回整包 {code,msg,data} 而非 data，直接读 data 会错

## 根因
- getCustomConfig 返回按模块分组的多层对象，外层 key 是模块名（project/building/preparatoryGroup 等），内层 key 才是配置项
- 把 data 直接当配置对象或错用别的模块 key 会取到 undefined
- 使用 !! 强制转换会把字符串 'false' 误判为真

## 修复方案
- 封装取配置方法参数化「模块名+配置键」，内部按 res?.data?.[模块]?.[配置键] 取值
- 明确基准 === true 以免 'false' 误判；catch 统一返回安全默认 false（取不到隐藏新功能按钮）
- 新增配置项先与后端确认外层模块 key，不靠猜写死

## 验证与归属
- 验证证据：用户诉求 1-3 与最终结论（this.isShowSycBtn = !!res?.data?.project?.isShowSycBtn，catch 置 false；$get 返回整包；自治模块读 data.preparatoryGroup）
- 涉及文件：src/views/building/building/index.vue
- 所属项目：产品2.0；来源会话：3299b4fb-13f8-4922-8cd8-6edbcc54302b；代码基线：ff1a3ff

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "get_custom_config_switch",
  "source_extraction_id": "13dd120e07024e50a04d22b10abf5663",
  "version": 1,
  "memory_type": "entities"
}
-->