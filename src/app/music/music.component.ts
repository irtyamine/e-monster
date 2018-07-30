import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicComponent implements OnInit {

    constructor( private http: HttpClient,
                 @Inject(DOCUMENT) private document: any ) {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }

    public testMusic() {
        /*const url = 'https://accounts.spotify.com/api/token';

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Basic ' + btoa('ce67a8a0eb964933a536cca6ffc81848:c6963970c8494b5680afc3a64f9d1143'));
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(url, 'grant_type=client_credentials', {headers})
            .subscribe(( res ) => {
                console.log(res);
            });*/
    }
}
