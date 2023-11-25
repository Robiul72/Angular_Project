import { Component, OnInit } from '@angular/core';
import { HouseModel } from './house.model';
import { FormGroup,FormBuilder } from '@angular/forms';
import { HouseService } from '../services/house.service';


@Component({
  selector: 'app-house-member',
  templateUrl: './house-member.component.html',
  styleUrl: './house-member.component.css'
})
export class HouseMemberComponent implements OnInit{

  houseModel: HouseModel=new HouseModel();
  formValue!: FormGroup;
  houseData:any;

  constructor(private api:HouseService, private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.initializeForm();
    this.getAll();
   
  }

  getAll(): void {
    this.api.getAllHouse()
      .subscribe(res => {
        this.houseData = res;     
      });
  }

  initializeForm():void{
    this.formValue = this.formBuilder.group({
      firstName:[''],
      lastName: [''],
      gender:[''],
      hobby_reading:[false],
      hobby_gaming:[false],
      subject:[''],
    });
  }

  saveHouse():void{

    this.setHouseModelFrom();

    this.api.housePost(this.houseModel)
    .subscribe(
      res => {
        console.log('Response:', res);
        alert("Data Save");
        this.formValue.reset();
        this.getAll();
      },
      err => {
        console.error('Error:', err);
        alert("Data Not saved");
      }
    );
  }


  setHouseModelFrom():void{
    this.houseModel.firstName=this.formValue.value.firstName;
    this.houseModel.lastName=this.formValue.value.lastName;
    this.houseModel.gender=this.formValue.value.gender;
    this.houseModel.subject=this.formValue.value.subject;

    let hobbies: string[]=[];
    if(this.formValue.value.hobby_reading){
      hobbies.push('Reading');
    }
    if(this.formValue.value.hobby_gaming){
      hobbies.push('Gaming');
    }
    this.houseModel.hobby=hobbies;
  }

  deleteHouse(row:any):void{
    this.api.deleteHouse(row.id)
    .subscribe(
      res => {
        console.log('Response:', res);
        alert("Data Delete");
        this.formValue.reset();
        this.getAll();
      },
      err => {
        console.error('Error:', err);
        alert("Data Not Delete");
      }
    );
  }

  onEdit(row:any):void{
    this.houseModel.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['subject'].setValue(row.subject);

    this.formValue.controls['hobby_reading'].setValue(row.hobby.includes('Reading'));
    this.formValue.controls['hobby_gaming'].setValue(row.hobby.includes('Gaming'));
  }

  houseEdit():void{
    this.setHouseModelFrom();

    this.api.editHouse(this.houseModel.id, this.houseModel)
    .subscribe(res=>{
      console.log(res);
      alert("Data Update");
      this.formValue.reset();
      this.getAll();
    },
    
    err=>{
      alert("Data Not Update");
    });
  }

}
