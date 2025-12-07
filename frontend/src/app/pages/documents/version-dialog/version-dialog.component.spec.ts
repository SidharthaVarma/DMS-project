import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionDialogComponent } from './version-dialog.component';

describe('VersionDialogComponent', () => {
  let component: VersionDialogComponent;
  let fixture: ComponentFixture<VersionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VersionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
