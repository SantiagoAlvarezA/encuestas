import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule

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
        MatRadioModule,
        MatCheckboxModule,
        MatExpansionModule

    ],

    exports:
        [MatRadioModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            MatSelectModule,
            MatListModule,
            MatCardModule,
            MatCheckboxModule,
            MatExpansionModule

        ],
})
export class AngularMaterial { }