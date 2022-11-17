import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ProductDefinitionComponent } from '../app/components/product-definition/product-definition.component';
import { CappingRuleComponent } from './components/capping-rule/capping-rule.component';
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
//import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        // redirectTo: 'home',
        // pathMatch: 'full',
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
                path: 'viewfilehistory/:fileHistoryId/:fileName',
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
                data: { view: 'characteristicsview' }
            },
            {
                path: 'productsearchresult',
                component: ProductionDefinitionSearchResultsComponent,
                data: { view: 'characteristicsview' }
            }
        ]
    },
    {
        path: 'product',
        component: ProductDefinitionComponent,
        data: { view: 'product' }
    },
    {
        path: 'editfile/:fileHistoryId/:fileName/:fileId',
        component: FileUploadComponent,
        data: { view: 'edit' }
        // canActivate: [MsalGuard]
    },
    {
        path: 'addNewfile',
        component: FileUploadComponent,
        data: { view: 'add' }
    },
    // {
    //     path: 'viewfile/:fileHistoryId/:fileName',
    //     component: FileUploadComponent,
    //     data: { view: 'view' }
    // },
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
    // {
    //     path: 'viewfilelist',
    //     component: FileListComponent,
    //     data: { view: 'view' }
    // },
    // {
    //     path: 'editfilelist',
    //     component: FileListComponent,
    //     data: { view: 'edit' }
    // },
    // {
    //     path: 'dashboard',
    //     component: DashboardComponent,
    //     data: { view: 'dashboard' }
    // },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    //     data: { view: 'home' }
    // },
    // {
    //     path: 'multiedit',
    //     component: MultiEditComponent,
    //     data: { view: 'edit' }
    // },
    // {
    //     path: 'multiview',
    //     component: MultiEditComponent,
    //     data: { view: 'view' }
    // },
    // {
    //     path: 'filehistory/:filePath',
    //     component: FileHistoryListComponent,
    //     data: { view: 'filehistory' }
    // },
    // {
    //     path: 'revision',
    //     component: RateRevisionComponent,
    //     data: { view: 'revision' }
    // },
    // {
    //     path: 'multirevision',
    //     component: MultiRevisionViewComponent,
    //     data: { view: 'multirevision' }
    // },
    {
        path: 'sideNav',
        component: SideNavigationComponent,
        // children: [
        //     {
        //         path: 'dashboard',
        //         component: DashboardComponent
        //     },
        //     {
        //         path: 'revision',
        //         component: RateRevisionComponent
        //     }
        // ],
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
