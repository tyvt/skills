# ZsImage组件默认高度导致图片不显示
苏住房C的ZsImage封装默认aspectFill+height:100%，父级无高度时图片渲染为0高，需补width prop与widthFix。

## 问题现象
- 页面插图请求返回200但界面看不到图，误以为资源丢失或路径错
- 报错Failed to load local image resource ... 500与307重定向到/__pageframe__

## 根因
- ZsImage默认mode=aspectFill+内部height:100%，父容器无显式高度时盒高压成0
- 小程序自定义组件默认styleIsolation隔离，父级width:180px进不到组件内部真实节点

## 解决方案
- 给ZsImage补width prop，内部inline style落到真实节点，支持mode="widthFix"高度自适应
- 调用侧统一写`<ZsImage mode="widthFix" width="180px" />`
- 需外部样式生效时组件options改styleIsolation:'shared'并合并外部class，补全空引用imageStyle

## 验证与归属
- 会话a875a3cf：修改ZsImage.vue补imageStyle、width prop、widthFix、shared隔离，SuccessCard改调用
- 涉及文件：ZsImage.vue、SuccessCard.vue；所属项目：苏住房C；代码基线：6aca310

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsimage_zero_height",
  "source_extraction_id": "93ce183c426145c2b955cfbe7c449325",
  "version": 1,
  "memory_type": "entities"
}
-->