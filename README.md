# 🏥 Clinic Management System

## 📌 Project Title
**Clinic Management System** – A web-based platform to streamline clinic operations for doctors and receptionists using Firebase as the backend.

---

## 🌐 Domain
**Healthcare**

---

## 🧰 Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- Firebase (Authentication, Realtime Database / Firestore, Hosting)
- Logging (console logs or external logging if extended)

---

## 🧠 Problem Statement

The Clinic Management System simplifies communication between doctors and receptionists by enabling:
- Efficient token assignment
- Patient data entry
- Doctor diagnosis and prescription management
- Billing operations
- Full patient history tracking

The solution ensures that patient information is always available, securely stored, and easily retrievable.

---

## 📦 Project Modules

### 👨‍⚕️ Doctor Module
- Login/Signup via Firebase Authentication
- View assigned patients and their personal data
- Add prescriptions and update patient medical history
- View patient visit history

### 🧾 Receptionist Module
- Login/Signup via Firebase
- Add new patient entries and assign auto-generated tokens
- View token queue and forward patient data to the doctor
- Initiate billing requests

### 📑 Token Generation
- Auto-incremental token generator for new patients using Firebase backend logic

### 🗂 Patient Management
- Stores patient details, prescriptions, and medical records in Firestore
- Patients’ history is visible to both roles

### 💳 Billing
- Generates bills based on services and medication charges
- Can be printed/downloaded

---

## ⚙️ Project Workflow

1. **Receptionist** logs in → adds patient info → assigns token → patient goes into doctor queue
2. **Doctor** logs in → sees tokenized patient list → checks patient → adds prescription
3. Prescription + patient record saved → accessible to both receptionist and doctor
4. Receptionist generates **bill** based on service and medicine charges
5. All activities logged for transparency

---

## 📐 System Architecture

> 📎 Detailed system architecture is included in the `docs/architecture.pdf`

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Auth + Firestore)
- **Hosting**: Firebase Hosting or Localhost (with justification)
- **Architecture**: Modular, secure, portable

---

## 🧪 Test Cases

| Test Case | Description                             | Expected Output                      |
|-----------|-----------------------------------------|--------------------------------------|
| TC1       | Receptionist logs in                    | Redirect to dashboard                |
| TC2       | Doctor adds prescription                | Saved in database and logged         |
| TC3       | Token generated for a patient           | Token ID stored in DB                |
| TC4       | Billing generated for patient           | PDF/invoice preview + database entry |
| TC5       | View patient history                    | Previous records displayed           |

---

## 🧱 Code Quality Metrics

- ✅ **Modular** – Functions and components are separated
- ✅ **Safe** – Input sanitization and Firebase rules
- ✅ **Testable** – Each feature independently testable
- ✅ **Maintainable** – Easy to extend with new roles or modules
- ✅ **Portable** – Works across browsers and systems

---

## 🔐 Logging

- All user actions (login, create, update, billing) are logged using `console.log()` or external logging services.
- Extendable to use logging libraries (e.g., Winston, LogRocket)

---

## 🚀 Deployment

The app can be deployed on:

- **Firebase Hosting** (Recommended)
- **GitHub Pages** (Frontend only)
- **Localhost** with Firebase backend

Deployment justification is included in the design document.

---

## 📁 Folder Structure

