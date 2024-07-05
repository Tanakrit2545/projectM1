import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-manageMotorcycle',
  templateUrl: './manageMotorcycle.component.html',
  styleUrls: ['./manageMotorcycle.component.css']
})
export class ManageMotorcycleComponent implements OnInit {

  motorcycleList: any[] = [];
  motorcycleTypeList: any[] = [];
  motorcycleImgList: any[] = [];

  constructor(
    private callService: CallserviceService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMotorTypeAll();
    this.getAllMotorcycles();
  }

  getAllMotorcycles() {
    this.callService.getAllMotorcycle().subscribe({
      next: (res) => {
        if (res.data) {
          this.motorcycleList = res.data;
          this.motorcycleList.forEach(motorcycle => {
            motorcycle.imgList = [];
            motorcycle.motorcycleType = this.motorcycleTypeList.find(type => type.motorcycleTypeId === motorcycle.motorcycleTypeId);
            this.callService.getMotorcycleByMotorId(motorcycle.motorcycleId).subscribe({
              next: (imgRes: any) => {
                if (imgRes.data) {
                  this.motorcycleImgList = imgRes.data;
                  this.motorcycleImgList.forEach(motorcycleImg => {
                    this.getImage(motorcycleImg.motorcycleImgName, motorcycle.imgList);
                  });
                } else {
                  window.location.reload(); // Reload page if no image data
                }
              }
            });
          });
        }
      }
    });
  }

  getImage(fileName: string, imgList: any[]) {
    this.callService.getBlobThumbnail(fileName).subscribe({
      next: (res) => {
        let objectURL = URL.createObjectURL(res);
        let safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        imgList.push(safeUrl);
      }
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
      this.callService.deleteMotor(motorcycleId).subscribe({
        next: (res) => {
          if (res.data) {
            window.location.reload(); // Reload page after deletion
          }
        }
      });
    }
  }

  onUpdateMotorcycle(motorcycleId: any) {
    this.router.navigate(['/motorcycle', motorcycleId]);
  }
}
