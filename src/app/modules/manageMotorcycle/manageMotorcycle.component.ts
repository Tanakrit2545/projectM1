import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageMotorcycle',
  templateUrl: './manageMotorcycle.component.html',
  styleUrls: ['./manageMotorcycle.component.css']
})
export class ManageMotorcycleComponent implements OnInit {
  imageBlobUrl: any;
  motorcycleList: any[] = [];
  motorcycleTypeList: any[] = [];

  constructor(
    private callService: CallserviceService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMotorTypeAll();
    this.getAllMotorcycle();
  }

  getAllMotorcycle() {
    this.callService.getAllMotorcycle().subscribe({
      next: (res) => {
        if (res.data) {
          this.motorcycleList = res.data;
          this.motorcycleList.forEach(motorcycle => {
            motorcycle.imgList = [];
            motorcycle.motorcycleType = this.motorcycleTypeList.find(type => type.motorcycleTypeId === motorcycle.motorcycleTypeId);
            this.callService.getMotorcycleByMotorcycleId(motorcycle.motorcycleId).subscribe({
              next: (imgRes: any) => {
                if (imgRes.data) {
                  imgRes.data.forEach((motorcycleImg: any) => {
                    this.getImage(motorcycleImg.motorcycleImgName, motorcycle.imgList);
                  });
                } else {
                  window.location.reload();
                }
              }
            });
          });
        }
      }
    });
  }

  getImage(fileName: any, imgList: any) {
    this.callService.getThumbnail(fileName).subscribe((res) => {
      let objectURL = URL.createObjectURL(res);
      this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      imgList.push(this.imageBlobUrl);
    });
  }

  getMotorTypeAll() {
    this.callService.getMotorcycleTypeAll().subscribe({
      next: (res) => {
        if (res.data) {
          this.motorcycleTypeList = res.data;
        }
      }
    });
  }

  onDeleteMotorcycle(motorcycleId: any) {
    if (motorcycleId) {
      this.callService.deleteMotorcycle(motorcycleId).subscribe({
        next: (res) => {
          if (res.data) {
            this.getAllMotorcycle();
          }
        }
      });
    }
  }

  onUpdateMotorcycle(motorcycleId: any) {
    this.router.navigate(['/product', motorcycleId]);
  }
}
