import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  ///////// IMAGE UPLOADER - variables //////////
  imgSrc = '/assets/images/image-placeholder-normal.png';
  folderName = 'unnamedFolder';
  selectedImage: any = null;
  uploadPercentage: any;

  @Input() defaultImage: string;
  @Input() cloudFolder: string;
  @Output() upload: EventEmitter<any> = new EventEmitter<any>();

  imageForm = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
  });
  ///////////////////////////////////////////////

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    if (this.defaultImage) {
      this.imgSrc = this.defaultImage;
    }
    if (this.cloudFolder) {
      this.folderName = this.cloudFolder;
    }
  }

  /////////////////// image uploader functions - start //////////////////////
  onSubmit(formData): void {
    const filePath = `images/${this.cloudFolder}/${
      this.selectedImage.name
    }_${new Date().getTime()}`;
    const task = this.storage.upload(filePath, this.selectedImage);
    this.uploadPercentage = task.percentageChanges();
    const fileRef = this.storage.ref(filePath);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url);
            this.upload.emit(url);
            formData.imageUrl = url;
            // this.resetForm();
          });
        })
      )
      .subscribe();
  }

  showPreview(event: any, temp: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      if (this.defaultImage) {
        this.imgSrc = this.defaultImage;
      } else {
        this.imgSrc = '/assets/images/image-placeholder-normal.png';
      }
      this.selectedImage = null;
    }
    this.onSubmit(temp);
  }
  /////////////////// image uploader functions - end //////////////////////
}
