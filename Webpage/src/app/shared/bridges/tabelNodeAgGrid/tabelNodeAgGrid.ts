import { Injectable } from '@angular/core';
import { FormElement, Formular } from 'src/app/shared/interfaces/form.interface';
import { AgGridHeaderComponent } from '../agGridHeader/agGridHeader.component';
import { AgGridHeaderColumnComponent } from '../agGridHeaderColumn/agGridHeaderColumn.component';


@Injectable()
export class TabelNodeAgGridBridge {
  columnDefs = []
  constructor(
    ) {}

  composeAgGrid(formular: Formular, tableId: string) {
    this.columnDefs = []
    this.createFirstColumn(formular,tableId)
    formular?.formElements?.map(el => {
      this.createColumn(el, tableId)
    })
    return this.columnDefs;
  }

  createFirstColumn(formular: Formular, tableId: string){
    this.columnDefs.push(
      {
        field: 'actionColumn',
        sortable: false,
        headerComponentFramework: AgGridHeaderComponent,
        headerComponentParams: { showCheckbox: false, fromular: formular, colField: 'to', tableId },
        // headerComponent: AgGridHeaderComponent,
        // cellRendererFramework: AgGridHeaderComponent
      }
    )
  }

  createColumn(formElement: FormElement, tableId: string) {
    this.columnDefs.push({
      field: 'actionColumn',
      sortable: false,
      headerComponentFramework: AgGridHeaderColumnComponent,
      headerComponentParams: { showCheckbox: false, formElement, tableId },
      // headerComponent: AgGridHeaderComponent,
      // cellRendererFramework: AgGridHeaderComponent
    }
   )
  }

}
