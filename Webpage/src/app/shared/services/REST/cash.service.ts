import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { NavData } from 'src/app/shared/classes/navData/nav.data';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { GroupSelector } from '../../interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  constructor(
  ) { }

  setActualGroup(entityNavId: string): void{
    // console.log('set actualGroup', entityNavId);
    localStorage.setItem('actualGroup', entityNavId);
  }

  getActualGroup(): string {
    // console.log('get actualGroup', localStorage.getItem('actualGroup'));
    return localStorage.getItem('actualGroup');
  }
  
  setActualGroupRider(entity: GroupSelector[]): void{
    // console.log('set actualGroup', entityNavId);
    localStorage.setItem('actualGroupRider',JSON.stringify(entity));
  }
  
  
  getActualGroupRider(): GroupSelector[] {
    let output = JSON.parse(localStorage.getItem('actualGroupRider'));
    if (output) {return output}
    else { return []} 
    // console.log('get actualGroup', localStorage.getItem('actualGroup'));
  }

  setEntityNavLink(entityNavId: string): void{
    // console.log(this.getActualGroup(), ' set entity apiId to ',  entityNavId );
    localStorage.setItem(this.getActualGroup() , entityNavId);
  }

  getEntityNavLink(): string{
    // console.log(this.getActualGroup(), ' get nav ', localStorage.getItem(this.getActualGroup()), ' of entity ',  this.getActualGroup() );
    return localStorage.getItem(this.getActualGroup());
  }
}
