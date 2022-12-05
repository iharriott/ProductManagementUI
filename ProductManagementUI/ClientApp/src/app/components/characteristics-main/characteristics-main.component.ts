import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-characteristics-main',
    templateUrl: './characteristics-main.component.html',
    styleUrls: ['./characteristics-main.component.css']
})
export class CharacteristicsMainComponent implements OnInit {
    characteristicForm!: FormGroup;
    @Input() formData$!: BehaviorSubject<any>;
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.formData$.subscribe((data) => {
            this.characteristicForm = data;
        });
    }

    goBack() {
        this.router.navigate(['characteristicslist']);
    }
}
