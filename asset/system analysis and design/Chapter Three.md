**ADDIS ABABA UNIVERSITY COLLEGE**

**OF NATURAL AND COMPUTATIONAL**

**SCIENCES**

School of Information Science

Public Bus Tracking and Scheduling System

for Ethiopian Cities

No

Name

ID

1

Elishaday Bilelign

UGR/4850/15

2

Selamawit Mesfin

UGR/0161/15

3

Beshah Ashenafi

UGR/5569/15

4

Biniyam Moges

UGR/6967/15

5

Frezer Gebeyaw

UGR/7381/15

6

Kenbon Leta

UGR/8977/14

**Content**

Chapter 3: Object Oriented Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .1

3.1 Overview. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1

3.2 Use Case Modeling. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1

3.2.1 UI Identification. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1

3.2.2 Business Rules Identification. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5

3.2.3 Actor Identification. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

3.2.4 Designing the Use Case Diagram. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8

3.2.5 Use Case Description. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10

3.3 Conceptual Modeling. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .23

3.3.1 Class Diagram. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23

3.3.2 Class Descriptions. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25

3.4. Sequence diagramming. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .43

3.5. User Interface Prototyping. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 60

— 1 —

**Chapter 3: Object Oriented Analysis** **3.1 Overview**

This chapter presents the Object-Oriented Analysis \(OOA\) for the Public Bus Tracking and Scheduling System for Ethiopian Cities. Object-Oriented Analysis is a crucial methodology used to define the software requirements by modeling the system as a group of interacting objects. The primary goal of this phase is to identify and formally describe the system's core functional requirements, business rules, and its static and dynamic structures from the user's perspective. 

For this project, the OOA phase is instrumental in transforming the identified problems of urban mobility—such as unpredictable bus arrivals, inefficient scheduling, and lack of real- time information for passengers and managers—into a clear, structured, and unambiguous software specification. The models developed in this chapter will serve as the foundational blueprint, ensuring that the subsequent design and implementation stages are aligned with the specific needs of Ethiopian cities' public transport ecosystem. This analysis is structured into three key modeling activities: Use Case Modeling to capture functional requirements, Conceptual Modeling to define the static structure, and Sequence Diagramming to illustrate dynamic interactions. 

**3.2 Use Case Modeling**

Use Case Modeling is a foundational technique in object-oriented analysis that serves to capture the functional requirements of a system from an external perspective. It focuses on what the system should do, rather than how it will do it, by defining the interactions between users and the system to achieve specific, valuable goals. For the Public Bus Tracking and Scheduling System, this process is instrumental in translating the complex, real-world challenges of urban Ethiopian transport—such as information asymmetry, scheduling inefficiencies, and operational opacity—

into a clear, structured set of system behaviors. By systematically identifying user interfaces, defining governing business rules, categorizing actors, and modeling their interactions, use case modeling ensures the resulting platform is both functionally robust and deeply aligned with the needs of its diverse stakeholders, from daily commuters to city transport manages. 

**3.2.1 UI Identification**

User Interface \(UI\) Identification is the process of enumerating and defining the primary points of interaction between the actors and the system. It moves beyond abstract functionality to conceptualize the tangible screens and components through which users will accomplish their

— 1 —

goals. This step is not concerned with visual design elements like color or typography, but rather with the functional layout, information architecture, and navigational flow. For this system, UI identification is critical due to the varied contexts of its users: a passenger on a mobile device needs quick, glanceable information, while a system administrator at a desktop requires comprehensive data management tools. Identifying these interfaces early ensures that the system's architecture supports a seamless, intuitive, and context-aware user experience, bridging the gap between high-level use cases and the final, deployable application. 

Table 3.1. User Interface of our system

ID

User Interface

Used By

Description/Purpose

UI\_01 System Login Page

Admin, Driver, 

A secure authentication gateway for all users Passenge

to access their respective dashboards. 

UI\_02 Admin Dashboard Home

Admin

The main admin portal showing KPIs \(On-

time Performance, Active Buses, etc.\) and

system health alerts. 

UI\_03 Bus Fleet Management Page

Admin

Interface for registering new buses, editing details \(license plate, capacity\), and

decommissioning buses. 

UI\_04 Driver Management Page

Admin

Interface for registering new drivers, 

assigning them to buses, and managing their accounts. 

UI\_05 Route Management Page

Admin

Interface for creating new bus routes, 

defining stop sequences, and modifying

existing routes. 

UI\_06 Schedule Management Page

Admin

Interface for creating and modifying

departure/arrival timetables for buses on

specific routes. 

— 2 —

UI\_07 Feedback & Complaints Inbox Admin A dedicated interface to view, filter, and respond to feedback and complaints

submitted by passengers. 

UI\_08 Incident Resolution Dashboard Admin

A console to view reported incidents \(delays, emergencies\), assign resources, and mark

them as resolved. 

UI\_09 Analytics & Reporting Page

Admin

Interface to generate, view, and export

performance reports \(e.g., punctuality, 

passenger load\). 

UI\_10 System Monitoring Page

Admin

A real-time view of system status, including server health and GPS data feed integrity. 

UI\_11 Driver Login Screen

Driver

A simple, secure login screen for the driver's mobile/tablet application. 

UI\_12 Driver Trip Dashboard

Driver

The main screen for drivers, showing their daily schedule, a "Start/End Trip" button, and next stop information. 

UI\_13 Incident Reporting Screen

Driver

A form-based interface for drivers to report incidents \(breakdowns, accidents\) with

reason and optional notes. 

UI\_14 Delay Reporting Screen

Driver

A quick-access screen \(often a modal\) to

report a delay, typically with pre-set reasons like "Heavy Traffic." 

UI\_15 Emergency Alert Screen

Driver

A single, highly prominent button to trigger an immediate emergency alert to system

— 3 —

administrators. 

UI\_16 Passenger App Home \(Live

Passenger

The default screen featuring an interactive Map\)

