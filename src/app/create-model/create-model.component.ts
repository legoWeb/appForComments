import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { HttpService } from '../http.service';
import { Comment} from '../comment';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css'],
  providers: [HttpService]
})
export class CreateModelComponent implements OnInit {

  public comm: Comment[] = [];
  public comments = [];
  public edit = false;
  public readonly = 'readonly';
  receivedComment: Comment;

  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    chapter: new FormControl()
  });
  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.http.getConfig().subscribe(
      (data: Comment[]) => this.comm = data);
  }

  submit() {
    const author: Comment = {
      name: this.form.value.name,
      text: this.form.value.chapter,
      file: this.form.value.file
    };
    this.comments.push(author);
    this.form.reset();
    this.http.postConfig( author ).subscribe(
      (data: Comment) => {this.receivedComment = data; this.edit = true; },
      error => (console.log(error)));
    this.http.getConfig().subscribe(
      (data: Comment[]) => this.comm = data);
  }

  deleteTask(idx: number) {
    this.http.deleteConfig(idx).subscribe(
      (data: Comment[]) => this.comm = data);
    this.comm.splice(idx, 1);
  }

  editText(idx: number) {
    this.edit = true;
    // console.log(this.comments[idx].text);
  }

  replyText(idx: number) {

    // console.log(this.comments[idx].text);
  }
}
