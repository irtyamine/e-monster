import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ENTER, ESCAPE } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-header-searcher',
    templateUrl: './header-searcher.component.html',
    styleUrls: ['./header-searcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearcherComponent implements OnInit {

    @ViewChild('searchInputElm') searchInputElmRef: ElementRef;

    @Output() search = new EventEmitter<any>();

    public showSearchInput = false;

    public inputValue: string;

    public searchQueryOptions = [
        {value: 'movie', name: 'Movies'},
        {value: 'tv', name: 'TV'},
        {value: 'music', name: 'Music'},
        {value: 'books', name: 'Books'},
        {value: 'people', name: 'People'},
    ];

    public searchQueryOption = this.searchQueryOptions[0];

    constructor( private cdRef: ChangeDetectorRef ) {
    }

    ngOnInit() {
    }

    public toggleSearchInput( event: any ) {
        this.showSearchInput = !this.showSearchInput;

        if (this.showSearchInput) {
            this.searchInputElmRef.nativeElement.focus();
        }

        event.preventDefault();
    }

    public cleanSearchInput( event: any ) {
        this.inputValue = null;
        this.cdRef.markForCheck();
        event.preventDefault();
    }

    public chooseSearchQuery( option: { value: string; name: string }, event: any ) {
        this.searchQueryOption = option;
        this.cdRef.markForCheck();
        event.preventDefault();
    }

    public handleKeydownOnSearchInput( event: KeyboardEvent ): void {
        const keyCode = event.keyCode;

        switch (keyCode) {
            case ESCAPE:
                this.showSearchInput = false;
                this.cdRef.markForCheck();
                event.preventDefault();
                return;

            case ENTER:
                if (this.inputValue) {
                    this.showSearchInput = false;
                    this.search.emit({query: this.inputValue, option: this.searchQueryOption.value});
                    this.cdRef.markForCheck();
                }
                event.preventDefault();
                return;

            default:
                return;
        }
    }
}