map showing the user's location and real-

time positions of buses. 

UI\_17 Route Search & Results Page

Passenger

Interface for passengers to enter a start and destination to find available routes and see estimated arrival times. 

UI\_18 Feedback Submission Form

Passenger

A form accessible from the passenger app to submit feedback, complaints, or suggestions. 

UI\_19 Real-time Notification Panel

Passenger

A screen within the app to view and manage push alerts for bus arrivals, delays, and

system announcements

UI\_20 System Broadcast Console

System

A backend interface \(used by the

system/WebSocket service\) to manage and

push real-time alerts to all connected clients. 

UI\_21 Conflict Detection Log

System / Admin

An administrative interface that displays

automatically detected scheduling conflicts or resource allocation issues for review. 

— 4 —

**3.2.2 Business Rules Identification** The Public Bus Tracking and Scheduling System is obliged to operate under a clearly defined set of business rules that standardize data management and how operational decisions are enforced. 

The following business rules ensure consistency, accountability, and regulatory compliance across all participating operators \(Anbessa, Sheger, Velocity\), as well as the Addis Ababa Road and Transport Bureau \(AARTB\). 

**A. Bus and Driver Management Rules**

1. Each bus must be uniquely registered using a valid plate number, operator type, and capacity before it can be assigned to any route. 

2. A driver may only be assigned to one bus at a time, and each trip can only be operated by a single active driver. 

3. Driver assignments must respect licensing requirements, meaning only drivers with valid and verified licenses can operate buses. 

4. Buses marked as “Under Maintenance” cannot be scheduled until maintenance status is updated to “Operational.” 

5. Driver shift changes must be logged and time-stamped to ensure accountability and schedule traceability. 

**B. Route and Scheduling Rules**

1. A bus cannot be scheduled on overlapping routes or times, ensuring no double- allocation occurs. 

2. Each route must have clearly defined stops and terminals, and these cannot be modified without administrative approval. 

3. Schedules must follow the valid operational hours of the assigned route, as defined by operator policy. 

4. Any schedule change must be automatically logged, including the administrator who performed the modification. 

**C. Incident and Maintenance Rules**

1. Drivers must report incidents \(breakdown, accident, delay\) immediately using the system’s incident reporting feature. 

2. Incident severity levels determine notification priority, with critical incidents triggering instant alerts to administrators. 

3. A maintenance request must be created before a bus can be moved to “Under Repair” 

— 5 —

status. 

4. Completed maintenance must be verified by a maintenance supervisor before the bus is returned to service. 

5. Historical incident and maintenance records must remain uneditable, preserving data integrity. 

**D. Passenger Information and Service Rules** 1. Passengers must be able to view schedules, routes, and static arrival estimates, and these must reflect the latest approved data. 

2. Passenger feedback must be categorized \(delay, overcrowding, safety, etc.\) and assigned a status such as “Pending,” “Reviewed,” or “Resolved.” 

3. Feedback cannot be deleted, only archived or closed by authorized administrators. 

4. Service information visible to passengers must remain consistent across all operators, following AARTB communication standards. 

**E. System Access and Control Rules**

1. User authentication is required for all administrative and operational functions, including schedule editing and bus status updates. 

2. Role-Based Access Control \(RBAC\) must be enforced, with distinct permission levels for drivers, operators, and AARTB administrators. 

3. Every change or update within the system must generate an entry in the audit log, including date, user, and action performed. 

4. Only AARTB administrators may approve or deactivate routes, while operators manage bus and driver assignments. 

5. Drivers may only update trip progress and report incidents, not modify routes or schedules. 

**F. Reporting and Data Rules**

1. Daily, weekly, and monthly reports must automatically compile data from the system, replacing manual reporting workflows. 

2. Data used for reports must originate only from verified internal sources \(driver logs, assignments, incident reports\). 

3. Reports submitted to AARTB must follow standard templates for performance monitoring. 

4. Historical data must be retained for audit and regulatory purposes, following national digital governance standards

5. Duplicate entries \(bus registration, driver ID, route ID\) must be prevented at the database

— 6 —

level. 

**3.2.3 Actor Identification**

Actors are external entities such as users, operational staff, and automated system components that interact with the Public Bus Scheduling and Tracking System to accomplish various transportation-related tasks. Identifying these actors is a crucial part of system analysis because it establishes the boundaries of the system, highlights who depends on the system’s services, and clarifies how each actor contributes to the overall operation of the bus network. 

In the context of a bus scheduling and real-time tracking environment, the system supports multiple categories of actors, each with unique goals and responsibilities. Administrators are responsible for managing operational data such as buses, drivers, routes, and schedules; drivers rely on the system to perform live trip updates and incident reporting; passengers use the system to access route information and track buses in real time; and internal automated services ensure continuous communication and conflict detection. 

By identifying and understanding these different actors, the system can be designed to meet operational requirements, improve transportation efficiency, and provide a seamless experience for all users. 

Table 3.2 : Actors of the System

Actor

Instruction

Interaction with the System

Admin

System administrator

Manages bus and driver

responsible for managing

records, creates and updates

fleet data, drivers, routes, 

routes and schedules, resolves

schedules, and monitoring

incidents, responds to

operational performance. 

feedback, and generates

performance and analytics

reports. 

Driver

Authorized bus operator

Logs into the driver

responsible for carrying out

dashboard, views assigned

scheduled trips and reporting

schedules, starts and ends

operational statuses during

trips, sends real-time stop

transit. 

updates, 

— 7 —

reportsdelays/incidents, and triggers

emergency alerts. 

Passenger

Public transport user

Searches routes and ETAs, 

searching for route

views real-time bus locations, 

information, tracking bus

and submits feedback about

movements, and submitting

services. 

feedback. 

System Services \(Internal

Automated background

Broadcasts Web Socket real-

Actor\)

services responsible for

time updates to passengers and

managing real-time

admins, performs automated

