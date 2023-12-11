// // // import { Component, OnInit } from '@angular/core';
// // // import { ProductService } from '../services/product.service';
// // // import { product } from '../data-type';

// // // @Component({
// // //   selector: 'app-seller-home',
// // //   templateUrl: './seller-home.component.html',
// // //   styleUrl: './seller-home.component.css'
// // // })
// // // export class SellerHomeComponent implements OnInit {

// // //   productList:undefined | product[];

// // //   constructor(private product:ProductService ){}

// // //   ngOnInit(): void {
// // //     this.product.productList().subscribe((result)=>{
// // //       console.warn(result);
// // //       this.productList=result;
// // //     })
// // //   }

// // // }



// // import { Component, OnInit } from '@angular/core';
// // import { ProductService } from '../services/product.service';
// // import { product } from '../data-type';

// // @Component({
// //   selector: 'app-seller-home',
// //   templateUrl: './seller-home.component.html',
// //   styleUrls: ['./seller-home.component.css']  // <-- Fix the typo here
// // })
// // export class SellerHomeComponent implements OnInit {

// //   productList: undefined | product[];

// //   constructor(private product: ProductService) { }

// //   ngOnInit(): void {
// //     this.product.productList().subscribe((result) => {
// //       console.warn(result);
// //       this.productList = result;
// //     });
// //   }

// // }



// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-seller-home',
//   templateUrl: './seller-home.component.html',
//   styleUrls: ['./seller-home.component.css']
// })
// export class SellerHomeComponent implements OnInit {

//   productList: product[] = []; // Assuming an empty array as the default value
//   productMessage: string | undefined;

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.productService.productList().subscribe((result) => {
//       console.warn(result);
//       // Assuming that the API always returns an array, if not, handle it accordingly
//       this.productList = Array.isArray(result) ? result : [result];
//     });
//   }
// deleteProduct(id:number){

// this.productService.deleteProduct(id).subscribe((result)=>{
//   if(result){
//     this.productMessage="Product is Delete";
//   }
// })
// setTimeout(()=>{
//   this.productMessage=undefined
// }, 5000);

// }

// }





// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-seller-home',
//   templateUrl: './seller-home.component.html',
//   styleUrls: ['./seller-home.component.css']
// })
// export class SellerHomeComponent implements OnInit {

//   productList: product[] = [];
//   productMessage: string | undefined;

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.loadProductList();
//   }

//   loadProductList(): void {
//     this.productService.productList().subscribe(
//       (result) => {
//         console.warn(result);
//         this.productList = Array.isArray(result) ? result : [result];
//       },
//       (error) => {
//         console.error('Error fetching product list:', error);
//       }
//     );
//   }

//   deleteProduct(id: number): void {
//     this.productService.deleteProduct(id).subscribe(
//       (result) => {
//         if (result) {
//           this.productMessage = 'Product is Deleted';
//           // Reload the product list after successful deletion
//           this.loadProductList();
//         }
//       },
//       (error) => {
//         console.error('Error deleting product:', error);
//         // Handle error as needed
//       }
//     );

//     setTimeout(() => {
//       this.productMessage = undefined;
//     }, 5000);
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: product[] = [];
  productMessage: string="" ;
  isLoading: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProductList();
  }

  loadProductList(): void {
    this.productService.productList().subscribe(
      (result) => {
        console.warn(result);
        this.productList = Array.isArray(result) ? result : [result];
      },
      (error) => {
        console.error('Error fetching product list:', error);
      }
    );
  }

  deleteProduct(id: number): void {
    this.isLoading = true; // Set loading to true when starting the delete operation
    this.productService.deleteProduct(id).subscribe((result) => {

        if (result) {
          this.productMessage = 'Product is Deleted';
          // Reload the product list after successful deletion
          this.loadProductList();
        }
      },
      (error) => {
        console.error('Error deleting product:', error);
        // Handle error as needed, e.g., show an error message to the user
      },
      () => {
        this.isLoading = false; // Set loading to false when the delete operation is complete
      }
    );

    setTimeout(() => {
      this.productMessage = "";
    }, 5000);
  }
  
}

