import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,

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

    ],

    exports:
        [MatRadioModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            MatSelectModule,
            MatListModule,
            MatCardModule,

        ],
})
export class AngularMaterial { }