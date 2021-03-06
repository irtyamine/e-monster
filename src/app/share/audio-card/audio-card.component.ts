import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IAudio } from '../../model';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-audio-card',
    templateUrl: './audio-card.component.html',
    styleUrls: ['./audio-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioCardComponent implements OnInit {

    @Input() audio: IAudio;

    @Input() scrollObservable: Observable<any>;

    @Input() cardLink: string;

    @Input() imageLink: string;

    @Input() title: string;

    @Input() date: string;

    @Input() hidePlayBtn: boolean;

    @Input() hideCollectionBtn: boolean;

    @Input() vote_average: number;

    @Input() vote_count: number;

    @Output() clickCollection = new EventEmitter<{ audio: IAudio, event: any }>();

    @Output() playVideo = new EventEmitter<{ audio: IAudio, event: any }>();

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( private appService: AppService ) {
    }

    ngOnInit() {
    }

    public handleClickOnCollectionBtn( event: any ): void {
        this.clickCollection.emit({audio: this.audio, event});
        event.preventDefault();
    }

    public clickPlayVideo( event: any ): void {
        this.playVideo.emit({audio: this.audio, event});
        event.preventDefault();
    }

}
