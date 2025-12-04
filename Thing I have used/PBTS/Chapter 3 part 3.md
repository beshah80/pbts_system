**Actor Identification** Actors are external entities such as users, operational staff, and automated system components that interact with the Public Bus Scheduling and Tracking System to accomplish various transportation-related tasks. Identifying these actors is a crucial part of system analysis because it establishes the boundaries of the system, highlights who depends on the system’s services, and clarifies how each actor contributes to the overall operation of the bus network. 

In the context of a bus scheduling and real-time tracking environment, the system supports multiple categories of actors, each with unique goals and responsibilities. Administrators are responsible for managing operational data such as buses, drivers, routes, and schedules; drivers rely on the system to perform live trip updates and incident reporting; passengers use the system to access route information and track buses in real time; and internal automated services ensure continuous communication and conflict detection. 

By identifying and understanding these different actors, the system can be designed to meet operational requirements, improve transportation efficiency, and provide a seamless experience for all users. 

Table: Actors of the System 

Actor 

Instruction 

Interaction with the System 

Admin 

System administrator 

Manages bus and driver 

responsible for managing 

records, creates and updates fleet data, drivers, routes, routes and schedules, resolves schedules, and monitoring 

incidents, responds to 

operational performance. 

feedback, and generates 

performance and analytics 

reports. 

Driver 

Authorized bus operator 

Logs into the driver 

responsible for carrying out dashboard, views assigned 

scheduled trips and reporting schedules, starts and ends 

operational statuses during 

trips, sends real-time stop 

transit. 

updates, reports 

delays/incidents, and triggers emergency alerts. 

Passenger 

Public transport user 

Searches routes and ETAs, 

searching for route 

views real-time bus locations, information, tracking bus 

and submits feedback about 

movements, and submitting 

services. 

feedback. 

System Services \(Internal 

Automated background 

Broadcasts Web Socket real-

Actor\) 

services responsible for 

time updates to passengers 

managing real-time 

and admins, performs 

communication and 

automated conflict detection validating scheduling 

during route/schedule 

constraints. 

creation, and ensures data 

consistency across modules. 



**Designing the Use Case Diagram** A use case represents a specific interaction between an actor and the system that enables the achievement of a meaningful goal. In the context of the Public Bus Scheduling and Tracking System, use cases help describe how different users such as administrators, drivers, and passengers interact with the system to perform essential transportation-related tasks. These interactions include activities like managing bus schedules, reporting incidents, tracking bus locations, and accessing route information. 

Use case diagrams serve as an effective method for capturing and communicating the functional requirements of the system. They provide a visual overview of how external entities depend on the system’s capabilities and how the system must respond to achieve operational goals. By designing a comprehensive use case diagram for the Public Bus Scheduling and Tracking System, we can clearly define system boundaries, identify all key actors, and document the required functionalities in a structured and easily understandable form. 





Figure: Use Case Diagram for Public Bus Scheduling and Tracking System **Use Case Description **

Table 3.1 Use Case: System Login Name 

System login 

Identifier 

UC-001 

Actors 

Admin, Driver, Passenger 

Description 

This use case allows all system users administrators, drivers, and passengers to securely authenticate and access their respective system dashboards. Each actor logs in to access features that correspond to their role within the Public Bus Scheduling and Tracking System. 

Precondition 

1. User has a registered account in the system. 

2. The system is online and accessible. 

Postcondition 

1. User is successfully authenticated. 

2. The system redirects the user to their role-based dashboard \(Admin Dashboard, Driver Dashboard, or Passenger Dashboard\). 

Trigger 

User enters their username/ID and password in the login form. 

Normal Flow 

1. User navigates to the login page. 

2. User enters credentials \(username/ID and password\). 

3. System validates the input format. 

4. System checks user information in the authentication database. 

5. If valid, system identifies the user’s role \(Admin, Driver, Passenger\). 

6. System loads the appropriate dashboard based on role. 

7. User gains access to system services. 

Alternative Flow 

**AF-01**: Invalid Credentials – System displays an error message and prompts the user to re-enter correct login information. 

**AF-02**: Incorrect Role Credentials – User attempts to access a restricted dashboard → 

System denies access and redirects to role-appropriate dashboard. 

**AF-03**: Account Locked – After multiple failed attempts, account is locked → User must contact admin/support. 

**AF-04**: Missing Fields – System detects empty username or password field → 

Prompts user to fill in required fields. 

**AF-05**: Network/Server Error – System cannot connect to authentication service → 

Displays temporary access error message. 



Table 3.2 Use Case: Bus Registration Name 

