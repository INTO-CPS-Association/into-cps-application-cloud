import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-sidebar';
import { UserComponent } from './Components/user/user.component';
import { ContextMenuComponent } from './NavigationHandler/Context-menu/context-menu.component';
import { MultiModelComponent } from './Components/multi-model/multi-model.component';
import { CoSimConfigurationComponent } from './Components/co-sim-configuration/co-sim-configuration.component';
import { DesignSpaceExplorationComponent } from './Components/design-space-exploration/design-space-exploration.component';
import { ReadmeComponent } from './Components/readme/readme.component';
import { CommunicationComponent } from './Components/communication/communication.component';
import { MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LogComponent } from './Components/log/log.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectsComponent } from './Components/projects/projects.component';
import { ExcludeSpecialSignDirective } from './Components/Directives/exclude-special-sign.directive';
import { LineChartComponent } from './Components/line-chart/line-chart.component';
import { ResizableModule } from 'angular-resizable-element';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ContextMenuComponent,
    MultiModelComponent,
    CoSimConfigurationComponent,
    DesignSpaceExplorationComponent,
    ReadmeComponent,
    CommunicationComponent,
    LogComponent,
    ProjectsComponent,
    ExcludeSpecialSignDirective,
    LineChartComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    ResizableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
