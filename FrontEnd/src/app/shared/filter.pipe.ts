import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string):any {
    const result: any = [];
    if(!value || filterString ===''|| propName==='') {
      return value;
      }
      value.forEach((a:any)=>{
        if(a[propName].trim().toLowerCase().includes(filterString.toLocaleLowerCase())){
          result.push(a);
        }
      });
      return result;
    }
}
