import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
} from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class AngularMaterial { }