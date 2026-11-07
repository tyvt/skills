# 批量替换图片组件InvalidEndTag修复
苏住房C 批量把 `<img>` 换成 `<ZsImage>`/`<ImageUploader>` 时出现 Invalid end tag 与畸形静态资源路径，须配对标签并扫畸形路径。

## 问题现象
- 批量替换出现 `<img /></ZsImage>` 这类开始/结束标签不匹配混写，编译器报 Invalid end tag，构建中断
- 同批替换留下 `..../../`、`../..../../../../` 等畸形静态资源路径

## 根因
- 脚本只替换开标签或只替换闭标签，未成对处理；路径因相对路径层级被多次前缀拼接所致
- 两者是同一批批量替换的次生伤害，易误判成两个不相关问题

## 解决方案
- 修标签：成对改为自闭合 `<ZsImage />`；ImageUploader 场景拆成正确 `<img />` + `</ImageUploader>` 结构而非一律自闭合
- 同批扫畸形路径：全量搜 `....`、`../...../` 模式逐个改项目约定静态路径
- 全局排查而非只修报错首个文件；构建仍失败时优先怀疑缺失静态资源（如不存在 svg），与标签问题无关
- 结论：批量替换组件脚本须按「配对标签 + 路径前缀」两维度同时校验

## 验证与归属
- 来源会话：e6b2c88e；代码基线：017efba；共修 7 处标签 + 8 个文件畸形路径
- 涉及文件：publicNotice/index.vue、pages_guard/index/index.vue、pages_owner/project/info/index.vue、pages_guard/emergencyContact/index.vue、pages_guard/guardApply/components/step1.vue、pages_owner/committee/application/index.vue、pages_owner/decision/components/DecisionList.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术模式",
  "name": "batch_img_invalid",
  "source_extraction_id": "4edd2b91cca8449093310dc478e50406",
  "version": 1,
  "memory_type": "entities"
}
-->