Bus Registration 

Identifier 

UC-002 

Actors 

Admin 

Description 

Admin registers new buses into the fleet system 

Precondition 

Admin is logged in. 

Postcondition 

Bus details saved and available for scheduling. 

Trigger 

Admin selects “Register Bus”. 

Normal Flow 

1. Admin opens the bus registration form. 

2. Admin enters all required fields \(plate number, capacity, model, etc.\). 

3. System validates inputs. 

4. System checks for duplicate plate number. 

5. System saves the bus to the database. 

6. System displays success message. 

Alternative Flow AF-01: Missing Required Fields → System requests admin to complete missing information. 

AF-02: Duplicate Bus Plate → System warns and prevents registration. 

AF-03: Validation Error → System highlights incorrect fields. 



Table 3.3 Use Case: Driver Management Name 

Driver Management 

Identifier 

UC-003 

Actors 

Admin 

Description 

Admin adds, updates, or removes drivers from the system. 

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

4. System validates license number and inputs. 

5. System saves driver data. 

6. System confirms success. 

Alternative Flow 

AF-01: Invalid License Number → System rejects entry. 

AF-02: Driver Already Exists → System prompts update instead. 



Table 3.4 Use Case: Route Creation 

Name 

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

2. Admin enters route number, stops, direction, and map details. 

3. System validates stops and route format. 

4. System checks for conflicts \(extend: UC-023\). 

5. System saves route. 

6. System confirms creation. 

Alternative Flow 

AF-01: Conflict Detected → System suggests correction. 

AF-02: Missing Stop Locations → Admin must complete data. 



Table 3.5 Use Case: Route Modification Name 

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

Normal Flow 

1. Admin selects route to edit. 

2. Admin modifies stops or direction. 

3. System validates updates. 

4. Conflict Detection runs \(extend\). 

5. System saves modifications. 

Alternative Flow 

AF-01: Invalid Route Data → System prevents saving. 

AF-02: Conflict Found → Admin must resolve issues. 



Table 3.6 Use Case: Schedule Creation Name 

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

AF-01: Driver/Bus Overlap → System alerts admin. 

AF-02: Invalid Times → System asks correction. 



Table 3.7 Use Case: Schedule Modification 

Name 

Schedule Modification 

Identifier 

UC-007 

Actors 

Admin 

Description 

Modify existing bus schedule. 

Precondition 

Schedule exists. 

Postcondition 

Schedule updated. 

Trigger 

Admin selects “Edit Schedule”. 

Normal Flow 

Similar to UC-006 but editing instead of creating. 

Alternative Flow 

Same alternatives as UC-06. 





Table 3.8 Use Case: Feedback Management Name 

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

AF-01: No Feedback → System shows empty list. 





Table 3.9 Use Case: Incident Resolution Name 

Incident Resolution 

Identifier 

UC-009 

Actors 

Admin 

Description 

Admin resolves incidents submitted by drivers. 

Precondition 

Incident report exists. 

Postcondition 

Incident marked resolved. 

Trigger 

Driver submits incident. 

Normal Flow 

1. Admin opens incident list. 

2. Admin reviews details. 

3. Admin resolves incident or requests info. 

4. System saves status. 

Alternative Flow 

AF-01: Insufficient Info → Admin requests details. 





Table 4.1 Use Case: Analytics Reports Name 

Analytics Reports 

Identifier 

UC-010 

Actors 

Admin 

Description 

This use case enables the admin to generate analytical reports based on bus operations, schedules, delays, incidents, feedback, and driver performance. These reports help in monitoring system efficiency and making data-driven decisions. 

Precondition 

1. Admin is logged in. 

2. System contains collected trip data, incident logs, delays, and feedback records. 

Postcondition 

1. Analytics report is generated successfully. 

2. Admin can view, download, or export the report. 

Trigger 

Admin selects "Generate Analytics Report" 

from the dashboard. 

Normal Flow 

1. Admin navigates to the analytics module. 

2. Admin chooses report type \(daily, weekly, monthly, custom\). 

3. Admin selects required parameters \(route, driver, bus, date range, etc.\). 

4. System retrieves relevant operational data. 

5. System analyzes and compiles results into charts, tables, KPIs, and summaries. 

6. System displays the generated report to the admin. 

Alternative Flow 

AF-01: No Data Available → System notifies admin that the selected date range has insufficient data. 

AF-02: Invalid Filter Selection → System prompts admin to correct filters \(e.g., invalid date range\). 

AF-03: Processing Timeout → System fails to process large datasets and suggests narrowing the report scope. 





