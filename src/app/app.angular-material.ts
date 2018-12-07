import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    
} from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        
    ],
    
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        
    ],
})
export class AngularMaterial { }