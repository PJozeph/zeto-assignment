import { Routes } from '@angular/router';
import { EditViewRecordComponent } from './components/edit-view-record/edit-view-record.component';
import { RecordListComponent } from './components/record-list/record-list.component';

export const routes: Routes = [
    {
        path: '', component: RecordListComponent
    },
    {
        path: 'record/:id', component: EditViewRecordComponent
    }
];
