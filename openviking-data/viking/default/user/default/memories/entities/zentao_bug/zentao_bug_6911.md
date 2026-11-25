# ZenTao Bug 6911: rectification task PDF signature images
Bug 6911 was a resolved/fixed web/G-end variant of the same rectification-task PDF signature issue later reported as ZenTao bug 6964.

## Issue and identity
- Title: "检查记录：整改任务单需要带出签字内容" ("Inspection record: rectification task list must include signature content").
- Bug 6911 was resolved/fixed by 2026-11-25 10:13; bug 6964 was opened at 2026-11-25 10:42, 29 minutes later.
- Both bugs targeted the same backend downloadRectifyTaskPdf method in zhi2-evaluation and the same blank PDF signature-field root cause; 6964 was the management-end APP duplicate of 6911's web/G-end issue.

## Fix
- Remote commit 4d24ee7 for bug 6911 added the signature-in-PDF implementation to StdEvalCheckRecordServiceImpl.downloadRectifyTaskPdf (about 126 lines).
- The implementation added createPdfSignImageCell and downloadFileBytes, plus getSignImage reusing downloadFileBytes, to embed signature images in the two rectification task PDF fields.
- Remote branch develop/v2.6.2-suzhufang-dev already contained this fix at HEAD 0b84b64; StdEvalCheckRecordServiceImpl.java:1141-1142 called createPdfSignImageCell.
- A later local implementation for bug 6964 duplicated this fix and was dropped to avoid overwriting the already-merged tested implementation.

## Verification and relation
- The remote fix compiled successfully on 2026-11-25 with mvn -q -pl zhi2-evaluation/zhi2-evaluation-server -am -DskipTests compile, EXIT=0.
- Bug 6964 was subsequently written back as resolved/fixed with a comment documenting the 6911 relation.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6911",
  "source_extraction_id": "7679cd7eb07e407f8834a73fb72cf742",
  "version": 1,
  "memory_type": "entities"
}
-->