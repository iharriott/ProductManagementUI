import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { MaterialModule } from 'src/app/shared-modules/material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ProductDefinitionComponent } from './product-definition/product-definition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CastFormArrayPipe } from './pipes/cast-form-array.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CappingRuleComponent } from './capping-rule/capping-rule.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DataViewerComponent } from './data-viewer/data-viewer.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataEditorListComponent } from './data-editor-list/data-editor-list.component';
import { EntityComponent } from './entity/entity.component';
import { FileListComponent } from './file-list/file-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MultiEditComponent } from './multi-edit/multi-edit.component';
import { FileSelectionPopupComponent } from './file-selection-popup/file-selection-popup.component';
import { FileHistoryListComponent } from './file-history-list/file-history-list.component';
import { RateRevisionComponent } from './rate-revision/rate-revision.component';
import { MultiRevisionViewComponent } from './multi-revision-view/multi-revision-view.component';
import { RouterModule, Routes } from '@angular/router';
import { DataFormatterPipe } from './pipes/data-formatter.pipe';
import { StringReducePipe } from './pipes/string-reduce.pipe';
import { CharacteristicsMainComponent } from './characteristics-main/characteristics-main.component';
import { CharacteristicsListComponent } from './characteristics-list/characteristics-list.component';
import { CharacteristicsMultiViewComponent } from './characteristics-multi-view/characteristics-multi-view.component';
import { CharacteristicViewComponent } from './characteristic-view/characteristic-view.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductionDefinitionSearchResultsComponent } from './production-definition-search-results/production-definition-search-results.component';
import { GenericGridComponent } from './generic-grid/generic-grid.component';
import { StateFilingComponent } from './state-filing/state-filing.component';
import { ValidationComponent } from './validation/validation.component';
import { ValidValuesComponent } from './valid-values/valid-values.component';
import { RefinementComponent } from './refinement/refinement.component';
import { RequiredCharacteristicComponent } from './required-characteristic/required-characteristic.component';
import { FileStructureErrorComponent } from './file-structure-error/file-structure-error.component';

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
        MultiRevisionViewComponent,
        DataFormatterPipe,
        StringReducePipe,
        CharacteristicsMainComponent,
        CharacteristicsListComponent,
        CharacteristicsMultiViewComponent,
        CharacteristicViewComponent,
        ProductSearchComponent,
        ProductionDefinitionSearchResultsComponent,
        GenericGridComponent,
        StateFilingComponent,
        ValidationComponent,
        ValidValuesComponent,
        RefinementComponent,
        RequiredCharacteristicComponent,
        FileStructureErrorComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableExporterModule,
        NgMultiSelectDropDownModule.forRoot(),
        RouterModule
    ],

    exports: [
        SideNavigationComponent,
        ProductDefinitionComponent,
        CastFormArrayPipe
    ]
})
export class ComponentModule {}
