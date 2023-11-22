import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeModel: EmployeeModel = new EmployeeModel();
  formValue !: FormGroup;
  employData: any;

  constructor(private api: ApiService, private formBuider: FormBuilder) { }

  getAll() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.employData=res;
      })
  }

  ngOnInit(): void {
    this.formValue = this.formBuider.group({
      firstName: [''],
      lastName: [''],
      cell: [''],
      email: [''],
      salary: [''],

    });
    this.getAll();

  }

  saveEmployee() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.cell = this.formValue.value.cell;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.employeePost(this.employeeModel)
      .subscribe(res => {
        console.log(res);
        alert("Data Save");
        this.formValue.reset();
        this.getAll();
      },
        err => {
          alert("Data Not Save");
        }
      )
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        console.log(res);
        alert("Data Delete");
        this.formValue.reset();
        this.getAll();
      },

        err => {
          alert("Data Not Delete");
        })
  }

  onEdit(row: any) {
    this.employeeModel.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['cell'].setValue(row.cell);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  employeeEdit() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.cell = this.formValue.value.cell;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.editEmployee(this.employeeModel.id, this.employeeModel)
    .subscribe(res=>{
      console.log(res);
      alert("Data Update");
      this.formValue.reset();
      this.getAll();
    },
    
    err=>{
      alert("Data Not Update");
    })
  }

}
