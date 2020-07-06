import { Component, OnInit } from '@angular/core';
import {
  PackagesBox,
  PackageType,
} from './side-card-packages-box/side-card-packages-box.component';

export class SideCadrPackage {
  constructor(public box: PackagesBox, public descriptions: string[]) {}
}

const PACKAGES = [
  new SideCadrPackage(
    new PackagesBox(
      PackageType.SMALL,
      399,
      `For small spaces up to 40SQM/430SQFT`
    ),
    [
      `S package includes one best solution
    based on the space possibilities
    and your needs`,
      `INCLUDES
    - New redesigned floor plan
    - Furniture disposition plan
    - Redesigned floor plan
    with detailed measurements
    - Demolition and deconstruction plan
    - Project description`,
      `In total you will recieve 5 different files.`,
    ]
  ),
  new SideCadrPackage(
    new PackagesBox(
      PackageType.MEDIUM,
      599,
      `For apartment up to 75 square meters`
    ),
    [
      `S package includes one best solution
    based on the space possibilities
    and your needs`,
      `INCLUDES
    - New redesigned floor plan
    - Furniture disposition plan
    - Redesigned floor plan
    with detailed measurements
    - Demolition and deconstruction plan
    - Project description`,
      `In total you will recieve 5 different files.`,
    ]
  ),
  new SideCadrPackage(
    new PackagesBox(
      PackageType.LARGE,
      799,
      `For apartment up to 100 square meters`
    ),
    [
      `S package includes one best solution
    based on the space possibilities
    and your needs`,
      `INCLUDES
    - New redesigned floor plan
    - Furniture disposition plan
    - Redesigned floor plan
    with detailed measurements
    - Demolition and deconstruction plan
    - Project description`,
      `In total you will recieve 5 different files.`,
    ]
  ),
];

@Component({
  selector: 'app-side-card-packages',
  templateUrl: './side-card-packages.component.html',
  styleUrls: ['./side-card-packages.component.scss'],
})
export class SideCardPackagesComponent implements OnInit {
  public readonly packages: SideCadrPackage[] = PACKAGES;

  constructor() {}

  ngOnInit(): void {}
}