communication and validating conflict detection during scheduling constraints. 

route/schedule

creation, and ensures data

consistency across modules. 

**3.2.4 Designing the Use Case Diagram**

A use case represents a specific interaction between an actor and the system that enables the achievement of a meaningful goal. In the context of the Public Bus Scheduling and Tracking System, use cases help describe how different users such as administrators, drivers, and passengers interact with the system to perform essential transportation-related tasks. These interactions include activities like managing bus schedules, reporting incidents, tracking bus locations, and accessing route information. 

Use case diagrams serve as an effective method for capturing and communicating the functional requirements of the system. They provide a visual overview of how external entities depend on the system’s capabilities and how the system must respond to achieve operational goals. By designing a comprehensive use case diagram for the Public Bus Scheduling and Tracking System, we can clearly define system boundaries, 

— 8 —



identify all key actors, and document the required functionalities in a structured and easily understandable form. 

Figure 3.1 : Use Case Diagram for Public Bus Scheduling and Tracking System

— 9 —

**3.2.5 Use Case Description** Table 3.3 Use Case: System Login

Description

This use case allows all system users

administrators, drivers, and passengers to securely authenticate and access their

respective system dashboards. Each actor logs in to access features that correspond to their role within the Public Bus Scheduling and

Tracking System. 

Precondition

1. User has a registered account in the system. 

2. The system is online and accessible. 

Postcondition

3 User is successfully authenticated. 

4 The system redirects the user to their role-based dashboard \(Admin Dashboard, Driver

Dashboard, or Passenger Dashboard\). 

Trigger

User enters their username/ID and password in the login form. 

Normal Flow

A. User navigates to the login page. 

B. User enters credentials \(username/ID and password\). 

C. System validates the input format. 

D. System checks user information in the

authentication database. 

E. If valid, system identifies the user’s role \(Admin, Driver, Passenger\). 

F. System loads the appropriate dashboard

based on role. 

G. User gains access to system services. 

— 10 —

Alternative Flow

**AF-01**: Invalid Credentials – System displays an error message and prompts the user to re-enter correct login information. 

**AF-02**: Incorrect Role Credentials – User attempts to access a restricted dashboard →

System denies access and redirects to role-appropriate dashboard. 

**AF-03**: Account Locked – After multiple failed attempts, account is locked → User

must contact admin/support. 

**AF-04**: Missing Fields – System detects empty username or password field →

Prompts user to fill in required fields. 

**AF-05**: Network/Server Error – System cannot connect to authentication service →

Displays temporary access error message. 

Table 3.4 Use Case: Bus Registration

Name

Bus Registration

Identifier

UC-002

Actors

Admin

Description

Admin registers new buses into the fleet

system

Precondition

Admin is logged in. 

Postcondition

Bus details saved and available for

scheduling. 

Trigger

Admin selects “Register Bus”. 

Normal Flow

1\) Admin opens the bus registration form. 

2\) Admin enters all required fields \(plate number, capacity, model, etc.\). 

3\) System validates inputs. 

4\) System checks for duplicate plate number. 

5\) System saves the bus to the database. 

6\) System displays success message. 

— 11 —

Alternative Flow

AF-01: Missing Required Fields → System

requests admin to complete missing

information. 

AF-02: Duplicate Bus Plate → System warns

and prevents registration. 

AF-03: Validation Error → System highlights incorrect fields. 

Table 3.5.Use Case: Driver Management

Name

Driver Management

Identifier

UC-003

Actors

Admin

Description

Admin adds, updates, or removes drivers

from the system. 

Precondition

Admin is authenticated. 

Postcondition

Driver account created/updated/deleted. 

Trigger

Admin selects driver management option. 

Normal Flow

1. Admin opens driver management panel. 

2. Admin creates or selects a driver. 

3. Admin enters or edits driver details. 

4. System validates license number and

inputs. 

5. System saves driver data. 

6. System confirms success. 

Alternative Flow

AF-01: Invalid License Number → System

rejects entry. 

AF-02: Driver Already Exists → System

prompts update instead. 

— 12 —

Table 3.6. Use Case: Route Creating Name

Route Creation

Identifier

UC-004

Actors

Admin

Description

Create a new bus route with stops and route details. 

Precondition

Admin is logged in. 

Postcondition

New route stored in system. 

Trigger

Admin selects "Create Route". 

Normal Flow

1. Admin opens route creation form. 

2. Admin enters route number, 

stops, direction, and map details. 

3. System validates stops and route format. 

4. System checks for conflicts \(extend:

UC- 023\). 

5. System saves route. 

6. System confirms creation. 

Alternative Flow

AF-01: Conflict Detected → System suggests correction. 

AF-02: Missing Stop Locations → Admin

must complete data. 

Table 3.7 Use Case: Route Modification

Name

Route Modification

Identifier

UC-005

Actors

Admin

Description

Edit an existing bus route. 

Precondition

Route exists in system. 

Postcondition

Route updated. 

Trigger

Admin selects "Edit Route". 

— 13 —

Normal Flow

1. Admin selects route to edit. 

2. Admin modifies stops or direction. 

3. System validates updates. 

4. Conflict Detection runs \(extend\)

Alternative Flow

AF-01: Invalid Route Data → System

prevents saving. 

AF-02: Conflict Found → Admin must

resolve issues. 

Table 3.8 Use Case: Schedule Creation

Name

Schedule Creation

Identifier

UC-006

Actors

Admin

Description

Create new schedules for buses and drivers. 

Precondition

Bus, route, and driver exist. 

Postcondition

Schedule saved. 

Trigger

Admin selects “Create Schedule”. 

Normal Flow

1. Admin selects route and bus. 

2. Admin assigns driver. 

3. Admin sets departure & arrival time. 

4. System validates schedule. 

5. Conflict Detection runs \(extend\). 

6. System saves schedule. 

Alternative Flow

AF-01: Driver/Bus Overlap → System alerts

