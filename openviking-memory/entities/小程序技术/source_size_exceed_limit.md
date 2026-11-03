# 微信开发者工具source size超限但自测合规
苏住房C市民端小程序报source size exceed max limit 2048KB但本地脚本统计合规，因口径不同且4M上限需UI勾选。

## 问题现象
- 反复报subpackage /pages_owner/ source size 2140KB exceed max limit 2048KB、main package 2207KB exceed max limit 2048KB
- 本地size-main-package.mjs统计合规，用户反馈“似乎判断标准不一致”
- 未勾选4M时超限分包令模拟器起不来，Console只显示[object Object]拿不到真错误

## 根因
- 两套口径不同：自写脚本量构建产物磁盘体积，开发者工具量源码打包后source size含依赖副本、分包占位
- project.config.json里bigPackageSizeSupport不会自动生效，必须在“详情→本地设置”人工勾选“预览及真机调试时主包、分包体积上限调整为4M”

## 解决方案
- 体积问题先确认工具UI里4M勾选状态，再看“编译”面板原文，而非“调试器→Console”
- 分包超限优先把体积挪走（拆页面到新分包/复用scripts/split-pages-vote.mjs），不靠调脚本阈值
- 复测流程固定为“清缓存→重新导入dist→点编译”

## 验证与归属
- 验证：会话672f088f连续三条source size exceed报错，用户反馈标准不一致；结论bigPackageSizeSupport仅写配置不够必须UI勾选4M，wx.onLazyLoadError返回undefined正常，Console的[object Object]非完整错误
- 涉及文件：project.config.json、scripts/size-main-package.mjs、scripts/split-pages-vote.mjs、src/pages.json
- 所属项目：苏住房C；来源会话ID：672f088f-9a28-4d5f-8510-9425d8259a76；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "source_size_exceed_limit",
  "source_extraction_id": "5eb3785fb5d541bfa8151d0735437bd1",
  "version": 1,
  "memory_type": "entities"
}
-->