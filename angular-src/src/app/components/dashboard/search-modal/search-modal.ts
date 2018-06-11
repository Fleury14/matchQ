import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-search-modal',
    templateUrl: './search-modal.html',
    styleUrls: [ './search-modal.scss' ]
})

export class SearchModal implements OnInit {

    public uid:string = localStorage.getItem('uid');

    ngOnInit(): void {
    }
    constructor(@Inject(MAT_DIALOG_DATA) public data: any ) {}
}