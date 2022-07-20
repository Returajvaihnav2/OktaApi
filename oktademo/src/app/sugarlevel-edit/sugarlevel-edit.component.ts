import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import SugarLevelService from '../shared/api/sugar-level.service';
import SugarLevel from '../shared/models/SugarLevel';

@Component({
  selector: 'app-sugarlevel-edit',
  templateUrl: './sugarlevel-edit.component.html',
  styleUrls: ['./sugarlevel-edit.component.scss']
})
export class SugarLevelEditComponent implements OnInit, OnDestroy {
  sugarLevel: SugarLevel = new SugarLevel();

  sub: Subscription = new Subscription;
  sugarLevelForm=new FormGroup({ });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sugarLevelService: SugarLevelService
  ) {}

  ngOnInit() {
    this.sugarLevelForm=new FormGroup({
      description:new FormControl(),
      id:new FormControl(),
      value:new FormControl(),
      measuredAt:new FormControl(new Date()),
    });
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.sugarLevelService.get(id).subscribe((sugarLevel: any) => {
          if (sugarLevel) {
            this.sugarLevel = sugarLevel;
            this.sugarLevel.measuredAt = new Date(
              this.sugarLevel.measuredAt
            );
            this.sugarLevelForm.patchValue(this.sugarLevel);
          } else {
            console.log(
              `Sugar Level with id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/sugarlevel-list']);
  }

  save(form: any) {
    this.sugarLevelService.save(form).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }

  remove(id: number) {
    this.sugarLevelService.remove(id).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}