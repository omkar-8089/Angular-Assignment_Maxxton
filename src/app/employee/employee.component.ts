import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ICandidateDetails, IDistinctDeprtments } from './employee-models/employee-model';
import * as CandidateData from '../../assets/candidate-list.json';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  candidate_data: ICandidateDetails[] = [];
  resultList: ICandidateDetails[] = [];
  isToggleSorting: boolean = true;
  distinctDepartmentDetails: IDistinctDeprtments = {} as IDistinctDeprtments;
  constructor() { }

  ngOnInit() {
    this.candidate_data = CandidateData['default'];
    for (const items of this.candidate_data) {
      items.convertedDate = moment(items.joining_date, 'DD/MM/YYYY').toDate();
    }
    this.resultList = [...this.candidate_data];
  }

  //Search by name
  handleSearchResult(searchResult: any[]) {
    this.resultList = searchResult;
  }

  //. Sort by name, joining date.
  sortDetails(sortyType: 'number' | 'string' | 'date') {
    this.isToggleSorting = !this.isToggleSorting;
    switch (sortyType) {
      case 'date':
        this.resultList = !this.isToggleSorting ? this.resultList.sort((a, b) => <any>new Date(a.convertedDate) - <any>new Date(b.convertedDate)) :
          this.resultList.sort((a, b) => <any>new Date(b.convertedDate) - <any>new Date(a.convertedDate));
        break;
      case 'string':
        this.resultList = this.isToggleSorting ? this.resultList.sort((a, b) => a.name.localeCompare(b.name)) : this.resultList.sort((a, b) => b.name.localeCompare(a.name));
        break
    }

  }

  //Get distinct departments and count of candidates in each.
  getDistintDepartment() {
    const distinctDepartments = [... new Set([...this.resultList.map(dept => dept.department)])];
    this.distinctDepartmentDetails.count = distinctDepartments.length;
    this.distinctDepartmentDetails.departmentName = distinctDepartments;
  }
  //Remove all candidates from 'Development' department.
  removeCandidates(fieldNeedToRemove: string, fieldValue: string) {
    if (this.candidate_data && this.candidate_data.length) {
      this.resultList = this.candidate_data.filter(data => data[fieldNeedToRemove] !== fieldValue);
    }
  }

  getExperienceCandidate(experience: number) {
    this.resultList = this.resultList.filter(resulData => this.calculatDifference(resulData.convertedDate) > experience);
  }

  //Calculate Difference in years
  private calculatDifference(birthday) {
    const experienced = Date.now() - birthday;
    const totalExperienceYears = new Date(experienced);
    return Math.abs(totalExperienceYears.getUTCFullYear() - 1970);
  }
}
