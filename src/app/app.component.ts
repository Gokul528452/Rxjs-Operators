import { Component, OnInit } from '@angular/core';
import { of,combineLatest,interval,concat,range, from} from 'rxjs';
import { map,take,takeLast,skip,switchMap,mergeMap,concatMap,filter,retry,toArray,max } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';


  constructor(private http:HttpClient){

}

ngOnInit(): void {
  this.http.get('https://jsonplaceholder.typicode.com/users')
  .pipe(
    retry(3)  // Retry 3 times
  )
  .subscribe({
    next: (response) => {
      console.log('Success', response);
    },
    error: () => {
      console.log('Failure was 3 times');
    }
  });
}
//combine_latest is first observable latest value take and second  observable all value take process 
combine_Latest(){
  const height = of(2, 4, 6);
  const weight = of(1, 2, 3, 4, 5);
  const bmi = combineLatest([height,weight]).pipe(
    map(([w, h]) => w * h),
  );    
      bmi.subscribe(x => console.log('BMI is ' + x));
}

//concat is combine two observable
concat(){  
  const first = interval(1000).pipe(take(10),map(x=> x+10));
  const second = interval(3000).pipe(take(5),map(x=> x+100));
   
  const combine= concat(first,second)
   
  combine.subscribe(x => console.log(x));
  }
 takelast(){
  const many = range(1, 100);
const lastThree = many.pipe(takeLast(3));
lastThree.subscribe(x => console.log(x));
 }

 Skip(){
  const arr = from (["a","b","c","d","e","f"]);
  const result=arr.pipe(skip(3));

  result.subscribe(z => console.log(z));
 }

 //switchmap is the one of the mapping method it is given a latest value of the first observable 
switchmap(){
 const letters = of('a', 'b', 'c');
const result = letters.pipe(
  switchMap(x => interval(1000).pipe(map(i => x + i)).pipe(take(4)))
);
result.subscribe(x => console.log(x));

  }
  concatmap(){
    const letters = of('a', 'b', 'c');
   const result = letters.pipe(
     concatMap(x => interval(1000).pipe(map(i => x + i)).pipe(take(4)))
   );
   result.subscribe(x => console.log(x));
   
     }
     mergemap(){
      const letters = of('a', 'b', 'c');
     const result = letters.pipe(
       mergeMap(x => interval(1000).pipe(map(i => x + i)).pipe(take(4)))
     );
     result.subscribe(x => console.log(x));
     
       }

       filter(){
        const num =of(1,2,3,4,5,6);
        const res=num.pipe(filter(x=>x%2==1));
        res.subscribe(x=> console.log(x))
       }

       array(){
        const source = interval(10);
        const example = source.pipe(
          take(10),
          toArray()
            );

          example.subscribe(value => console.log(value));
       }
        max(){
          of(5, 4, 7, 2, 8)
          .pipe(max())
          .subscribe(x => console.log(x));
        }
     
}



