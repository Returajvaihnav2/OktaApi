import { Component, OnInit } from '@angular/core';
import SugarLevelService from '../shared/api/sugar-level.service';
import SugarLevel from '../shared/models/SugarLevel';

@Component({
  selector: 'app-sugarlevel-list',
  templateUrl: './sugarlevel-list.component.html',
  styleUrls: ['./sugarlevel-list.component.scss']
})
export class SugarlevelListComponent implements OnInit {

  sugarLevels: Array<SugarLevel> =new Array<SugarLevel> ();

  constructor(private sugarLevelService: SugarLevelService) {}

  ngOnInit() {
    this.sugarLevelService.getAll().subscribe(data => {
      this.sugarLevels = data;
    });
  }

}
