import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';

@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.scss'],
})
export class AdminPackagesComponent implements OnInit {
  public packages = [];
  public questionnaireRooms: string[] = [];
  public addOns = [];

  public form: FormGroup = new FormGroup({
    smallName: new FormControl({ value: '', disabled: true }),
    smallPrice: new FormControl({ value: '', disabled: false }),
    smallDescription: new FormControl({ value: '', disabled: true }),
    mediumName: new FormControl({ value: '', disabled: true }),
    mediumPrice: new FormControl({ value: '', disabled: false }),
    mediumDescription: new FormControl({ value: '', disabled: true }),
    largeName: new FormControl({ value: '', disabled: true }),
    largePrice: new FormControl({ value: '', disabled: false }),
    largeDescription: new FormControl({ value: '', disabled: true }),
  });

  constructor(
    private readonly adminService: AdminService,
    private checkoutService: CheckoutService,
    private readonly snackBar: MatSnackBar
  ) {
    this.adminService.getAllPackages().subscribe((res) => {
      this.packages = res;
      this.questionnaireRooms = Object.getOwnPropertyNames(
        this.packages[0].additional_data.questions
      );
      this.form.setValue({
        smallName: res[0].name,
        smallPrice: res[0].price,
        smallDescription: res[0].data.description,
        mediumName: res[1].name,
        mediumPrice: res[1].price,
        mediumDescription: res[1].data.description,
        largeName: res[2].name,
        largePrice: res[2].price,
        largeDescription: res[2].data.description,
      });
    });
    this.checkoutService.getAllAddOns().subscribe((res) => {
      this.addOns = res;
    });
  }

  ngOnInit(): void {}

  save(value: number, id: number) {
    this.adminService.editProduct(id, value).subscribe(
      (res) =>
        this.snackBar.open(
          `Successfully updated the price of ${
            this.packages[id - 1].name
          } to ${value}`,
          'Close',
          { duration: 3000 }
        ),
      (err) =>
        this.snackBar.open('Price update failed.', 'Close', { duration: 3000 })
    );
  }
}
