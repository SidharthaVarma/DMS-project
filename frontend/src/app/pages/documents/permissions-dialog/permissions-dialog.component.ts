import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../services/document.service';

@Component({
  templateUrl: './permissions-dialog.component.html',
})
export class PermissionsDialogComponent {

  viewUsers: any[] = [];
  editUsers: any[] = [];

  constructor(
    private docService: DocumentService,
    private dialogRef: MatDialogRef<PermissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  savePermissions() {
  const viewIds = this.viewUsers.map(u => u._id);
  const editIds = this.editUsers.map(u => u._id);

  this.docService.updatePermissions(this.data.documentId, viewIds, editIds)
    .subscribe(() => {
      this.dialogRef.close(true);
    });
}


  close() {
    this.dialogRef.close(false);
  }
}
