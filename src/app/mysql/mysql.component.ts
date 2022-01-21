import { Component, OnInit } from '@angular/core';
import { ReadwriteService } from './readwrite.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.css']
})
export class MysqlComponent implements OnInit {

  constructor(public fb: FormBuilder,
    private readwriteService: ReadwriteService) {
      this.form = this.fb.group({
      name: [null],
      email: [null],
      city: [null],
      _id: [null]
    })
    }

  ngOnInit(): void {
    this.readData();
  }

  form: FormGroup;
  requests: any = [];
  data: any;
  user: any;

  readData(): void {
  this.data = this.readwriteService.readData().subscribe(
    res => this.requests = res
  );
  }

  removeItem(id: any) {
    this.readwriteService.deleteItem(id).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    setTimeout(() => this.readData(), 300);
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("name", this.form.get('name')!.value);
    formData.append("email", this.form.get('email')!.value);
    formData.append("city", this.form.get('city')!.value);
    formData.append("_id", this.form.get('_id')!.value);

    console.log(this.form.get('name')!.value);
    console.log(this.form.get('email')!.value);
    console.log(this.form.get('city')!.value);
    console.log(this.form.get('_id')!.value);

    this.user = {
      'name': this.form.get('name')!.value.toString(),
      'email': this.form.get('email')!.value.toString(),
      'city': this.form.get('city')!.value.toString(),
      '_id': this.form.get('_id')!.value.toString()
    }

    this.readwriteService.writeUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );

    setTimeout(() => this.readData(), 300);

  }

}
