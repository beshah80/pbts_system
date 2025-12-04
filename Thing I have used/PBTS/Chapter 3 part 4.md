Conceptual Modeling Class Diagram 

The class diagram shows the structure of the Public Bus Tracking and Scheduling System by defining the main entities, their properties, relationships, and operations. This diagram guides the database design and helps developers understand how different parts of the system connect and work together. 





Class Descriptions This section provides detailed descriptions of each class in the system, including attributes, methods, and responsibilities. 

**Table 3.1: User Class \(Abstract Base Class\)** User Class 

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

updateProfile\(\) data 

Updates user information 



User Class resetPassword\(\) newPassword Changes user password with validation 

Relationships 

Parent class to Administrator, Driver, and Passenger \(inheritance\) Responsibilities 

• User authentication and session management 

• Common profile data storage 

• Password security handling 



**Table 3.2: Administrator Class** Administrator Class 

Aspect 

Details 

Purpose 

Manages system configuration, oversees operations, and monitors performance across all transport services. 

Inherits From 

User class \(all User attributes and methods\) Name 

Data type 

Description 



Additional 

department 

String 

Administrative department 

attributes 

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





createRoute\(\) 

routeData 

Defines new route with stops 

Methods 

createSchedule\(\) scheduleData Assigns bus to route with timing viewDashboard\(\) 

None 

Accesses real-time system 

statistics 

generateReport\(\) type, 

Creates operational reports 

dateRange 



Administrator Class reviewFeedback\(\) None 

Views and categorizes passenger 

feedback 

manageIncidents\(\) None 

Monitors and resolves reported 

incidents 

Relationships 

• Creates multiple Buses \(1:N\) 

• Creates multiple Routes \(1:N\) 

• Creates multiple Schedules \(1:N\) 

• Reviews multiple Feedback entries \(1:N\) 

• Manages multiple Incidents \(1:N\) Responsibilities • Fleet and route configuration 

• Schedule creation and conflict resolution 

• System monitoring and reporting 

• Incident management and feedback review **Table 3.3: Driver Class **

Driver Class 

Aspect 

Details 

Purpose 

Operates buses, updates trip progress, and reports operational issues during service delivery. 

Inherits From 

User class \(all User attributes and methods\) Name 

Data type 

Description 



Additional 

licenseNumber 

String, Unique 

Driver's license identifier 

attributes 

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



Driver Class viewSchedule\(\) 

None 

Retrieves assigned routes and 



timing 





startTrip\(\) 

scheduleId 

Initiates trip recording 

Methods 

updateCurrentStop stopId 

Updates location progress 

\(\) 

completeTrip\(\) 

scheduleId 

Marks trip as finished 

reportIncident 

incidentData Submits incident report viewRouteMap\(\) 

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

• Passenger safety and service delivery **Table 3.4: Passenger Class **

Passenger Class 

Aspect 

Details 

Purpose 

Accesses route information, views schedules, and provides feedback about service quality. 

Inherits From 

User class \(all User attributes and methods\) Name 

Data type 

Description 

Additional 



Passenger Class attributes 

preferredRoutes 

Array of Strings 

Saved favorite routes for quick 

access 



Name 

Parameters 

Description 





searchRoutes\(\) 

origin, 

Finds available routes between 



destination locations 



Methods 

viewSchedule\(\) 

routeId 

Checks bus timing for specific 

route 

viewRouteMap\(\) 

routeId 

Displays static route visualization submitFeedback\(\) feedbackData Reports issues or suggestions saveRoute\(\) 

routeId 

Adds route to favorites list 

Relationships 

• Submits multiple Feedback entries \(1:N\) Responsibilities • Accessing travel information 

• Planning journeys using route data 

• Providing service feedback for improvements **Table 3.5: Bus Class **

Bus Class 

Aspect 

Details 

Purpose 

Represents physical vehicles in the transport fleet with operational and maintenance details. 



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



Bus Class manufacturer 

String 

Vehicle make and model 

yearOfManufactur Integer 

Production year 

e 

operator 

Enum 

ANBESSA, SHEGER, or 

VELOCITY 

