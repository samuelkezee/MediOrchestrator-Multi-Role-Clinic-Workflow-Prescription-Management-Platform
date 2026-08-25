# 🏥 MediOrchestrator: Multi-Role Clinic Workflow & Prescription Management Platform

MediOrchestrator is a modern, responsive **Angular-based** clinic management application designed to handle patient registration, staff coordination, medicine directories, and digital prescriptions. It features a role-based access system catering to **Doctors**, **Receptionists**, and **Patients**.

The application communicates with a secure backend API hosted at:
`https://testprojectapi.gerasim.in/api/HospitalPrescriptions/`

---

## 🚀 Key Modules & Role-Based Workflows

### 🔐 1. Authentication & Security
- **Secure Log-in System**: Access is gated behind email/password verification.
- **Route Guarding**: All core screens (`/users`, `/medicine-master`, `/patient-list`, `/visits`) are protected by an `authGuard` that redirects unauthorized traffic back to the login screen.
- **HTTP Interception**: An Angular HTTP Interceptor (`token.interceptor.ts`) automatically clones outgoing requests to append `Authorization: Bearer <JWT_Token>` headers, and catches `401 Unauthorized` responses to automatically clear stale sessions and log users out.

### 👥 2. Role-Based Features
- **Doctor**:
  - View all registered patients and past visit logs.
  - Record visit summaries, symptoms, diagnoses, and prescribe medicines.
  - Create and manage prescription item checklists.
- **Receptionist**:
  - Perform public/unauthenticated patient registrations.
  - Manage user accounts (staff members) and toggle their active/inactive status.
  - Book and update status of clinic visits.
- **Patient**:
  - Access online self-registration (`/register-patient`).
  - View personal prescription history (via patient-specific visit listings).

### 🧪 3. Resource Management
- **Staff Directory**: Add, update, and filter staff records by role (`Doctor`, `Receptionist`).
- **Medicines Master**: Maintain a centralized directory of available medicines detailing dosage forms (Tablets, Capsules, Syrups, Injections, Ointments) and strengths.
- **Patient Directory**: Retrieve patient records, contact info, date of birth, and home address.
- **Visits & Prescription Flow**: Track visit status transitions (Scheduled, In-Progress, Completed, Cancelled) and link each visit to specific prescription items.

---

## 📂 Project Structure

Below is the directory mapping of the Angular frontend:

```text
Clinic_Manager/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                  # Core singletons and configurations
│   │   │   │   ├── constants/         # API paths, patterns, role names (GlobalConstants.ts)
│   │   │   │   ├── enum/              # Common enums
│   │   │   │   ├── guards/            # Auth status check (auth.guard.ts)
│   │   │   │   ├── interceptors/      # Bearer token injecting interceptor (token.interceptor.ts)
│   │   │   │   ├── models/            # Data structures & Interface/Class schemas
│   │   │   │   └── services/          # HTTP request handlers (Userservices, MedicineService, PatientService)
│   │   │   ├── pages/                 # UI components
│   │   │   │   ├── layout/            # Main layout containing navbar, sidebar, and router-outlet
│   │   │   │   ├── login/             # Portal entry/authentication form
│   │   │   │   ├── medicines-master/  # Medicine search, insert, and update UI
│   │   │   │   ├── patient/           # Registration form and master directory listing
│   │   │   │   ├── users/             # Staff management screen (create, read, search, toggle status)
│   │   │   │   └── visits/            # Visit records & prescription builder
│   │   │   ├── app.routes.ts          # Angular Route Definitions
│   │   │   └── app.config.ts          # Core config (routing, HttpClient, interceptors)
│   │   └── environments/              # API Base URLs (environment.ts)
```

---

## ⚙️ Installation & Development Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.x or above) installed on your system.

### Steps

1. **Clone and navigate to the project directory:**
   ```bash
   cd Clinic_Manager/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run start
   ```
   *The app will compile and become available at `http://localhost:4200/`.*

4. **Build the production bundle:**
   ```bash
   npm run build
   ```
   *This compiles the application and stores optimized build assets in `dist/frontend/`.*

5. **Run tests (using Vitest):**
   ```bash
   npm run test
   ```

---

## 🌐 API Endpoint Reference

All endpoints are prefixed with the base URL: `https://testprojectapi.gerasim.in`

### 🔑 Authentication
| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/HospitalPrescriptions/login` | Authenticate staff member. Returns a JWT Token and profile metadata. | `{"email": "...", "password": "..."}` |

### 📊 Dashboard
| Method | Endpoint | Description | Request Headers |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/HospitalPrescriptions/dashboard` | Fetch high-level statistics for the dashboard (e.g., patient, doctor, and visit counts). | `Authorization: Bearer <token>` |

