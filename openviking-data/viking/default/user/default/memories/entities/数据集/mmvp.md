# MMVP
Multimodal Visual Patterns benchmark，专探模型是否真"看见"细节的 VLM 评测数据集。

## 基本信息
- 含 300 张图 + Questions.csv 标注，每两题构成一对（第1&2、第3&4……），共 150 对
- 每对图片在 CLIP 视觉空间高度相似，但存在方向、朝向、开闭、计数等关键差异，正确答案恰好相反
- Questions.csv 四列：Index、Question、Options、Correct Answer
- Options 实际格式为 "(a) Open (b) Closed"（小写字母括号包裹、行内），非 "A." 行首

## 获取方式
- HuggingFace 数据集 MMVP/MMVP（https://huggingface.co/datasets/MMVP/MMVP）
- 本机 HuggingFace 直连 DNS 可解析但 TCP 被阻断/限流，需用镜像 HF_ENDPOINT=https://hf-mirror.com 下载

## 评测要点
- 可计算更严格的配对准确率（pair_id = Index // 2）；若一系列模型配对准确率普遍偏低，说明视觉编码器存在系统性盲区


<!-- MEMORY_FIELDS
{
  "category": "数据集",
  "name": "MMVP",
  "source_extraction_id": "bb930be7292541f3a4af8f2f7896e920",
  "version": 1,
  "memory_type": "entities"
}
-->