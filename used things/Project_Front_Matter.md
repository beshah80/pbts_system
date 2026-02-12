# Acknowledgment

We extend our heartfelt gratitude to our advisor, Meseret H., for her unwavering support and dedication to our success. Her invaluable guidance, insightful feedback, and tireless efforts have been pivotal in shaping this project. From assisting us in refining our ideas to providing thoughtful critiques on our documentation, her contributions have been instrumental in helping us overcome challenges and achieve our goals. We deeply appreciate her patience, encouragement, and expertise, which have been a beacon of inspiration throughout the process.

Our sincere appreciation goes to the School of Information Science, Addis Ababa University, for providing the platform to pursue this project.

Finally, we are thankful for the teamwork, collaboration, and effort put in by every member of the team, as well as the unceasing encouragement and patience from our families and friends who shared this journey with us.

# Table of Contents

- [Introduction](#introduction)
  - [Overview](#overview)
  - [Background of the Organization](#background-of-the-organization)
    - [Addis Ababa Road & Transport Bureau (AARTB)](#addis-ababa-road-transport-bureau-aartb)
    - [Anbessa City Bus Service Enterprise (ACBSE)](#anbessa-city-bus-service-enterprise-acbse)
    - [Sheger Mass Transit Enterprise (SMTE)](#sheger-mass-transit-enterprise-smte)
    - [Private Bus Operators (Velocity Bus)](#private-bus-operators-velocity-bus)
  - [Statement of the Problem](#statement-of-the-problem)
    - [Passenger Challenges](#passenger-challenges)
    - [Driver and Supervisor Challenges](#driver-and-supervisor-challenges)
    - [Administrative Challenges](#administrative-challenges)
    - [City-Level Challenges](#city-level-challenges)
  - [Objectives of the Project](#objectives-of-the-project)
    - [General Objective](#general-objective)
    - [Specific Objectives of the Project](#specific-objectives-of-the-project)
  - [Feasibility Study](#feasibility-study)
    - [Technical Feasibility](#technical-feasibility)
    - [Economic Feasibility](#economic-feasibility)
    - [Operational Feasibility](#operational-feasibility)
  - [Significance of the Project](#significance-of-the-project)
  - [Beneficiaries of the Project](#beneficiaries-of-the-project)
  - [Methodology](#methodology)
    - [Data Sources and Collection Methods](#data-sources-and-collection-methods)
      - [Primary Data Sources](#primary-data-sources)
      - [Secondary Data Sources](#secondary-data-sources)
    - [System Development Methodology](#system-development-methodology)
  - [Development Tools and Technologies](#development-tools-and-technologies)
    - [Frontend Technologies](#frontend-technologies)
    - [Backend Technologies](#backend-technologies)
    - [Database Technologies](#database-technologies)
    - [Documentation & Modeling Tools](#documentation-modeling-tools)
    - [Deployment Environment](#deployment-environment)
    - [Development Environment / IDE](#development-environment-ide)
  - [Scope of the Project](#scope-of-the-project)
    - [In-Scope](#in-scope)
    - [Out-of-Scope](#out-of-scope)
  - [Risks, Assumptions, and Constraints](#risks-assumptions-and-constraints)
  - [Phases and Deliverables](#phases-and-deliverables)
  - [Work Breakdown Structure (WBS)](#work-breakdown-structure-wbs)
  - [Project Schedule](#project-schedule)
- [Business Area Analysis and Requirement Definition](#business-area-analysis-and-requirement-definition)
  - [Overview](#overview-1)
  - [Business area analysis](#business-area-analysis)
    - [Activities / functions of the organization](#activities-functions-of-the-organization)
    - [Problems of the current system(Using the PIECES Framework)](#problems-of-the-current-systemusing-the-pieces-framework)
    - [Forms and Reports of the Existing System](#forms-and-reports-of-the-existing-system)
    - [Players of the Existing System](#players-of-the-existing-system)
  - [Requirements Definition](#requirements-definition)
    - [Functional Requirements](#functional-requirements)
    - [Non-Functional Requirements](#non-functional-requirements)
- [Object Oriented Analysis](#object-oriented-analysis)
  - [Overview](#overview-2)
  - [Use Case Modeling](#use-case-modeling)
    - [UI Identification](#ui-identification)
    - [Business Rules Identification](#business-rules-identification)
    - [Actor Identification](#actor-identification)
    - [Designing the Use Case Diagram](#designing-the-use-case-diagram)
    - [Use Case Description](#use-case-description)
  - [Conceptual Modeling](#conceptual-modeling)
    - [Class Diagram](#class-diagram)
    - [Class Descriptions](#class-descriptions)
      - [User Class](#user-class)
      - [Administrator Class](#administrator-class)
      - [Driver Class](#driver-class)
      - [Passenger Class](#passenger-class)
      - [Bus Class](#bus-class)
      - [Route Class](#route-class)
      - [RouteStop Class](#routestop-class)
      - [BusStop Class](#busstop-class)
      - [Terminal Class](#terminal-class)
      - [Schedule Class](#schedule-class)
      - [Trip Class](#trip-class)
      - [Incident Class](#incident-class)
      - [Feedback Class](#feedback-class)
  - [Sequence diagramming](#sequence-diagramming)
  - [User Interface Prototyping](#user-interface-prototyping)
- [Conclusion](#conclusion)
- [References](#references)

# List of Tables

- Table 1.1: Feasibility Summary
- Table 1.2: Tools and Features
- Table 1.3: Scope Boundaries (In-Scope vs Out-of-Scope)
- Table 1.4: Risk Matrix (Likelihood vs Impact)
- Table 2.1: Summary of PIECES Analysis
- Table 3.1: User Interface of our system
- Table 3.2: Actors of the System
- Table 3.3: Use Case: System Login
- Table 3.4: Use Case: Bus Registration
- Table 3.5: Use Case: Driver Management
- Table 3.6: Use Case: Route Creation
- Table 3.7: Use Case: Route Modification
- Table 3.8: Use Case: Schedule Creation
- Table 3.9: Use Case: Schedule Modification
- Table 3.10: Use Case: Feedback Management
- Table 3.11: Use Case: Incident Resolution
- Table 3.12: Use Case: Analytics Reports
- Table 3.13: Use Case: Performance Monitoring
- Table 3.14: Use Case: View Daily Schedule
- Table 3.15: Use Case: Start Trip
- Table 3.16: Use Case: Real-Time Stop Updates
- Table 3.17: Use Case: End Trip
- Table 3.18: Use Case: Incident Reporting
- Table 3.19: Use Case: Delay Reporting
- Table 3.20: Use Case: Emergency Alert
- Table 3.21: Use Case: Search Routes & ETA
- Table 3.22: Use Case: Submit Feedback
- Table 3.23: Use Case: View Real-Time Bus Location
- Table 3.24: Use Case: Web Socket Broadcast
- Table 3.25: Automated Conflict Detection
- Table 3.26: User Class (Abstract Base Class)
- Table 3.27: Administrator Class
- Table 3.28: Driver Class
- Table 3.29: Passenger Class
- Table 3.30: Bus Class
- Table 3.31: Route Class
- Table 3.32: RouteStop Class
- Table 3.33: BusStop Class
- Table 3.34: Terminal Class
- Table 3.35: Schedule Class
- Table 3.36: Trip Class
- Table 3.37: Incident Class
- Table 3.38: Feedback Class

# List of figures

- Figure 1.1: Organizational Structure of Addis Ababa Transport System
- Figure 1.2: WBS Tree (hierarchical representation of project tasks and sub-tasks)
- Figure 1.3: Gantt Chart
- Figure 2.1: Trip Search Form Interface (Guzo System)
- Figure 2.2: Trip Search Result Display Interface
- Figure 2.3: Admin Login Form
- Figure 2.4: User Registration Form
- Figure 2.5: Route Search and Map Display Interface
- Figure 2.6: All Routes Listing Interface
- Figure 2.7: Route Visualization and Stops Display Interface
- Figure 3.1: Use Case Diagram for Public Bus Scheduling and Tracking System
- Figure 3.2: Class Diagram for Public Bus Scheduling and Tracking System
- Figure 3.3: Sequence Diagram - Administrator Authentication
- Figure 3.4: Sequence Diagram - Bus Registration
- Figure 3.5: Sequence Diagram - Route Creation with Stops
- Figure 3.6: Sequence Diagram - Schedule Creation with Conflict Detection
- Figure 3.7: Sequence Diagram - Trip Initiation by Driver
- Figure 3.8: Sequence Diagram - Real-Time Stop Update
- Figure 3.9: Sequence Diagram - Incident Reporting by Driver
- Figure 3.10: Sequence Diagram - Passenger Feedback Submission
- Figure 3.11: Sequence Diagram - Route Search by Passenger
- Figure 3.12: Sequence Diagram - Analytics Report Generation
- Figure 3.13: Home page- for passenger
- Figure 3.14: Feedback page - for passenger
- Figure 3.15: Interactive map - for passenger
- Figure 3.16: Bus tracking page - for passenger
- Figure 3.17: Driver Login - for driver
- Figure 3.18: Driver dashboard - for driver
- Figure 3.19: Incident report page - for driver
- Figure 3.20: Admin login - for admin
- Figure 3.21: Admin dashboard - for admin
- Figure 3.22: Bus management - for admin
- Figure 3.23: Driver management - for admin

# List of Acronyms

| Acronym | Full Form |
|---------|-----------|
| AARTB   | Addis Ababa Road and Transport Bureau |
| ACBSE   | Anbessa City Bus Service Enterprise |
| API     | Application Programming Interface |
| CI/CD   | Continuous Integration / Continuous Deployment |
| CRUD    | Create, Read, Update, Delete |
| CSS     | Cascading Style Sheets |
| DOM     | Document Object Model |
| ETA     | Estimated Time of Arrival |
| GPS     | Global Positioning System |
| HSL     | Hue, Saturation, Lightness |
| HTTP    | Hypertext Transfer Protocol |
| IDE     | Integrated Development Environment |
| JSON    | JavaScript Object Notation |
| JWT     | JSON Web Token |
| KPI     | Key Performance Indicator |
| MVP     | Minimum Viable Product |
| OOA     | Object-Oriented Analysis |
| RBAC    | Role-Based Access Control |
| REST    | Representational State Transfer |
| SEO     | Search Engine Optimization |
| SMTE    | Sheger Mass Transit Enterprise |
| UI      | User Interface |
| UML     | Unified Modeling Language |
| URL     | Uniform Resource Locator |
| UX      | User Experience |
| WBS     | Work Breakdown Structure |

# List of Terminologies

- **Agile Methodology**: An iterative approach to software development that emphasizes flexibility, customer collaboration, and rapid delivery of functional software stages.
- **Audit Trail**: A security-relevant chronological record (log) that provides documentary evidence of the sequence of activities that have affected a specific operation or event.
- **Authentication**: The process of verifying the identity of a user or system, often implemented using JWT in modern web applications.
- **Backend**: The server-side part of the web application responsible for business logic, database interactions, and API management; built using Node.js and Express in this project.
- **Conflict Detection**: An intelligent system feature that automatically identifies overlapping schedules or resource allocations (e.g., assigning a driver to two buses simultaneously) to prevent operational errors.
- **Containerization**: A lightweight form of virtualization that allows applications to run in isolated environments (containers) with all their dependencies, managed here using Docker.
- **Dashboard**: A user interface that organizes and presents information in a way that is easy to read, specific to roles like Admin, Driver, or Passenger.
- **Frontend**: The client-side part of the web application that users interact with directly, developed using Next.js for a responsive and interactive experience.
- **GraphQL**: A query language for APIs and a runtime for fulfilling those queries with your existing data, allowing clients to request exactly the data they need.
- **Incidents**: Unplanned events that disrupt standard operations, such as vehicle breakdowns, traffic accidents, or route blockages, which require immediate reporting and resolution.
- **Middleware**: Software that acts as a bridge between an operating system or database and applications, often used in the backend for processing requests (e.g., authentication checks) before they reach the core logic.
- **MongoDB**: A NoSQL database program that uses JSON-like documents with optional schemas, providing scalability and flexibility for storing unstructured or semi-structured data.
- **Object-Oriented Analysis (OOA)**: A technical approach for analyzing and modeling a system as a group of interacting objects, each representing a system entity (like Bus, Driver, Route).
- **Prisma**: A modern Database Object-Relational Mapper (ORM) that simplifies database access for Node.js and TypeScript developers by providing a type-safe API.
- **Role-Based Access Control (RBAC)**: A method of restricting network access based on the roles of individual users within an enterprise (e.g., ensuring a Driver cannot access Admin functions).
- **Scrum**: A specific framework within the Agile methodology that organizes work into short, consistent cycles called "Sprints" to manage complex software development.
- **Use Case Modeling**: A technique used in system analysis to identify, clarify, and organize system requirements by describing the interactions between users (Actors) and the system.
- **Web Socket**: A computer communications protocol, providing full-duplex communication channels over a single TCP connection, enabling real-time features like live bus tracking.
- **Work Breakdown Structure (WBS)**: A key project management deliverable that organizes the team's work into manageable sections. 
