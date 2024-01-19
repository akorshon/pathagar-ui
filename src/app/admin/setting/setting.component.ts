import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {SettingService} from "./setting.service";

@Component({
  selector: 'app-admin-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private settingService: SettingService) {
  }

  ngOnInit(): void {

  }

  onRegenerateHash() {
    if (confirm("Are you sure to regenerate hash?")) {
      this.settingService.genHash().subscribe({
        next: rest => {
          console.log("regenerate hash success")
        },
        error: error => {
          console.log("regenerate hash error");
        }
      }).add(() => {
         console.log("regenerate hash complete");
      });
    }
  }

  onClickCreateThumb() {
    this.settingService.createThumb().subscribe(rest => {
    }, error => {

    })
  }

  onClickMoveFile() {
    this.settingService.moveFiles().subscribe(rest => {
    }, error => {
    })
  }

  onClickFixDate() {
    if (confirm("Are you sure to fix file created date?")) {
      this.settingService.fixDate().subscribe(rest => {
      }, error => {
      })
    }
  }

  onClickGenHash() {
    if (confirm("Are you sure to generate hash?")) {
      this.settingService.genHash().subscribe(rest => {
      }, error => {
      })
    }
  }

  onCleanUpFiles() {
    if (confirm("Are you sure to clean up files?")) {
      this.settingService.cleanUpFiles().subscribe(rest => {
      }, error => {
      })
    }
  }

}
