import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], criteria: any): any {

        return items.filter(item =>{
           for (let key in item ) {
             if((""+item[key]).toLocaleLowerCase().includes(criteria.toLocaleLowerCase())){
                return true;
             }
           }
           return false;
        });
    }
}