status 

Enum 

ACTIVE, 

UNDER\_MAINTENANCE, or 

RETIRED 

lastMaintenanceD Date 

Most recent service date 

ate 

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





assignDriver\(\) 

driverId 

Links bus to driver 

Methods 

recordMaintenanc maintenance Logs service activities e\(\) 

Data 

checkAvailabilit date,time 

Verifies if bus is free for scheduling y\(\) 

Relationships 

• Assigned to one Driver at a time \(1:1\) 

• Used in multiple Schedules \(1:N\) 

• Involved in multiple Incidents \(1:N\) 

• Created by one Administrator \(N:1\) Responsibilities • Fleet inventory management 

• Maintenance tracking and scheduling 

• Driver assignment coordination 

• Operational status monitoring 



**Table 3.6: Route Class **



Route Class Aspect 

Details 

Purpose 

Defines bus paths through the city with all stopping points, timing, and distance information. 



Name 

Data type 

Description 





routeId 

String, Primary Key Unique route identifier routeName 

String 

Descriptive route name 

Attributes 

startTerminalId 

String, Foreign Key Origin terminal endTerminalId 

String, Foreign Key Destination terminal estimatedDuration Integer 

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



Name 

Parameters 

Description 





addStop\(\) 

stopId, 

Adds intermediate stop to route 



sequence, 



estimatedTime 

Methods 

removeStop\(\) 

stopId 

Removes stop from route 

calculateDuration None 

Computes total estimated travel 

\(\) 

time 

getStopSequence\(\) None 

Returns ordered list of all stops toggleStatus\(\) 

date,time 

Activates or deactivates route 

Relationships 

• Contains multiple RouteStops \(1:N composition\) 

• Starts at one Terminal \(N:1\) 



Route Class 

• Ends at one Terminal \(N:1\) 

• Has multiple Schedules \(1:N\) 

• Referenced in multiple Feedback entries \(1:N\) 

• Created by one Administrator \(N:1\) Responsibilities • Route definition and structure 

• Stop sequence management 

• Distance and duration calculation 

• Route activation/deactivation control **Table 3.7: RouteStop Class **

RouteStop Class 

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

stopId 

String, Foreign Key 

Physical bus stop 

stopSequence 

Integer 

Order in route \(1, 2, 3...\) 

estimatedTimeFro Integer 

Minutes from route start 

mStart 

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



RouteStop Class getPreviousStop\( None 

Returns preceding stop in 

Methods 

\) 

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



**Table 3.8: BusStop Class **

BusStop Class 

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



BusStop Class Name 

Parameters 

Description 





getNearbyStops\(\) radius 

Finds stops within specified 



distance 



Methods 

getRoutesServing None 

Lists all routes that stop here 

\(\) 

updateLocation\(\) lat, long 

Modifies coordinates 

Relationships 

• Used in multiple RouteStops \(1:N\) 

• Referenced as current location in Trips \(1:N\) Responsibilities • Stop location management 

• Amenity information tracking 

• Geographic search support 

• Stop identification and naming 



**Table 3.9: Terminal Class **

Terminal Class 

Aspect 

Details 

Purpose 

Represents major bus stations where routes originate and terminate, with capacity and facility information. 



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



Terminal Class capacity 

Integer 

Number of bus parking bays 

hasTicketOffice Boolean 

Whether ticket counter is 

present 

operatingHours 

String 

Service hours \(e.g., 

"05:00-22:00"\) 



Name 

Parameters 

Description 





getActiveRoutes\( None 

Lists routes currently operating 



\) 

from terminal 



Methods 

checkCapacity\(\) None 

Returns available parking 

spaces 

getBusesPresent\( None 

Shows buses currently at 

\) 

terminal 

Relationships 

• Serves as start point for multiple Routes \(1:N\) 

• Serves as end point for multiple Routes \(1:N\) Responsibilities • Terminal facility management 

• Capacity monitoring and allocation 

• Route coordination point 

• Operating hours enforcement 





**Table 3.10: Schedule Class **

Schedule Class 

Aspect 

Details 

Purpose 

