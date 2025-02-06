# Non-Functional Requirements

This section defines the **non-functional requirements** of the Warehouse Management System (WMS), ensuring a structured approach to **usability, performance, reliability, scalability, and supportability**.

---

## **2. Non-Functional Requirements**
Non-functional requirements ensure **performance, usability, reliability, supportability, and scalability** of the WMS.

### **2.1 Usability Requirements**
| **ID**  | **Requirement** | **Priority** |
|---------|----------------|-------------|
| **U1**  | UI components and theme are consistent throughout the application | M |
| **U2**  | Documentation is accessible from the application | S |
| **U3**  | The application is accessible for special needs users | C |
| **U4**  | Data is displayed clearly | M |
| **U5**  | The application has clear labels for functionalities and useful shortcuts for important features | M |

---

### **2.2 Reliability Requirements**
| **ID**  | **Requirement** | **Priority** |
|---------|----------------|-------------|
| **R1**  | System needs to maintain **99.5% uptime** | M |
| **R2**  | System must ensure no data loss or corruption during storage, retrieval, or transmission | M |
| **R3**  | System must support **weekly backups** with secure storage for recovery | M |
| **R4**  | Active user sessions need to persist for at least **24 minutes** without unexpected logout, even during high load | S |
| **R5**  | Notifications must be delivered with **99% success rate** and within **5 minutes** of detection | S |
| **R6**  | Stored pictures must remain retrievable in **original quality for at least 6 months** | S |
| **R7**  | System must periodically check for **database inconsistencies** and alert the admin if anomalies are found | C |
| **R8**  | System must provide **error messages** for invalid actions and guide users towards resolution | M |

---

### **2.3 Performance Requirements**
| **ID**  | **Requirement** | **Priority** |
|---------|----------------|-------------|
| **P1**  | System must respond to user actions (search, add, remove items) in **less than 1 second** under normal conditions | M |
| **P2**  | Database operations must support **up to 100,000 records** without performance degradation | S |
| **P3**  | Web and mobile applications must load within **3 seconds** on standard devices and internet speeds | M |
| **P4**  | System must manage **100,000 inventory records** efficiently | S |
| **P5**  | System architecture must support **horizontal (adding servers) and vertical (adding power) scaling** | S |

---

### **2.4 Supportability Requirements**
| **ID**  | **Requirement** | **Priority** |
|---------|----------------|-------------|
| **S1**  | System must provide **user manuals, setup guides, and API documentation** | M |
| **S2**  | System must support **localization** for at least three languages | C |
| **S3**  | System must maintain **detailed logs** of operations and errors | C |
| **S4**  | System must be accessible via **major web browsers and mobile devices** | M |
| **S5**  | System must provide **clean error codes and descriptions** for easy troubleshooting | M |
| **S6**  | System must provide a **test environment** for updates and new features before deployment | M |
| **S7**  | System must allow **exporting data in CSV, Excel, or PDF format** | S |

---