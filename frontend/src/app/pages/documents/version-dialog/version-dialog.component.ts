import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../services/document.service';

@Component({
  templateUrl: './version-dialog.component.html',
})
export class VersionDialogComponent implements OnInit {

  versions: any[] = [];
  loading = true;

  constructor(
    private docService: DocumentService,
    private dialogRef: MatDialogRef<VersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.docService.getVersions(this.data.id).subscribe(res => {
      this.versions = res;
      this.loading = false;
    });
  }

  openVersion(v: any) {
    window.open(this.docService.getFileUrl(v.filePath), '_blank');
  }

  close() {
    this.dialogRef.close();
  }
}
