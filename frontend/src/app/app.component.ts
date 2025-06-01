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
  // uploadFile: File | null = null;
  pageTitle: string = "converted"
  selectedFile: File | null = null;
  convertedHTML: string = '';
  isLoading: boolean = false;

onFileChange(event: any) {
  this.selectedFile = event.target.files[0];
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
    if (!this.selectedFile) return;
    this.isLoading = true;

    const dateTimeNow = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${this.pageTitle}_${dateTimeNow}`;

    this.apiService.convertPdfToHtml(this.selectedFile).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const htmlContent = reader.result as string;

          // Show converted HTML in preview
          this.convertedHTML = htmlContent;
          this.convertedHTML = this.escapeHtml(htmlContent);
          this.isLoading = false;

          // Download the HTML
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = `${fileName}.html`;
          a.click();
          URL.revokeObjectURL(objectUrl);
        };
        reader.readAsText(blob);
      },
      error => {
        console.error('Conversion failed:', error);
        this.isLoading = false;
      }
    );
  }

  escapeHtml(html: string): string {
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
