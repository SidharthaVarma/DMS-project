import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { VersionDialogComponent } from './version-dialog/version-dialog.component';
import { PermissionsDialogComponent } from './permissions-dialog/permissions-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documents: any[] = [];
  searchTerm: string = '';

  // Upload form fields
  title: string = '';
  description: string = '';
  tags: string = '';
  selectedFile: File | null = null;

  isLoading = false;
  isUploading = false;

  constructor(
    private docService: DocumentService, // 👈 FIXED name
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }


  /** Load user documents */
  loadDocuments() {
    this.isLoading = true;
    this.docService.getDocuments().subscribe({
      next: (docs) => {
        this.documents = docs;
        this.isLoading = false;
      },
      error: () => {
        this.snack.open('Failed to load documents', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }


  /** Search documents */
onSearch() {
  const term = this.searchTerm.trim();

  if (!term) {
    this.loadDocuments();
    return;
  }

  this.isLoading = true;

  this.docService.searchDocuments(term).subscribe({
    next: (docs) => {
      this.documents = docs;
      this.isLoading = false;
    },
    error: () => {
      this.snack.open('Search failed', 'Close', { duration: 3000 });
      this.isLoading = false;
    }
  });
}




  /** Handle file selection */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }


  /** Upload Document */
  uploadDocument() {
    if (!this.selectedFile) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', this.title || 'Untitled');
    formData.append('description', this.description || '');
    formData.append('tags', this.tags || '');

    this.isUploading = true;

    this.docService.uploadDocument(formData).subscribe({
      next: () => {
        this.snack.open('Document uploaded successfully 🎉', 'Close', { duration: 3000 });
        this.isUploading = false;
        this.title = '';
        this.description = '';
        this.tags = '';
        this.selectedFile = null;
        this.loadDocuments();
      },
      error: (err: any) => {
        this.snack.open('Upload failed', 'Close', { duration: 3000 });
        console.error('Upload failed:', err);
        this.isUploading = false;
      }
    });
  }


  /** Delete document */
  deleteDocument(docId: string) {
    if (!confirm('Delete this document?')) return;

    this.docService.deleteDocument(docId).subscribe({
      next: () => {
        this.snack.open('Document deleted', 'Close', { duration: 3000 });
        this.documents = this.documents.filter(d => d._id !== docId);
      },
      error: () => {
        this.snack.open('Delete failed', 'Close', { duration: 3000 });
      }
    });
  }


  /** Open/download the file */
  openFile(filePath: string) {
    const url = this.docService.getFileUrl(filePath);
    console.log("Opening:", url);

    if (url) {
      window.open(url, "_blank");
    } else {
      alert("File not found!");
    }
  }
  isGridView: boolean = true;

toggleView() {
  this.isGridView = !this.isGridView;
}
getFileIcon(fileName: string): string {
  const ext = fileName?.split('.').pop()?.toLowerCase();
  switch(ext) {
    case 'pdf': return 'picture_as_pdf';
    case 'doc':
    case 'docx': return 'description';
    case 'png':
    case 'jpg':
    case 'jpeg': return 'image';
    case 'xlsx':
    case 'xls': return 'grid_on';
    default: return 'insert_drive_file';
  }
}

previewDoc(doc: any) {
  const url = this.docService.getFileUrl(doc.filePath);
  const ext = doc.filePath?.split('.').pop()?.toLowerCase();

  if(['png','jpg','jpeg','pdf'].includes(ext)) {
    window.open(url, "_blank"); // will replace with modal in step 2
  } else {
    alert("Preview not supported, downloading instead…");
    window.location.href = url;
  }
}
openVersionDialog(doc: any) {
  this.dialog.open(VersionDialogComponent, { data: { id: doc._id } });
}

openPermissionsDialog(doc: any) {
  this.dialog.open(PermissionsDialogComponent, { data: { id: doc._id } });
}

}
