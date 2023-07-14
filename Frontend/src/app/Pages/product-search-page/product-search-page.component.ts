import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APISERVICEService } from 'src/app/Service/api-service.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrls: ['./product-search-page.component.css']
})
export class ProductSearchPageComponent implements OnInit {


  Inspiration_Your_First_Order_Data=[
    {
      source:"https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png",
      name:"Biryani"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
      name:"Rolls"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
      name:"Pizza"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
      name:"Thali"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png",
      name:"Paratha"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
      name:"Burger"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png",
      name:"Noodles"
    },
    {
      source:"https://b.zmtcdn.com/data/dish_images/1437bc204cb5c892cb22d78b4347f4651634827140.png",
      name:"Chaat"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/5dbdb72a48cf3192830232f6853735301632716604.png",
      name:"Momos"
    },
    {
      source:"https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png",
      name:"Dosa"
    }
  ]

  isSearchProduct:boolean=false;

  SearchProductData:any=[]


  constructor(
    private route:Router,
    private apiService:APISERVICEService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
  }

  searchProduct(key:String){
    this.apiService.getSearchProduct(key).subscribe(
      (data:any)=>{
        this.SearchProductData=data;
        console.log(data);
        
        this.isSearchProduct=true
      },
      (error)=>{
        console.log(error);
        
      }      
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

  }

}

@Component({
  selector: 'product-details-dialog-box',
  templateUrl: './product-dialog-box.html',
  styleUrls: ['./product-search-page.component.css']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



