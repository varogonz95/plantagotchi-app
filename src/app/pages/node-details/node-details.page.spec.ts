import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeDetailsPage } from './node-details.page';

describe('NodeDetailsPage', () => {
  let component: NodeDetailsPage;
  let fixture: ComponentFixture<NodeDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NodeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