admin. 

AF-02: Invalid Times → System asks

correction. 

Table 3.7 Use Case: Schedule Modification

Name

Schedule Modification

Identifier

UC-007

Actors

Admin

Description

Modify existing bus schedule. 

— 14 —

Precondition

Schedule exists. 

Postcondition

Schedule updated. 

Trigger

Admin selects “Edit Schedule”. 

Normal Flow

Similar to UC-006 but editing instead of

creating. 

Alternative Flow

Same alternatives as UC-06. 

Table 3.8 Use Case: Feedback Management

Name

Feedback Management

Identifier

UC-008

Actors

Admin

Description

View and handle passenger feedback. 

Precondition

Feedback exists. 

Postcondition

Feedback marked handled/responded. 

Trigger

Admin opens feedback page. 

Normal Flow

1. Admin views feedback list. 

2. Admin reads details. 

3. Admin responds or resolves. 

4. System stores action. 

Alternative Flow

AF-01: No Feedback → System shows

empty list. 

Table 3.9 Use Case: Incident Resolution

Name

Incident Resolution

Identifier

UC-009

Actors

Admin

Description

Admin resolves incidents submitted by

drivers. 

Precondition

Incident report exists. 

Postcondition

Incident marked resolved. 

Trigger

Driver submits incident. 

— 15 —

Normal Flow

1. Admin opens incident list. 

2. Admin reviews details. 

3. Admin resolves incident or requests info. 

System saves status. 

Alternative Flow

AF-01: Insufficient Info → Admin requests

details. 

Table 3.10 Use Case: Analytics Reports

Name

Analytics Reports

Identifier

UC-010

Actors

Admin

Description

This use case enables the admin to generate analytical reports based on bus operations, schedules, delays, incidents, feedback, and driver performance. These reports help in

monitoring system efficiency and making

data-driven decisions. 

Precondition

1. Admin is logged in. 

2. System contains collected trip data, 

incident logs, delays, and feedback

records. 

Postcondition

1. Analytics report is generated successfully. 

2. Admin can view, download, or export

the report. 

Trigger

Admin selects "Generate Analytics Report" 

from the dashboard. 

— 16 —

Normal Flow

1. Admin navigates to the analytics module. 

2. Admin chooses report type \(daily, 

weekly, monthly, custom\). 

3. Admin selects required parameters

\(route, driver, bus, date range, etc.\). 

4. System retrieves relevant operational

data. 

5. System analyzes and compiles results

into charts, tables, KPIs, and

summaries. 

6. System displays the generated report to The

7. admin

Alternative Flow

 AF-01: No Data Available → System

notifies admin that the selected date

range has insufficient data. 

 AF-02: Invalid Filter Selection → System prompts admin to correct filters \(e.g., 

invalid date range\). 

 AF-03: Processing Timeout → System

fails to process large datasets and

suggests narrowing the report scope. 

Table 3.11 Use Case: Performance Monitoring Name

Performance Monitoring

Identifier

UC-011

Actors

Admin

Description

Allows the admin to monitor real-time and

historical operational performance of buses, drivers, and the scheduling system. This

includes delays, route efficiency, on-time performance, passenger feedback trends, 

and incident frequency

— 17 —

Precondition

1. Admin is authenticated. 

System has collected recent operational

metrics. 

Postcondition

Admin views performance indicators displayed in charts, tables, or alerts. 

Trigger

Admin opens the “Performance Monitoring” 

dashboard. 

Normal Flow

1. Admin opens the performance dashboard. 

2. System loads KPIs such as average

delay time, on-time statistics, incidents

per route, passenger satisfaction scores, 

and driver efficiency. 

3. Admin filters or selects specific metrics. 

System updates dashboard visuals based on

selected filters. 

Alternative Flow

AF-01: Real-Time Data Not Available →

System displays last updated snapshot. 

AF-02: Metric Calculation Error → System

notifies admin and hides incomplete KPIs. 

Table 3.12 Use Case: View Daily Schedule

Name

View Daily Schedule

Identifier

UC-012

Actors

Driver

Description

Driver views all assigned trips for the day, including departure times, route details, and bus information. 

Precondition

Driver is logged in and has assigned trips. 

Postcondition

Schedule is displayed. 

Trigger

Driver selects “View Daily Schedule”. 

— 18 —

Normal Flow

1. System retrieves the driver’s assigned

trips. 

2. System displays each trip with

departure and route details. 

3. Driver selects a trip to view more

information. 

Alternative Flow

AF-01: No Assigned Trips → System

displays “No trips found for today”. 

Table 3.13 Use Case: Start Trip

Name

Start Trip

Identifier

UC-013

Actors

Driver

Description

Driver begins an assigned trip, activating real-time tracking and enabling stop updates. 

Precondition

Trip exists and is assigned to the driver. 

Postcondition

Driver taps the “Start Trip” button. 

Trigger

Admin opens feedback page. 

Normal Flow

1. Driver selects a trip. 

2. Driver starts trip. 

3. System validates driver/bus assignment. 

4. System changes trip status to In Progress. 

5. System includes Real-time Stop

Updates \(UC-014\). 

6. Web Socket Broadcast \(UC-022\) extends

this step, sending real-time updates to

passengers. 

Alternative Flow

AF-01: Trip Not Assigned → System denies

trip start. 

— 19 —

Table 3.14 Use Case: Real-Time Stop Updates Name

Real-Time Stop Updates

Identifier

UC-014

Actors

Driver

Description

Driver updates each stop \(Arrived/Departed\), enabling real-time location tracking for

passengers. 

Precondition

Trip must be in progress. 

Postcondition

Location and stop status are updated. 

Trigger

Driver taps “Arrived” or “Departed” at each stop. 

Normal Flow

1. Driver selects the stop. 

2. Driver updates arrival/departure. 

3. System records timestamp and

GPS location. 

4. Web Socket Broadcast \(UC-022\) sends

