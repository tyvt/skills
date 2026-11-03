# Paste Image Auto-upload Pattern
In EstateManagement Park Froala editor, pasted images are auto-uploaded and only server URL remains in body to avoid base64 bloat.

## Description
- afterPasteCallback converts pasted image to FormData and uploads to version/1/i.froala.com/upload.
- Body keeps only server URL, preventing base64 inflation that triggers update prompt.

## Implementation
- Added policy/js/policy_froalaPasteUpload.js (single image ≤10MB).
- Updated policy_SmPolicyCommunityRecordAdd.shtml and policy_SmPolicyCommunityRecordEdit.shtml to use pattern.

## Verification and Attribution
- Verification source: 园区V0/001.md.
- Involved files: policy shtml, js, froala_editor.min.js, FileUploadController.java, FileUploadServiceImpl.java, index.html, SmPolicyCommunityRecordAddController.java, Application.java.
- Source session ID: 5e09b260-67d2-4210-bc34-31daca30276b.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "paste_image_upload",
  "source_extraction_id": "1429bde0b94f491e903b99dc6f297e69",
  "version": 1,
  "memory_type": "entities"
}
-->