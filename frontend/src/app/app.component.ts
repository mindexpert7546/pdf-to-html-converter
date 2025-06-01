import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from './apiServices/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private apiService: ApiService
  ) {}
  uploadFile: File | null = null;
  pageTitle: string = "converted"

onFileChange(event: any) {
  this.uploadFile = event.target.files[0];
}

// uploadAndConvert() {
//   if (!this.uploadFile) return;

//   const formData = new FormData();
//   formData.append('file', this.uploadFile);

//   this.http.post('http://localhost:5000/convert-pdf-to-html', formData, {
//     responseType: 'blob'  // Important for downloading file
//   }).subscribe(blob => {
//     const a = document.createElement('a');
//     const objectUrl = URL.createObjectURL(blob);
//     a.href = objectUrl;
//     a.download = 'converted.html';
//     a.click();
//     URL.revokeObjectURL(objectUrl);
//   }, error => {
//     console.error('Conversion failed:', error);
//   });
// }
uploadAndConvert() {
    if (!this.uploadFile) return;
    const dateTimeNow = new Date();
    const fileName = this.pageTitle +`_${dateTimeNow}`;
    this.apiService.convertPdfToHtml(this.uploadFile).subscribe(
      blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `${fileName}.html`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error => {
        console.error('Conversion failed:', error);
      }
    );
  }
}