update to passengers. 

Table 3.15 Use Case: End Trip

Name

End Trip

Identifier

UC-015

Actors

Driver

Description

Driver completes a trip, allowing the system to finalize logs and stop real-time tracking. 

Precondition

Trip is in progress

Postcondition

Driver taps “End Trip”. 

Trigger

Admin opens feedback page. 

Normal Flow

1. Driver ends trip. 

2. System finalizes timestamps. 

3. Real-Time Stop Updates included. 

3. Web Socket Broadcast extended to notify passengers. 

— 20 —

Alternative Flow

AF-01: Trip Already Completed → System

prevents duplicate ending. 

Table 3.16 Use Case: Incident Reporting

Name

Incident Reporting

Identifier

UC-016

Actors

Driver

Description

Driver reports any incident occurring

during

the trip. 

Precondition

Driver is logged in. 

Postcondition

Incident is recorded. 

Trigger

Driver selects “Report Incident”. 

Normal Flow

1. Driver opens incident form. 

2. Driver enters details. 

3. System stores incident. 

4. Incident Resolution \(UC-009\) is included. 

Alternative Flow

AF-01: Missing Details → Prompt driver to

fill required fields. 

Table 3.17 Delay Reporting

Name

Delay Reporting

Identifier

UC-017

Actors

Driver

Description

Driver reports unexpected delays during a

trip. 

Precondition

Trip is in progress. 

Postcondition

Delay reason logged. 

— 21 —

Trigger

Driver taps “Report Delay”. 

Normal Flow

1. Driver selects delay reason. 

2. System

records

delay. 

Admin dashboard is updated. 

Alternative Flow

AF-01: No Delay Reason Selected → System

prompts selection. 

Table 3.18 Emergency Alert

Name

Emergency Alert

Identifier

UC-018

Actors

Driver

Description

Driver triggers an emergency alert for

severe

incidents. 

Normal Flow

System sends high-priority alert to admin. 

Table 3.19 Search Routes & ETA

Name

Search Routes & ETA

Identifier

UC-019

Actors

Passenger

Description

Passengers search routes and view

estimated

arrival times. 

Table 3.20 Submit Feedback

Name

Submit Feedback

Identifier

UC-020

Actors

Passenger

Description

Passengers submit feedback; included by

admin feedback handling. 

— 22 —

Table 3.21 View Real-Time Bus Location Name

View Real-Time Bus Location

Identifier

UC-021

Actors

Passenger

Description

Passengers view real-time bus location. 

Table 3.22 Web Socket Broadcast

Name

Web Socket Broadcast

Identifier

UC-022

Actors

System

Description

System broadcasts real-time driver updates to all users. 

Table 3.23 Automated Conflict Detection

Name

Automated Conflict Detection

Identifier

UC-023

Actors

System

Description

System automatically detects scheduling, 

routing, and resource conflicts. 

**3.3 Conceptual Modeling**

**3.3.1 Class Diagram**

The class diagram shows the structure of the Public Bus Tracking and Scheduling System by defining the main entities, their properties, relationships, and operations. This diagram guides the database design and helps developers understand how different parts of the system connect and work together. 

— 23 —



— 24 —

Figure 3.2 : Class Diagram for Public Bus Scheduling and Tracking Syste **3.3.2 Class Descriptions**

This section provides detailed descriptions of each class in the system, including attributes, methods, and responsibilities. 

Table 3.24: User Class \(Abstract Base Class\) **User Class**

Aspect

Details

Purpose

Serves as the parent class for all system users, providing common authentication and profile management functionality. 

Name

Data type

Description

userId

String, Primary

Unique identifier for each user

Key

Attributes

username

String, Unique

Login username

passwordHash

String

Encrypted password for security

email

String, Unique

User email address

phoneNumber

String

Contact phone number

role

Enum

User type: ADMIN, DRIVER, 

or PASSENGER

createdAt

DateTime

Account creation timestamp

lastLogin

DateTime

Last successful login time

— 25 —

**User Class**

Name

Parameters

Description

login\(\)

username, 

Authenticates user credentials

password

and returns JWT token

Methods

logout\(\)

None

Invalidates current session

updateProfile\(\)

data

Updates user information

resetPassword\(\)

newPassword

Changes user password with

validation

Relationships

Parent class to Administrator, Driver, and Passenger \(inheritance\) Responsibilities

• User authentication and session management

• Common profile data storage

• Password security handling

Table 3.25: Administrator Class

**Administrator Class**

Aspect

Details

Purpose

Manages system configuration, oversees operations, and monitors performance across all transport services. 

Inherits From

User class \(all User attributes and methods\) Name

Data type

Description

Additional

attributes

department

String

Administrative department

\(Operations, Fleet, Planning\)

accessLevel

Integer

Permission level \(1-3, with 3

being highest\)

Name

Parameters

Description

createBus\(\)

busData

Registers new bus in the system

— 26 —

**Administrator Class**

createRoute\(\)

routeData

Defines new route with stops

Methods

createSchedule\(\)

scheduleData

Assigns bus to route with timing

viewDashboard\(\)

None

Accesses real-time system

statistics

generateReport\(\)

type, dateRange

Creates operational reports

reviewFeedback\(\)

None

Views and categorizes passenger

feedback

manageIncidents\(\)

None

Monitors and resolves reported

incidents

Relationships

• Creates multiple Buses \(1:N\)

• Creates multiple Routes \(1:N\)

• Creates multiple Schedules \(1:N\)

• Reviews multiple Feedback entries \(1:N\)

• Manages multiple Incidents \(1:N\)

Responsibilities • Fleet and route configuration

• Schedule creation and conflict resolution

• System monitoring and reporting

• Incident management and feedback review

Table 3.26: Driver Class

**Driver Class**

Aspect

Details

Purpose

Operates buses, updates trip progress, and reports operational issues during service delivery. 

Inherits From

User class \(all User attributes and methods\) Name

