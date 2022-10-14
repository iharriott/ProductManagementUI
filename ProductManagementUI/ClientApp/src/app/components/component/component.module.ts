import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { MaterialModule } from 'src/app/shared-modules/material/material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ProductDefinitionComponent } from '../product-definition/product-definition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CastFormArrayPipe } from '../pipes/cast-form-array.pipe';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { CappingRuleComponent } from '../capping-rule/capping-rule.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DataViewerComponent } from '../data-viewer/data-viewer.component';
import { CharacteristicsComponent } from '../characteristics/characteristics.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataEditorListComponent } from '../data-editor-list/data-editor-list.component';
import { EntityComponent } from '../entity/entity.component';
import { FileListComponent } from '../file-list/file-list.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { MultiEditComponent } from '../multi-edit/multi-edit.component';
import { FileSelectionPopupComponent } from '../file-selection-popup/file-selection-popup.component';
import { FileHistoryListComponent } from '../file-history-list/file-history-list.component';
import { RateRevisionComponent } from '../rate-revision/rate-revision.component';
import { MultiRevisionViewComponent } from '../multi-revision-view/multi-revision-view.component';

@NgModule({
    declarations: [
        SideNavigationComponent,
        ProductDefinitionComponent,
        CastFormArrayPipe,
        DashboardComponent,
        FileUploadComponent,
        CappingRuleComponent,
        DataViewerComponent,
        CharacteristicsComponent,
        DataEditorListComponent,
        EntityComponent,
        FileListComponent,
        HomeComponent,
        MultiEditComponent,
        FileSelectionPopupComponent,
        FileHistoryListComponent,
        RateRevisionComponent,
        MultiRevisionViewComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableExporterModule,
        NgMultiSelectDropDownModule.forRoot()
    ],

    exports: [
        SideNavigationComponent,
        ProductDefinitionComponent,
        CastFormArrayPipe
    ]
})
export class ComponentModule {}