Table 4.2 Use Case: Performance Monitoring Name 

Performance Monitoring 

Identifier 

UC-011 

Actors 

Admin 

Description 

Allows the admin to monitor real-time and historical operational performance of buses, drivers, and the scheduling system. This includes delays, route efficiency, on-time performance, passenger feedback trends, and incident frequency 

Precondition 1. Admin is authenticated. 

2. System has collected recent operational metrics. 

Postcondition 

Admin views performance indicators displayed in charts, tables, or alerts. 

Trigger 

Admin opens the “Performance Monitoring” 

dashboard. 

Normal Flow 

1. Admin opens the performance dashboard. 

2. System loads KPIs such as average delay time, on-time statistics, incidents per route, passenger satisfaction scores, and driver efficiency. 

3. Admin filters or selects specific metrics. 

4. System updates dashboard visuals based on selected filters. 

Alternative Flow 

AF-01: Real-Time Data Not Available → 

System displays last updated snapshot. 



AF-02: Metric Calculation Error → System notifies admin and hides incomplete KPIs. 





Table 4.3 Use Case: View Daily Schedule Name 

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

Normal Flow 

1. System retrieves the driver’s assigned trips. 

2. System displays each trip with departure and route details. 

3. Driver selects a trip to view more information. 

Alternative Flow 

AF-01: No Assigned Trips → System displays “No trips found for today”. 





Table 4.4 Use Case: Start Trip Name 

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

5. System includes Real-time Stop Updates \(UC-014\). 

6. Web Socket Broadcast \(UC-022\) extends this step, sending real-time updates to passengers. 

Alternative Flow 

AF-01: Trip Not Assigned → System denies trip start. 



Table 4.5 Use Case: Real-Time Stop Updates Name 

Real-Time Stop Updates 

Identifier 

UC-014 

Actors 

Driver 

Description 

Driver updates each stop \(Arrived/Departed\), enabling real-time location tracking for passengers. 

Precondition 

Trip must be in progress. 

Postcondition 

Location and stop status are updated. 

Trigger 

Driver taps “Arrived” or “Departed” at each stop. 

Normal Flow 

1. Driver selects the stop. 

2. Driver updates arrival/departure. 

3. System records timestamp and GPS 

location. 

4. Web Socket Broadcast \(UC-022\) sends update to passengers. 



Table 4.6 Use Case: End Trip Name 

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

4. Web Socket Broadcast extended to notify passengers. 

Alternative Flow 

AF-01: Trip Already Completed → System prevents duplicate ending. 



Table 4.7 Use Case: Incident Reporting Name 

Incident Reporting 

Identifier 

UC-016 

Actors 

Driver 

Description 

Driver reports any incident occurring during the trip. 

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

AF-01: Missing Details → Prompt driver to fill required fields. 



Table 4.8 Delay Reporting 

Name 

Delay Reporting 

Identifier 

UC-017 

Actors 

Driver 

Description 

Driver reports unexpected delays during a trip. 

Precondition Trip is in progress. 

Postcondition 

Delay reason logged. 

Trigger 

Driver taps “Report Delay”. 

Normal Flow 

1. Driver selects delay reason. 

2. System records delay. 

3. Admin dashboard is updated. 

Alternative Flow 

AF-01: No Delay Reason Selected → System prompts selection. 



Table 4.9 Emergency Alert 

Name 

Emergency Alert 

Identifier 

UC-018 

Actors 

Driver 

Description 

Driver triggers an emergency alert for severe incidents. 

Normal Flow 

System sends high-priority alert to admin. 



Table 5.1 Search Routes & ETA Name 

Search Routes & ETA 

Identifier 

UC-019 

Actors 

Passenger 

Description 

Passengers search routes and view estimated arrival times. 



Table 5.2 Submit Feedback 

Name 

Submit Feedback 

Identifier 

UC-020 

Actors 

Passenger 

Description 

Passengers submit feedback; included by admin feedback handling. 



Table 5.3 View Real-Time Bus Location Name 

View Real-Time Bus Location 

Identifier 

UC-021 

Actors 

Passenger 

Description 

Passengers view real-time bus location. 



Table 5.4 Web Socket Broadcast Name 

Web Socket Broadcast 

Identifier 

UC-022 

Actors 

System 

Description 

System broadcasts real-time driver updates to all users. 



Table 5.5 Automated Conflict Detection Name 

Automated Conflict Detection Identifier 

UC-023 

Actors 

System 

Description 

System automatically detects scheduling, routing, and resource conflicts.