Data type

Description

Additional

attributes

licenseNumber

String, Unique

Driver's license identifier

— 27 —

**Driver Class**

licenseExpiry

Date

License validity end date

assignedBusId

String, Foreign

Currently assigned bus

Key

status

Enum

ON\_DUTY, OFF\_DUTY, or

ON\_BREAK

Name

Parameters

Description

viewSchedule\(\)

None

Retrieves assigned routes and

timing

Methods

startTrip\(\)

scheduleId

Initiates trip recording

updateCurrentStop\(\)

stopId

Updates location progress

completeTrip\(\)

scheduleId

Marks trip as finished

reportIncident

incidentData

Submits incident report

viewRouteMap\(\)

routeId

Displays route visualization

Relationships

• Assigned to one Bus \(1:1\)

• Has multiple Schedules over time \(1:N\)

• Reports multiple Incidents \(1:N\)

• Executes multiple Trips \(1:N\)

Responsibilities • Following assigned routes and schedules

• Real-time trip status updates

• Incident reporting and communication

• Passenger safety and service delivery

Table 3.27: Passenger Class

— 28 —

**Passenger Class**

Aspect

Details

Purpose

Accesses route information, views schedules, and provides feedback about service quality. 

Inherits From

User class \(all User attributes and methods\) Name

Data type

Description

Additional

attributes

preferredRoutes

Array of Strings

Saved favorite routes for quick

access

Name

Parameters

Description

searchRoutes\(\)

origin, destination Finds available routes between locations

Methods

viewSchedule\(\)

routeId

Checks bus timing for specific

route

viewRouteMap\(\)

routeId

Displays static route visualization

submitFeedback\(\)

feedbackData

Reports issues or suggestions

saveRoute\(\)

routeId

Adds route to favorites list

Relationships

• Submits multiple Feedback entries \(1:N\)

Responsibilities • Accessing travel information

• Planning journeys using route data

• Providing service feedback for improvements Table 3.28: Bus Class

**Bus Class**

Aspect

Details

Purpose

Represents physical vehicles in the transport fleet with operational and maintenance details. 

— 29 —

**Bus Class**

Name

Data type

Description

busId

String, Primary

Unique bus identifier

Key

Attributes

plateNumber

String, Unique

Vehicle registration number

capacity

Integer

Maximum passenger count

manufacturer

String

Vehicle make and model

yearOfManufacture

Integer

Production year

operator

Enum

ANBESSA, SHEGER, or

VELOCITY

status

Enum

ACTIVE, 

UNDER\_MAINTENANCE, or

RETIRED

lastMaintenanceDate

Date

Most recent service date

currentDriverId

String, Foreign

Assigned driver

Key

Name

Parameters

Description

updateStatus\(\)

newStatus

Changes operational status

Methods

assignDriver\(\)

driverId

Links bus to driver

recordMaintenance\(\)

maintenanceData Logs service activities

checkAvailability\(\)

date,time

Verifies if bus is free for scheduling

Relationships

• Assigned to one Driver at a time \(1:1\)

• Used in multiple Schedules \(1:N\)

— 30 —

**Bus Class**

• Involved in multiple Incidents \(1:N\)

• Created by one Administrator \(N:1\)

Responsibilities • Fleet inventory management

• Maintenance tracking and scheduling

• Driver assignment coordination

• Operational status monitoring

Table 3.29: Route Class

**Route Class**

Aspect

Details

Purpose

Defines bus paths through the city with all stopping points, timing, and distance information. 

Name

Data type

Description

routeId

String, Primary Key Unique route identifier Attributes

routeName

String

Descriptive route name

startTerminalId

String, Foreign Key Origin terminal

endTerminalId

String, Foreign Key Destination terminal

estimatedDuration

Integer

Expected travel time in minutes

totalDistance

Float

Route length in kilometers

isActive

Boolean

Whether route is currently

operational

createdBy

Date

Most recent service date

— 31 —

**Route Class**

Name

Parameters

Description

addStop\(\)

stopId, sequence, 

Adds intermediate stop to route

estimatedTime

Methods

removeStop\(\)

stopId

Removes stop from route

calculateDuration\(\)

None

Computes total estimated travel

time

getStopSequence\(\)

None

Returns ordered list of all stops

toggleStatus\(\)

date,time

Activates or deactivates route

Relationships

• Contains multiple RouteStops \(1:N composition\)

• Starts at one Terminal \(N:1\)

• Ends at one Terminal \(N:1\)

• Has multiple Schedules \(1:N\)

• Referenced in multiple Feedback entries \(1:N\)

• Created by one Administrator \(N:1\)

Responsibilities • Route definition and structure

• Stop sequence management

• Distance and duration calculation

• Route activation/deactivation control

Table 3.30: RouteStop Class

**RouteStop Class**

Aspect

Details

Purpose

Links routes to physical bus stops with sequence and timing information for ordered navigation. 

Name

Data type

Description

routeStopId

String, Primary Key

Unique identifier

Attributes

routeId

String, Foreign Key

Associated route

— 32 —

**RouteStop Class**

stopId

String, Foreign Key

Physical bus stop

stopSequence

Integer

Order in route \(1, 2, 3. .\)

estimatedTimeFromStart Integer

Minutes from route start

isSkippable

Boolean

Whether stop can be bypassed

during delays

Name

Parameters

Description

getNextStop\(\)

None

Returns following stop in

sequence

Methods

getPreviousStop\(\)

None

Returns preceding stop in

sequence

updateTiming\(\)

newTime

Adjusts estimated arrival time

Relationships

• Belongs to one Route \(N:1\)

• References one BusStop \(N:1\)

Responsibilities • Maintaining stop order along routes

• Timing calculations for each stop

• Route navigation support

• Stop sequence integrity

Table 3.31: BusStop Class

**BusStop Class**

Aspect

Details

Purpose

Represents physical bus stop locations throughout the city with amenity and geographic information. 

