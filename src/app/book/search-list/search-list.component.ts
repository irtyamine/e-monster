import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromBookRoot from '../reducers';
import { IBook } from '../../model';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit, AfterContentInit, OnDestroy {

    public list$: Observable<IBook[]>;

    public paginatorData$: Observable<{page: number, total_pages: number, query: string}>;

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private appService: AppService,
                 private store: Store<fromBookRoot.State> ) {
    }

    public ngOnInit() {
        this.list$ = this.store.pipe(select(fromBookRoot.getSearchResults));
        this.paginatorData$ = this.store.pipe(select(fromBookRoot.getPaginatorData));
    }

    public ngAfterContentInit(): void {
        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromBookRoot.getSearchResults),
            skip(1)
        ).subscribe(() => {
            this.appService.scrollBackToTop(true);
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    /**
     * Go a specific page of the list
     * */
    public goToPage( page: number, query: string ): void {
        this.router.navigate(['book/search', {query, page}]);
    }

    /**
     * Go a specific search page
     * */
    public handleNavListOptionClick( option: string, query: string ) {
        this.router.navigate([`${option}/search`, {query}]);
    }

    /**
     * Handle query value change
     * */
    public handleQueryInputValueChange( event: any ) {
        this.router.navigate(['book/search', {query: event.query}]);
    }
}
