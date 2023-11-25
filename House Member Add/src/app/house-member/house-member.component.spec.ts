import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseMemberComponent } from './house-member.component';

describe('HouseMemberComponent', () => {
  let component: HouseMemberComponent;
  let fixture: ComponentFixture<HouseMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
