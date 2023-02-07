import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  data=[
    {
      src:"./../../../assets/Images/kadaipaneer.png",
      name:"Kadai Paneer"
    },
    {
      src:"./../../../assets/Images/icecream1.jpg",
      name:"Icecream"
    },
    {
      src:"./../../../assets/Images/cholabhatura.jpg",
      name:"Chola Bhatura"
    },
    {
      src:"./../../../assets/Images/panipuri.png",
      name:"Panipuri"
    },
    {
      src:"./../../../assets/Images/pavbhaji.jpg",
      name:"Pav Bhaji"
    },
    {
      src:"./../../../assets/Images/pizza1.png",
      name:"Pizza"
    }

  ]

  constructor(
  ) { }

  ngOnInit(): void {

   
  }

  btnPrev(){
    let box=document.querySelector('.product-container');
    let width:any=box?.clientWidth;
    box?.scrollTo({left:box.scrollLeft-width});
  }

  btnNext(){
    let box=document.querySelector('.product-container');
    let width:any=box?.clientWidth;
    box?.scrollTo({left:box.scrollLeft+width});
  }

  btnDishPrev(){
    let box=document.querySelector('.hp-subcategories-container');
    let width:any=box?.clientWidth;
    box?.scrollTo({left:box.scrollLeft-width});
  }

  btnDishNext(){
    let box=document.querySelector('.hp-subcategories-container');
    let width:any=box?.clientWidth;
    box?.scrollTo({left:box.scrollLeft+width});
  }

  





}
