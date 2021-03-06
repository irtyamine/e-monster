/**
 * search-results-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { MovieService } from '../service/movie.service';
import * as fromMovieRoot from '../reducers';
import * as searchMovieActions from '../actions/search';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable()
export class MovieListExistGuard implements CanActivate {

    constructor( private store: Store<fromMovieRoot.State>,
                 private movieService: MovieService,
                 private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        const query = route.params['query'];
        const page = route.params['page'] || 1;
        return this.hasSearchResults(query, page);
    }

    private hasSearchResults( query: string, page: number ): Observable<boolean> {
        if (!query) {
            query = 'now_playing';
        }
        return this.hasSearchResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query, page);
            })
        );
    }

    /**
     * Check whether the search result is already in the search store.
     * */
    private hasSearchResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromMovieRoot.getPaginatorData), take(1)),
            this.store.pipe(select(fromMovieRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0].query === query && result[0].page === page && result[1] && result[1].length > 0)
        );
    }

    /**
     * Check whether there is search result in API.
     * */
    private hasSearchResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());
        return this.movieService.searchList(query, page).pipe(
            map(res => new searchMovieActions.SearchComplete({search: res})),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => res.payload.search.results && res.payload.search.results.length > 0),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
