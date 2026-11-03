
# ZsImage 默认高度为零不显示
苏住房C 中 ZsImage 图片路径正确但看不见，根因为内部 height:100% 父节点无确定高度时算成 0。

## 现象与根因
- 页面 ZsImage 引用图标不报错但看不见，路径正确。
- 根因：ZsImage 内部 height:100%，父节点无确定高度时高度算成 0，表现为路径对但看不见。

## 解决方案
- 给 ZsImage 套定尺寸容器（如 w-28 h-28 的 view），与 authentication.vue 写法对齐。
- 给 ZsImage 增加 mode prop（默认 aspectFill 保持兼容），mode==='widthFix' 时内部改 height:auto，由宽度按比例决定高度；调用侧对宽定高不定图文统一写 mode="widthFix"（会话 09b69b5c 验证）。
- 引用页需显式注册 components:{ ZsImage }，绕开 easycom 在分支切换后失效导致的静默不渲染。
- 排查顺序：先查控制台请求路径与文件真实位置是否同包，再查父级有无高度。

## 验证与归属
- 验证证据：09b69b5c（新增 mode prop 走 widthFix 修复高度塌零）、13824f1b（子包图标显式 subpackage+定尺寸容器，定尺寸容器部分验证高度修复）。
- 涉及文件：components/ZsImage/ZsImage.vue、pages_owner/house/owner/authentication.vue、pages_transaction/publishHouse/type.vue 等。
- 所属项目：苏住房C；来源会话ID：13824f1b-0d06-4c7a-8d3f-79edcf5ccfe4, 09b69b5c；代码基线：8fc3cc5、b7bf813。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_height_zero",
  "source_extraction_id": "c0fd305100de4799a4169c34e9bea617",
  "version": 4,
  "memory_type": "entities"
}
-->