Links buses to routes for specific time periods and tracks assignment details to prevent conflicts. 



Name 

Data type 

Description 





Schedule Class scheduleId 

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

scheduledDepartu DateTime 

Planned start time 

reTime 

scheduledArrival DateTime 

Planned end time 

Time 

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





checkConflict\(\) busId, 

Detects scheduling conflicts 



timeRange 



Methods 

assignDriver\(\) 

driverId 

Links driver to schedule 

cancelSchedule\(\) reason 

Marks schedule as cancelled 

updateStatus\(\) 

newStatus 

Changes schedule status 

getEstimatedComp None 

Calculates expected arrival time 

letion\(\) 

Relationships 

• Assigns one Bus \(N:1\) 

• Assigns one Route \(N:1\) 

• Assigns one Driver \(N:1\) 

• Has one Trip \(1:1\) 



Schedule Class 

• Created by one Administrator \(N:1\) Responsibilities • Bus-route-driver coordination 

• Time slot management 

• Conflict detection and prevention 

• Schedule status tracking and updates **Table 3.11: Trip Class **

Trip Class 

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

actualDepartureTi DateTime 

Actual start time 

me 

actualArrivalTime DateTime 

Actual completion time 

currentStopId 

String, Foreign Key 

Current location along route 

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



Trip Class startTrip\(\) 

None 

Records departure and sets status to IN\_PROGRESS 





updateLocation\(\) stopId 

Updates current position 

Methods 

completeTrip\(\) 

None 

Records arrival time and 

calculates delay 

calculateDelay\(\) None 

Computes difference from 

schedule 

getProgress 

None 

Returns percentage completion 

getEstimatedArriv None 

Predicts completion time based 

al\(\) 

on current position 

Relationships 

• Belongs to one Schedule \(N:1\) 

• References current BusStop \(N:1\) 

• May have associated Incidents \(1:N\) Responsibilities • Real-time trip tracking 

• Location updates and progress monitoring 

• Delay calculation and reporting 

• Historical trip data collection for analytics **Table 3.12: Incident Class **

Incident Class 

Aspect 

Details 

Purpose 

Captures and manages operational problems reported by drivers during service with priority handling. 



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



Incident Class busId 

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





assignPriority\(\) None 

Determines urgency based on 

Methods 

type and severity 

notifyAdministrat None 

Sends alerts to relevant staff 

ors\(\) 

logResolution\(\) 

notes 

Records resolution details 

calculateResponse None 

Measures time from report to 

Time\(\) 

resolution 

Relationships 

• Reported by one Driver \(N:1\) 

• Involves one Bus \(N:1\) 



Incident Class 

• May relate to one Trip \(N:1\) 

• Resolved by one Administrator \(N:1\) Responsibilities • Incident documentation and tracking 

• Priority assignment and routing 

• Administrator notification and alerting 

• Resolution monitoring and response time tracking **Table 3.13: Feedback Class **

Feedback Class 

Aspect 

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



Feedback Class or ADDRESSED 

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





categorize\(\) 

None 

Automatically assigns category 



based on keywords 



Methods 

flagUrgent\(\) 

None 

Marks safety-related feedback for immediate review 

updateStatus\(\) 

newStatus 

Changes review status 

generateSummary\(\) dateRange 

Creates feedback analytics report getTrends\(\) 

None 

Identifies common complaint 

patterns 

Relationships 

• Submitted by one Passenger \(N:1\) 

• May reference one Route \(N:1\) 

• May reference one Bus \(N:1\) 

• Reviewed by one Administrator \(N:1\) Responsibilities • Passenger feedback collection 

• Categorization and prioritization 

• Trend analysis and reporting 

• Service improvement insights generation 





# Document Outline

+ Conceptual Modeling   
	+ Class Diagram  
	+ Class Descriptions  
	+  User Class  
	+  Administrator Class  
	+  Driver Class  
	+  Passenger Class  
	+  Bus Class  
	+  Route Class  
	+  RouteStop Class  
	+  BusStop Class  
	+  Terminal Class  
	+  Schedule Class  
	+  Trip Class  
	+  Incident Class  
	+  Feedback Class



