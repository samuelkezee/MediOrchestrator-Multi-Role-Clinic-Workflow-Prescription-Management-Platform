import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { form, minLength, required, FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { GlobalConstants } from '../../core/constants/GlobalConstants';
import { MedicineModel } from '../../core/models/interfaces/Medicine.Model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as MedicineActions from '../../store/medicines/medicines.actions';
import { selectMedicines } from '../../store/medicines/medicines.selectors';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-medicines-master',
  imports: [FormField, NgClass, FormsModule],
  templateUrl:'./medicines-master.html',
  styleUrl: './medicines-master.css',
})
export class MedicinesMaster implements OnInit {
  private store = inject(Store<AppState>);

  isFormOpen = signal<boolean>(false);
  medicineList = this.store.selectSignal(selectMedicines);
  selectedMedicine = signal<string>('');
  searchMedicine = signal<string>('');

  newMedicine = signal<MedicineModel>({
    medicineId: 0,
    name: '',
    strength: '',
    form: '',
  });

  // Signal-based form
  medicineForm = form(this.newMedicine, (schema) => {
    required(schema.name, { message: 'Medicine name is required' });
    minLength(schema.name, 3, { message: 'Name must be at least 3 characters' });
    required(schema.strength, { message: 'Strength is required' });
    required(schema.form, { message: 'Form is required' });
  });

  // Computed signal to dynamically filter medicines
  filteredMedicineList = computed(() => {
    const formFilter = this.selectedMedicine().toLowerCase().trim();
    const search = this.searchMedicine().toLowerCase().trim();
    let list = this.medicineList();

    if (formFilter) {
      list = list.filter((item) => (item.form || '').toLowerCase() === formFilter);
    }

    if (search) {
      list = list.filter(
        (item) =>
          (item.name || '').toLowerCase().includes(search) ||
          (item.strength || '').toLowerCase().includes(search) ||
          (item.form || '').toLowerCase().includes(search)
      );
    }

    return list;
  });

  ngOnInit(): void {
    this.store.dispatch(MedicineActions.loadMedicines());
  }

  getAllMedicine(): void { this.store.dispatch(MedicineActions.loadMedicines()); }

  onReset(): void {
    this.newMedicine.set({
      medicineId: 0,
      name: '',
      strength: '',
      form: '',
    });
    this.medicineForm().reset();
  }

  onResetFilter(): void {
    this.selectedMedicine.set('');
    this.searchMedicine.set('');
  }

  toggleFormVisibility(): void {
    if (!this.isFormOpen()) {
      this.onReset();
      this.isFormOpen.set(true);
    } else {
      this.isFormOpen.set(false);
    }
  }

  onEdit(item: MedicineModel): void {
    this.newMedicine.set({
      medicineId: item.medicineId,
      name: item.name,
      strength: item.strength,
      form: item.form,
    });
    this.isFormOpen.set(true);
  }

  onDelete(id?: number): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this medicine?')) return;

    this.store.dispatch(MedicineActions.deleteMedicine({ id }));
  }

  onsave(): void {
    if (this.medicineForm().invalid()) {
      return;
    }

    const formValue = this.medicineForm().value() as MedicineModel;

    this.store.dispatch(MedicineActions.saveMedicine({ medicine: formValue }));
    this.onReset();
    this.isFormOpen.set(false);
  }
}
