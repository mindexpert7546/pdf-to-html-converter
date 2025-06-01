import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private http: HttpClient) {}
  uploadFile: File | null = null;

onFileChange(event: any) {
  this.uploadFile = event.target.files[0];
}

uploadAndConvert() {
  if (!this.uploadFile) return;

  const formData = new FormData();
  formData.append('file', this.uploadFile);

  this.http.post('http://localhost:5000/convert-pdf-to-html', formData, {
    responseType: 'blob'  // Important for downloading file
  }).subscribe(blob => {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = 'converted.html';
    a.click();
    URL.revokeObjectURL(objectUrl);
  }, error => {
    console.error('Conversion failed:', error);
  });
}

  

}