Name

Data type

Description

stopId

String, Primary Key

Unique stop identifier

— 33 —

**BusStop Class**

Attributes

stopName

String

Display name of stop

latitude

Float

Geographic coordinate

longitude

Float

Geographic coordinate

hasShelter

Boolean

Whether stop has covered

waiting area

hasSeating

Boolean

Whether benches are available

address

String

Street address or landmark

description

Name

Parameters

Description

getNearbyStops\(\)

radius

Finds stops within specified

distance

Methods

getRoutesServing\(\)

None

Lists all routes that stop here

updateLocation\(\)

lat, long

Modifies coordinates

Relationships

• Used in multiple RouteStops \(1:N\)

• Referenced as current location in Trips \(1:N\) Responsibilities • Stop location management

• Amenity information tracking

• Geographic search support

• Stop identification and naming

Table 3.32: Terminal Class

**Terminal Class**

Aspect

Details

Purpose

Represents major bus stations where routes originate and terminate, with capacity and facility information. 

— 34 —

**Terminal Class**

Name

Data type

Description

terminalId

String, Primary Key

Unique terminal identifier

Attributes

terminalName

String

Official terminal name

address

String

Full street address

latitude

Float

Geographic coordinate

longitude

Float

Geographic coordinate

capacity

Integer

Number of bus parking bays

hasTicketOffice

Boolean

Whether ticket counter is

present

operatingHours

String

