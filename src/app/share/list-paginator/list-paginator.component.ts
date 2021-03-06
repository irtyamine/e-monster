/**
 * list-paginator.component
 */

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-list-paginator',
    exportAs: 'paginator',
    templateUrl: './list-paginator.component.html',
    styleUrls: ['./list-paginator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPaginatorComponent implements OnInit {

    @Input() listPage: number;

    @Input() listTotalPages: number;

    @Output() goToPage = new EventEmitter<any>();

    @HostBinding('class.hidden')
    get listPaginatorClassHidden(): boolean {
        return this.listTotalPages <= 1;
    }

    get prevBtnDisable(): boolean {
        return this.listPage === 1;
    }

    get nextBtnDisable(): boolean {
        return this.listPage === this.listTotalPages;
    }

    constructor() {
    }

    public ngOnInit() {
    }

    public prev( event: any ): void {
        this.toPage(this.listPage - 1);
        event.preventDefault();
    }

    public next( event: any ): void {
        this.toPage(this.listPage + 1);
        event.preventDefault();
    }

    private toPage( page: number ): void {
        if (page < 1 || page > this.listTotalPages) {
            return;
        }

        this.goToPage.next(page);
    }
}
