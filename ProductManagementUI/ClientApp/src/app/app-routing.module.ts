import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDefinitionComponent } from '../app/components/product-definition/product-definition.component';
import { CappingRuleComponent } from './components/capping-rule/capping-rule.component';
import { CharacteristicViewComponent } from './components/characteristic-view/characteristic-view.component';
import { CharacteristicsListComponent } from './components/characteristics-list/characteristics-list.component';
import { CharacteristicsMultiViewComponent } from './components/characteristics-multi-view/characteristics-multi-view.component';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataEditorListComponent } from './components/data-editor-list/data-editor-list.component';
import { DataViewerComponent } from './components/data-viewer/data-viewer.component';
import { EntityComponent } from './components/entity/entity.component';
import { FileHistoryListComponent } from './components/file-history-list/file-history-list.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { MultiEditComponent } from './components/multi-edit/multi-edit.component';
import { MultiRevisionViewComponent } from './components/multi-revision-view/multi-revision-view.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductionDefinitionSearchResultsComponent } from './components/production-definition-search-results/production-definition-search-results.component';
import { RateRevisionComponent } from './components/rate-revision/rate-revision.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { StateFilingComponent } from './components/state-filing/state-filing.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { view: 'dashboard' }
            },
            {
                path: 'revision',
                component: RateRevisionComponent,
                data: { view: 'revision' }
            },
            {
                path: 'viewfilelist',
                component: FileListComponent,
                data: { view: 'view' }
            },
            {
                path: 'editfilelist',
                component: FileListComponent,
                data: { view: 'edit' }
            },
            {
                path: 'addNewfile',
                component: FileUploadComponent,
                data: { view: 'add' }
            },
            {
                path: 'multiedit',
                component: MultiEditComponent,
                data: { view: 'edit' }
            },
            {
                path: 'multiview',
                component: MultiEditComponent,
                data: { view: 'view' }
            },
            {
                path: 'multirevision',
                component: MultiRevisionViewComponent,
                data: { view: 'multirevision' }
            },
            {
                path: 'filehistory/:fileName',
                component: FileHistoryListComponent,
                data: { view: 'filehistory' }
            },
            {
                path: 'viewfilehistory/:fileVersionId/:fileName',
                component: FileUploadComponent,
                data: { view: 'viewhistory' }
            },
            {
                path: 'characteristicslist',
                component: CharacteristicsListComponent,
                data: { view: 'characteristicslist' }
            },
            {
                path: 'characteristicsview',
                component: CharacteristicsMultiViewComponent,
                data: { view: 'characteristicsview' }
            },
            {
                path: 'productsearch',
                component: ProductSearchComponent,
                data: { view: 'productsearch' }
            },
            {
                path: 'productsearchresult',
                component: ProductionDefinitionSearchResultsComponent,
                data: { view: 'productsearchresult' }
            },
            {
                path: 'statefiling',
                component: StateFilingComponent,
                data: { view: 'statefiling' }
            },
            {
                path: 'characteristicdetail',
                component: CharacteristicViewComponent,
                data: { view: 'characteristicdetail' }
            },
            {
                path: 'editfile/:fileVersionId/:fileName',
                component: FileUploadComponent,
                data: { view: 'edit' }
            },
            {
                path: 'viewfile/:fileVersionId/:fileName',
                component: FileUploadComponent,
                data: { view: 'view' }
            }
        ]
    },
    {
        path: 'product',
        component: ProductDefinitionComponent,
        data: { view: 'product' }
    },
    // {
    //     path: 'editfile/:fileVersionId/:fileName',
    //     component: FileUploadComponent,
    //     data: { view: 'edit' }
    // },
    {
        path: 'addNewfile',
        component: FileUploadComponent,
        data: { view: 'add' }
    },
    {
        path: 'capping',
        component: CappingRuleComponent,
        data: { view: 'capping' }
    },
    {
        path: 'viewer',
        component: DataViewerComponent,
        data: { view: 'viewer' }
    },
    {
        path: 'characteristics',
        component: CharacteristicsComponent,
        data: { view: 'characteristics' }
    },
    {
        path: 'entities',
        component: EntityComponent,
        data: { view: 'entities' }
    },
    {
        path: 'datalist',
        component: DataEditorListComponent,
        data: { view: 'datalist' }
    },

    {
        path: 'sideNav',
        component: SideNavigationComponent,
        data: { view: 'multirevision' }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
