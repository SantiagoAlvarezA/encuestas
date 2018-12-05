import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    
} from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        
    ],
    
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        
    ],
})
export class AngularMaterial { }