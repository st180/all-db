import { Component, OnInit } from '@angular/core';
import { ReadwriteService } from './readwrite.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sqlite',
  templateUrl: './sqlite.component.html',
  styleUrls: ['./sqlite.component.css']
})
export class SqliteComponent implements OnInit {


        constructor(public fb: FormBuilder,
          private readwriteService: ReadwriteService) {
            this.form = this.fb.group({
            name: [null],
            email: [null],
            city: [null],
            id: [null]
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
          formData.append("id", this.form.get('id')!.value);
          formData.append("name", this.form.get('name')!.value);
          formData.append("email", this.form.get('email')!.value);
          formData.append("city", this.form.get('city')!.value);

          console.log(this.form.get('id')!.value);
          console.log(this.form.get('name')!.value);
          console.log(this.form.get('email')!.value);
          console.log(this.form.get('city')!.value);

          this.user = {
            'id': this.form.get('id')!.value,
            'name': this.form.get('name')!.value.toString(),
            'email': this.form.get('email')!.value.toString(),
            'city': this.form.get('city')!.value.toString()
          }

          this.readwriteService.writeUser(this.user).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );

          setTimeout(() => this.readData(), 300);

        }

      }