### 👥 Staff Management
| Method | Endpoint | Description | Request Payload / URL Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/HospitalPrescriptions/staff` | Retrieve all registered staff members. Filter by role using optional query param: `?roleName=Doctor`. | None |
| **POST** | `/api/HospitalPrescriptions/staff` | Register a new staff member (e.g., Doctors, Receptionists). | `{"fullName": "...", "email": "...", "password": "...", "mobileNo": "...", "roleName": "...", "isActive": true}` |
| **GET** | `/api/HospitalPrescriptions/staff/{staffUserId}` | Retrieve detailed information for a specific staff member. | `staffUserId` (integer path parameter) |
| **PUT** | `/api/HospitalPrescriptions/staff/{staffUserId}` | Update details of an existing staff member. | `staffUserId` (path) + Updated fields (body) |
| **DELETE** | `/api/HospitalPrescriptions/staff/{staffUserId}` | Deactivate/remove a staff member from the platform. | `staffUserId` (integer path parameter) |

### 🩺 Patient Directory
| Method | Endpoint | Description | Request Payload / URL Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/HospitalPrescriptions/patients` | Retrieve a list of all clinic patients. | None |
| **POST** | `/api/HospitalPrescriptions/patients` | Register a new patient. | `{"fullName": "...", "gender": "...", "dateOfBirth": "...", "phone": "...", "address": "..."}` |
| **GET** | `/api/HospitalPrescriptions/patients/{patientId}` | Get details of a specific patient. | `patientId` (integer path parameter) |
| **PUT** | `/api/HospitalPrescriptions/patients/{patientId}` | Modify an existing patient's details. | `patientId` (path) + Updated patient fields (body) |
| **DELETE** | `/api/HospitalPrescriptions/patients/{patientId}` | Delete/archive a patient file. | `patientId` (integer path parameter) |

### 💊 Medicine Directory
| Method | Endpoint | Description | Request Payload / URL Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/HospitalPrescriptions/medicines` | Get all medicines registered in the clinic inventory. | None |
| **POST** | `/api/HospitalPrescriptions/medicines` | Insert a new medicine format/dose into the directory. | `{"name": "...", "strength": "...", "form": "..."}` |
| **GET** | `/api/HospitalPrescriptions/medicines/{medicineId}` | Get details of a specific medicine. | `medicineId` (integer path parameter) |
| **PUT** | `/api/HospitalPrescriptions/medicines/{medicineId}` | Update medicine properties (e.g., strength, form type). | `medicineId` (path) + Updated medicine fields (body) |
| **DELETE** | `/api/HospitalPrescriptions/medicines/{medicineId}` | Delete a medicine entry from the inventory. | `medicineId` (integer path parameter) |

### 📅 Visit Management
| Method | Endpoint | Description | Request Payload / URL Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/HospitalPrescriptions/visits` | Retrieve all scheduled or completed patient visits. | None |
| **POST** | `/api/HospitalPrescriptions/visits` | Create/schedule a new patient visit. | `{"patientId": 0, "doctorUserId": 0, "visitDate": "YYYY-MM-DD", "symptoms": "..."}` |
| **GET** | `/api/HospitalPrescriptions/visits/search` | Search/filter visits by criteria. | Query parameter: `?searchText=query` |
| **GET** | `/api/HospitalPrescriptions/visits/patient/{patientId}` | Fetch all past visits logged under a specific patient. | `patientId` (integer path parameter) |
| **GET** | `/api/HospitalPrescriptions/visits/{visitId}` | Fetch detailed visit information by visit ID. | `visitId` (integer path parameter) |
| **PUT** | `/api/HospitalPrescriptions/visits/{visitId}` | Update details of a visit record. | `visitId` (path) + Updated fields (body) |
| **DELETE** | `/api/HospitalPrescriptions/visits/{visitId}` | Cancel/delete a visit log. | `visitId` (integer path parameter) |
| **POST** | `/api/HospitalPrescriptions/visits/with-prescription` | Create a visit and immediately supply corresponding prescription details. | Combined payload containing both visit metrics and prescription line items. |
| **PUT** | `/api/HospitalPrescriptions/visits/{visitId}/status` | Update status (e.g., Transition from Scheduled ➡️ In-Progress ➡️ Completed). | `visitId` (path) + `?status=NewStatus` (query) |

### 📝 Prescription Items
| Method | Endpoint | Description | Request Payload / URL Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/HospitalPrescriptions/prescription-items` | Get all prescription items. | None |
| **POST** | `/api/HospitalPrescriptions/prescription-items` | Add a medicine item with instructions to a patient prescription. | `{"visitId": 0, "medicineId": 0, "dosage": "...", "duration": "...", "instructions": "..."}` |
| **PUT** | `/api/HospitalPrescriptions/prescription-items/{prescriptionItemId}` | Modify dosage or duration for an active prescription item. | `prescriptionItemId` (path) + Updated item details (body) |
| **DELETE** | `/api/HospitalPrescriptions/prescription-items/{prescriptionItemId}` | Remove a medicine item from a patient's prescription. | `prescriptionItemId` (integer path parameter) |

---

## 🛠️ Technology Stack Detail

- **Framework**: [Angular CLI](https://angular.dev) v21.2.20 (Single Page Application architecture)
- **State & Communication**: RxJS Observables, Signals (`signal`, `WritableSignal`), Custom HTTP Interceptors
- **Styling & Layout**: Bootstrap v5.3.8, Bootstrap Icons v1.13.1, Custom layout styling
- **Form Controls**: Angular `ReactiveFormsModule` (for complex validation on users screen) and `FormsModule` (for template-driven components)
- **Unit Testing**: Vitest v4.0.8, JSDOM v28.0.0
