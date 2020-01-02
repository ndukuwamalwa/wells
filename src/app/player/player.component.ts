import { Component, OnInit, Input, Output, AfterViewInit, OnChanges } from '@angular/core';
import { Song } from '../song.model';
import { EventEmitter } from '@angular/core';
import { songs } from '../library';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit, OnChanges {

  @Input('song') song: Song;
  @Input('isPlaying') isPlaying: boolean;
  @Output('output') output: EventEmitter<any> = new EventEmitter();
  player: HTMLAudioElement;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.player = (document.getElementById("audio") as HTMLAudioElement);
    this.player.addEventListener("play", e => {
      this.output.emit({ isPlaying: true, song: this.song });
    });
    this.player.addEventListener("pause", e => {
      this.output.emit({ isPlaying: false, song: this.song });
    });
    this.player.onended = () => {
      this.next();
      this.isPlaying = true;
    };
  }

  ngOnChanges() {
    if (this.player && this.song) {
      try {
        if (this.isPlaying) {
          this.player.play();
        } else {
          this.player.pause();
        }
      } catch (error) {

      }
    }
  }

  prev() {
    const index = songs.indexOf(songs.find(s => s.path === this.song.path));
    if (index === 0) {
      this.song = songs[songs.length - 1];
    } else {
      this.song = songs[index - 1];
    }
    this.output.emit({ isPlaying: this.isPlaying, song: this.song });
  }

  next() {
    const index = songs.indexOf(songs.find(s => s.path === this.song.path));
    if (index === (songs.length - 1)) {
      this.song = songs[0];
    } else {
      this.song = songs[index + 1];
    }
    this.output.emit({ isPlaying: this.isPlaying, song: this.song });

  }

}
