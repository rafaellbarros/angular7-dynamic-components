import { EmployeeDetailModalComponent } from './../employee-detail-modal/employee-detail-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Employee } from 'src/app/models/employees';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';
import { EmployeeEditModalComponent } from '../employee-edit-modal/employee-edit-modal.component';
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { ModalService } from '../../modal-dynamic-components/modal.service';


@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee: Employee;
  employeeToDelete: Employee;
  employeeToDetail: Employee;
  data = new Date();
  isLoanding = true;

  showMessageSuccess = false;

  @ViewChild(EmployeeDetailModalComponent) // pegar uma referencia de um elemento
  employeeDetailModal: EmployeeDetailModalComponent;

  @ViewChild(EmployeeDeleteModalComponent) // pegar uma referencia de um elemento
  employeeDeleteModal: EmployeeDeleteModalComponent;

  constructor(
    public employeeService: EmployeeService,
    private modalService: ModalService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoanding = false;
    }, 5000);
  }

  openDetailModal(employee: Employee) {
    this.employeeToDetail = employee;
    this.employeeDetailModal.show();
  }

  openNewModal() {
    const modalRef = this.modalService.create(EmployeeNewModalComponent);
    modalRef.onHide.subscribe((event) => {
      console.warn(event);
    });
    modalRef.show();
  }

  openEditModal(employee: Employee) {
    const modalRef = this.modalService.create(EmployeeEditModalComponent, {
      employee
    });
    modalRef.onHide.subscribe((event) => {
      console.warn(event);
    });
    modalRef.show();
  }

  openDestroyModal(employee: Employee) {
    this.employeeToDelete = employee;
    this.employeeDeleteModal.show();
  }

  onNewEmployee(employee: Employee) {
    console.log('employee: ', employee);
    this.employee = employee;
    this.showMessageSuccess = true;
  }

  onEditEmployee(employee: Employee) {
    console.log('employee: ', employee);
    // this.employee = employee;
  }

  onDestroyEmployee(employee: Employee) {
    console.log('employee: ', employee);
    // this.employee = employee;
  }

  getSalaryColor(e) {
    return e.salary > 2000 ? 'green' : null;
  }

}