Service hours \(e.g., "05:00-

22:00"\)

Name

Parameters

Description

getActiveRoutes\(\)

None

Lists routes currently operating

from terminal

Methods

checkCapacity\(\)

None

Returns available parking

spaces

getBusesPresent\(\)

None

Shows buses currently at

terminal

Relationships

• Serves as start point for multiple Routes \(1:N\)

• Serves as end point for multiple Routes \(1:N\) Responsibilities • Terminal facility management

• Capacity monitoring and allocation

• Route coordination point

• Operating hours enforcement

— 35 —

Table 3.33: Schedule Class **Schedule Class**

Aspect

Details

Purpose

Links buses to routes for specific time periods and tracks assignment details to prevent conflicts. 

Name

Data type

Description

scheduleId

String, Primary Key

Unique schedule identifier

Attributes

busId

String, Foreign Key

Assigned bus

routeId

String, Foreign Key

Assigned route

driverId

String, Foreign Key

Assigned driver

scheduledDepartureTim DateTime

Planned start time

e

scheduledArrivalTime

DateTime

Planned end time

status

Enum

SCHEDULED, IN\_PROGRESS, 

COMPLETED, or CANCELLED

createdBy

String, Foreign Key

Administrator who created

schedule

createdAt

DateTime

Schedule creation timestamp

Name

Parameters

Description

checkConflict\(\)

busId, timeRange

Detects scheduling conflicts

Methods

assignDriver\(\)

driverId

Links driver to schedule

cancelSchedule\(\)

reason

Marks schedule as cancelled

— 36 —

**Schedule Class**

updateStatus\(\)

newStatus

Changes schedule status

getEstimatedCompletion None

Calculates expected arrival time

\(\)

Relationships

• Assigns one Bus \(N:1\)

• Assigns one Route \(N:1\)

• Assigns one Driver \(N:1\)

• Has one Trip \(1:1\)

• Created by one Administrator \(N:1\)

Responsibilities • Bus-route-driver coordination

• Time slot management

• Conflict detection and prevention

• Schedule status tracking and updates

Table 3.34: Trip Class

**Trip Class**

Aspect

Details

Purpose

Records actual execution of scheduled bus journeys with real-time updates and performance tracking. 

Name

Data type

Description

tripId

String, Primary Key

Unique trip identifier

Attributes

scheduleId

String, Foreign Key

Associated schedule

actualDepartureTime

DateTime

Actual start time

actualArrivalTime

DateTime

Actual completion time

currentStopId

String, Foreign Key

Current location along route

— 37 —

**Trip Class**

distanceCovered

Float

Kilometers traveled so far

delayMinutes

Integer

Difference from scheduled timing

status

Enum

NOT\_STARTED, 

IN\_PROGRESS, or

COMPLETED

Name

Parameters

Description

startTrip\(\)

None

Records departure and sets status

to IN\_PROGRESS

Methods

updateLocation\(\)

stopId

Updates current position

completeTrip\(\)

None

Records arrival time and

calculates delay

calculateDelay\(\)

None

Computes difference from

schedule

getProgress

None

Returns percentage completion

getEstimatedArrival\(\)

None

Predicts completion time based

on current position

Relationships

• Belongs to one Schedule \(N:1\)

• References current BusStop \(N:1\)

• May have associated Incidents \(1:N\)

Responsibilities • Real-time trip tracking

• Location updates and progress monitoring

• Delay calculation and reporting

• Historical trip data collection for analytics Table 3.35: Incident Class

**Incident Class**

Aspect

Details

Purpose

Captures and manages operational problems reported by drivers during service with

— 38 —

**Incident Class**

priority handling. 

Name

Data type

Description

incidentId

String, Primary Key

Unique incident identifier

Attributes

reportedBy

String, Foreign Key

Driver who reported incident

busId

String, Foreign Key

Affected bus

tripId

String, Foreign Key

Associated trip \(if applicable\)

incidentType

Enum

BREAKDOWN, ACCIDENT, 

TRAFFIC\_DELAY, or

ROUTE\_BLOCKAGE

severity

Enum

LOW, MEDIUM, or HIGH

location

String

Incident location description

description

String

Detailed incident report

reportedAt

DateTime

Timestamp of report

status

Enum

REPORTED, IN\_PROGRESS, or

RESOLVED

resolvedAt

DateTime

Resolution timestamp

resolvedBy

String, Foreign Key

Administrator who resolved

incident

Name

Parameters

Description

updateStatus\(\)

newStatus

Changes incident status

— 39 —

**Incident Class**

assignPriority\(\)

None

Determines urgency based on

Methods

type and severity

notifyAdministrators\(\)

None

Sends alerts to relevant staff

logResolution\(\)

notes

Records resolution details

calculateResponseTime\(\) None

Measures time from report to

resolution

Relationships

• Reported by one Driver \(N:1\)

• Involves one Bus \(N:1\)

• May relate to one Trip \(N:1\)

• Resolved by one Administrator \(N:1\)

Responsibilities • Incident documentation and tracking

• Priority assignment and routing

• Administrator notification and alerting

• Resolution monitoring and response time tracking

— 40 —

Table 3.36: Feedback Class Aspect

Details

Purpose

Collects and organizes passenger input about service quality for continuous improvement analysis. 

Name

Data type

Description

feedbackId

String, Primary Key

Unique feedback identifier

Attributes

submittedBy

String, Foreign Key

Passenger who submitted

feedback

category

Enum

DELAY, OVERCROWDING, 

SAFETY\_ISSUE, 

DRIVER\_BEHAVIOR, or

GENERAL

routeId

String, Foreign Key

Related route \(if applicable\)

busId

String, Foreign Key

Related bus \(if applicable\)

description

String

Feedback text

rating

Integer

Service rating \(1-5, optional\)

submittedAt

DateTime

Submission timestamp

status

Enum

UNREAD, UNDER\_REVIEW, 

or ADDRESSED

status

Enum

REPORTED, IN\_PROGRESS, or

RESOLVED

reviewedBy

String, Foreign Key

Administrator who reviewed

feedback

Name

Parameters

Description

— 41 —

categorize\(\)

None

Automatically assigns category

based on keywords

flagUrgent\(\)

None

Marks safety-related feedback for

Methods

immediate review

updateStatus\(\)

newStatus

Changes review status

generateSummary\(\)

dateRange

Creates feedback analytics report

getTrends\(\)

None

Identifies common complaint

patterns

Relationships

• Submitted by one Passenger \(N:1\)

• May reference one Route \(N:1\)

• May reference one Bus \(N:1\)

• Reviewed by one Administrator \(N:1\)

Responsibilities • Passenger feedback collection

• Categorization and prioritization

• Trend analysis and reporting

• Service improvement insights generation

— 42 —





**3.4. Sequence diagramming**

Figure 3.3 . Sequence Diagram: Admin Login

— 43 —



Figure 3.4 . Sequence Diagram: bus registration

— 44 —



Figure 3.5 . Sequence Diagram: driver registration

— 45 —



Figure 3.6 . Sequence Diagram: route creation

— 46 —



Figure 3.7 . Sequence Diagram: route modification

— 47 —





Figure 3.8 . Sequence Diagram: schedule creation

— 48 —



Figure 3.9 . Sequence Diagram: schedule update Figure 3.10 . Sequence Diagram: feedback management

— 49 —



Figure 3.11 . Sequence Diagram: Incident resoultion

— 50 —





Figure 3.12. Sequence Diagram: analytic report generation Figure 3.13 . Sequence Diagram: performance monitoring

— 51 —



Figure 3.14 . Sequence Diagram: driver authentication

— 52 —





Figure 3.15 . Sequence Diagram: view daily schedule Figure 3.16. Sequence Diagram: start trip

— 53 —



Figure 3.17 . Sequence Diagram: update stop

— 54 —





Figure 3.18 . Sequence Diagram: end trip

Figure 3.19 . Sequence Diagram:incident report

— 55 —





Figure 3.20 . Sequence Diagram: emergency alert

— 56 —





Figure 3.21 . Sequence Diagram: search and view arrival route Figure 3.22 . Sequence Diagram: submit feedback Figure 3.23 . Sequence Diagram: track bus

— 57 —



Figure 3.24 . Sequence Diagram: broadcast update

— 58 —



Figure 3.25 . Sequence Diagram: conflict detection

— 59 —



**3.5. User Interface Prototyping**

User interface prototyping, as described by Scott Ambler, involves creating a preliminary version of an application's interface to test its design and functionality \(Ambler, 2012\). This process aims to ensure a user-friendly, efficient, and aesthetically pleasing interface that meets user needs. It allows for early issue identification, user feedback, and iterative design improvements, before full implementation. 

This section presents the visual layout and design of the system through the UI prototype images illustrated below. 

Figure 3.26 . Home page- for passenger

— 60 —



Figure 3.27 . feedback page - for passenger

— 61 —



Figure 3.28 . Interactive map - for passenger

— 62 —



Figure 3.29 . Bus tracking page - for passenger

— 63 —



Figure 3.30. Driver Login - for driver

— 64 —



Figure 3.31 . Driver dashboard - for driver

— 65 —



— 66 —



Figure 3.32. Incident report page - for driver Figure 3.33 . admin login - for admin

— 67 —



Figure 3.34 . admin dashboard - for admin

— 68 —



Figure 3.35 . bus management - for admin

— 69 —



Figure 3.36 . driver management - for admin

— 70 —


# Document Outline

+ Chapter 3: Object Oriented Analysis 
+ 3.1 Overview 
+ 3.2 Use Case Modeling  
	+ 3.2.1 UI Identification 
	+ 3.2.2 Business Rules Identification 
	+ 3.2.3 Actor Identification 
	+ 3.2.4 Designing the Use Case Diagram 
	+ 3.2.5 Use Case Description 

+ 3.3 Conceptual Modeling  
	+ 3.3.1 Class Diagram 
	+ 3.3.2 Class Descriptions 
	+  User Class 
	+  Administrator Class 
	+  Driver Class 
	+  Passenger Class 
	+  Bus Class 
	+  Route Cla 
	+  RouteStop 
	+  BusStop C 
	+  Terminal  
	+  Schedule  
	+  Trip Clas 
	+  Incident  

+ 3.4. Sequence diagramming 
+ 3.5. User Interface Prototyping



