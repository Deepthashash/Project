import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  orders = [];

  TaskAddForm = this.formBuilder.group({
    taskName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    order: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.orders = this.getUsers();
  }

  getUsers(){
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  submit(formData){
    var date = new Date(formData.startDate).getTime();
    console.log(date);
  }

}
