import {Injectable} from '@angular/core';
import { FormElement, Formular } from 'src/app/shared/interfaces/form.interface';
import { AgGridHeaderComponent } from '../agGridHeader/agGridHeader.component';


@Injectable()
export class TabelNodeAgGridBridge {
  columnDefs = []
  constructor(
    ) {}

  composeAgGrid(formular: Formular, tableId: string) {
    this.columnDefs = []
    this.createFirstColumn(formular,tableId)
    formular?.formElements?.map(el => {
      this.createColumn(el)
    })
    return this.columnDefs;
  }
  createFirstColumn(formular: Formular, tableId: string){
    console.log('formular', formular)
    console.log('tableId', tableId)
    this.columnDefs.push(
      {
        field: 'actionColumn',
        sortable: false,
        headerComponentFramework: AgGridHeaderComponent,
        headerComponentParams: { showCheckbox: false, fromularName: formular.name, colField: 'to', tableId }
        // headerComponent: AgGridHeaderComponent,
        // cellRendererFramework: AgGridHeaderComponent
      }
    )
  }
  createColumn(formField: FormElement){
  }

}
