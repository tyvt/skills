- 新增业务模块优先顺着同目录既有页面写法，直接在页面/组件内用全局 $get/$post，不新建 api 封装文件
- 仅当接口确实被多个页面消费才考虑下沉 api 层；用户点名的 api 文件才删（已知 #788 按模块点名）
- 动手前先看目标目录最相近 2-3 个页面的取数方式
- 组件内通过 mapGetters/inject 拿 $get/$post，参数就地组装
- 注意删除接口形态 POST + Header zs-method: delete，导入 multipart/form-data 字段名 file
- 已知 #364 同向：Web 管理后台新增模块 mixins 驱动 CRUD，目录名=接口路径，不写 api 文件
- 验证：会话 58064992（基线 9fb6c2c）用户诉求「不要新建api模型，按照其他页面的方式处理」；涉及 complexTag 六接口

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "新增模块api文件禁忌",
  "source_extraction_id": "5eb3d574981745b1b7d0d7203f70f57b",
  "version": 1,
  "memory_type": "preferences"
}
-->