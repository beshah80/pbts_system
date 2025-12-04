**ADDIS ABABA UNIVERSITY COLLEGE OF NATURAL**

**AND COMPUTATIONAL SCIENCES School of**

**Information Science**

Public Bus Tracking and Scheduling System for

Ethiopian Cities

Name

ID

1. Elishaday Bilelign

UGR/4850/15

2. Selamawit Mesfin

UGR/0161/15

3. Beshah Ashenafi

UGR/5569/15

4. Biniyam Moges

UGR/6967/15

5. Frezer Gebeyaw

UGR/7381/15

6. Kenbon Leta

UGR/8977/14

**Content**

2.1 Overview. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3

2.2 Business area analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3

2.2.1 Activities / functions of the organisation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .3

2.2.2 Problems of the current system\(Using the PIECES Framework\) . . . . . . . . . . . . . . 6

2.2.3 Forms and Reports of the Current System. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .9

2.2.4 Players of the Existing System. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13

2.3 Requirements Definition. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17

2.3.1 Functional Requirements. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .17

2.3.2 Non-Functional Requirements. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .18

**Chapter Two: Business Area Analysis and Requirement** **Definition**

**2.1 Overview**

This chapter looks into the current operations of Addis Ababa's public bus transport system and identifies specific requirements for the proposed tracking and scheduling platform. The analysis focuses on understanding how transport authorities, bus operators, drivers, and passengers currently interact within the existing system while documenting the actual workflows, communication patterns, and administrative processes that describe daily operations. 

The chapter begins with a business area analysis that lists out the main activities performed by different stakeholders in the transport network. Then it evaluates the limitations of current practices using the PIECES framework, which provides a structured way to assess performance, information flow, economic efficiency, control mechanisms, operational effectiveness, and service quality issues. Following this, the chapter documents the existing forms, reports, and paper-based tools that administrators and drivers use for record-keeping and communication. 

Lastly, it identifies all essential players in the system and their specific roles, responsibilities, and challenges. 

By analyzing these aspects, this chapter provides a clear understanding of what needs to change and why. This directly informs the functional and non-functional requirements that will guide system design and development in the following chapters. 

**2.2 Business area analysis**

**2.2.1 Activities / functions of the organisation** The public bus ecosystem in Addis Ababa is formed by multiple institutions with distinct but related responsibilities:

**Addis Ababa Road & Transport Bureau — AARTB**

● **Route Planning and Approval: **Determining which routes are needed based on population distribution and traffic patterns, then assigning routes to different operators. 

● **Licensing and Registration: **Processing applications for new bus operators, issuing operating permits, and maintaining records of all licensed vehicles and drivers. 

● **Performance Monitoring: **Conducting periodic inspections at terminals and along routes to verify that operators are following approved schedules and maintaining service standards. 

● **Policy Development: **Creating regulations for fare structures, safety requirements, and service quality benchmarks that all operators must follow. 

● **Data Compilation: **Collecting monthly and quarterly reports from operators about fleet performance, passenger volumes, and operational challenges. 

**Anbessa City Bus Service Enterprise \(ACBSE\)**

As the largest government-owned operator, Anbessa manages a fleet of over 400 buses serving 100\+ routes. Its daily activities include:

● **Fleet Management: **Assigning buses to specific routes each morning based on the bus availability and maintenance schedules. 

● **Driver Scheduling: **Creating shift rotations for drivers, ensuring each route has adequate coverage throughout operating hours. 

● **Maintenance Coordination: **Tracking bus condition, scheduling repairs, and managing spare parts inventory. 

● **Fare Collection: **Recording daily revenue from conductors who manually count tickets sold and cash collected. 

● **Incident Documentation: **Receiving phone calls or written reports from drivers about accidents, breakdowns, or major delays, then logging these events in paper registers. 

● **Terminal Supervision: **Stationing supervisors at major terminals to manage bus departures, handle passenger complaints, and coordinate with drivers. 

**Sheger Mass Transit Enterprise \(SMTE\)**

Launched in 2020, Sheger focuses on high-capacity routes with newer vehicles. Its operations mirror those of Anbessa but on a smaller scale:

● **Route Operations: **Managing assigned routes primarily on major corridors. 

● **Limited Digital Monitoring: **Using a small GPS pilot program on select vehicles, though this data is not shared with other operators or the Bureau. 

● **Performance Reporting: **Submitting weekly summaries to AARTB about service delivery and any operational disruptions. 

**Private Operators \(Velocity Bus \)**

Private operators like Velocity Bus contribute additional capacity, particularly on routes where government fleets cannot meet demand. Their activities include:

● **Independent Scheduling: **Creating their own timetables without formal coordination with government operators. 

● **Basic Fleet Tracking: **Using simple GPS devices primarily for internal security and maintenance purposes rather than passenger information. 

● **Fare Management: **Operating under Bureau-approved fare structures but handling revenue collection independently. 

**Bus Drivers and Conductors**

● Follow assigned schedules and routes

● Handles boarding, manage crowding, and responding to passenger questions about routes and destinations

● **Manual Reporting: **Calling supervisors via personal phones when problems occur, such as mechanical breakdowns or severe traffic delays

● **Cash Handling: **Conductors collect fares and reconcile cash at the end of each shift, submitting totals to supervisors. 

**Passengers and public**

● Passengers are the end users whose daily activities shape affect patterns:

● Relies on personal experience, word-of-mouth information, or informal inquiries at terminals to determine which bus to take. 

● Standing at stops without accurate information about when the next bus will arrive or how many passengers it might already be carrying. 

● Occasionally expressing complaints directly to drivers or supervisors, though there is no formal system for recording or addressing these concerns

**2.2.2 Problems of the current system\(Using the PIECES Framework\)** The PIECES framework provides a structured approach to analyzing system problems across six dimensions: Performance, Information, Economics, Control, Efficiency, and Service. This analysis reveals specific deficiencies in the current public bus transport system. 

**Performance Issues**

The system struggles to deliver reliable and consistent service:

● **Irregular Service Intervals: **Buses on the same route arrive unpredictably, sometimes with gaps of 15 minutes followed by three buses arriving within 5 minutes of each other. 

This bunching occurs because there is no mechanism to monitor spacing between vehicles. 

● **Extended Waiting Times: **Passengers at major terminals like Meskel Square and Mexico Square often wait 30 to 60 minutes during off-peak hours and even longer during peak periods when buses bypass stops due to overcrowding. 

● Posted timetables at terminals frequently do not reflect actual bus availability. When vehicles break down or are reassigned without notice, no updates reach passengers or even terminal supervisors. 

● **Delayed Incident Response: **When a bus breaks down mid-route, it can take 45 minutes or more for a replacement to be dispatched because drivers must first locate a phone signal, call headquarters, and wait for supervisors to manually arrange alternatives. 

**Information Deficiencies**

Critical information gaps affect all stakeholders:

● Passengers have no way to know if their bus is approaching, delayed, or canceled. They depend entirely on visual observation and guesswork. 

● Bus assignments, driver schedules, and maintenance records are kept in separate paper registers or basic spreadsheets that different departments maintain independently. When managers need to analyze patterns or make decisions, they must manually compile information from multiple sources. 

● Route maps and stop lists vary between operators. Even within Anbessa, different terminals may have slightly different versions of the same route due to informal changes that were never officially documented. 

● Without digital records, it is nearly impossible to analyze trends such as which routes experience the most breakdowns, which time periods see highest demand, or how service quality changes over months. 

● Apart from destination signs on bus fronts, passengers receive almost no information about routes, schedules, or service changes. New residents or visitors find the system particularly difficult to navigate. 

**Economic Inefficiencies**

Current practices lead to wasted resources and lost revenue:

● **Fuel Waste from Idle Buses: **Buses often sit idling at terminals for extended periods because schedules are not optimized for actual demand patterns. Some routes are over-served during slow periods while others lack coverage during peak demand. 

● **Inefficient Fleet Utilization: **The practice of assigning fixed numbers of buses to each route regardless of time of day or day of week means some vehicles remain underutilized while other routes consistently face overcrowding. 

● Manual fare collection and cash reconciliation create opportunities for errors and irregularities. Without automated tracking, it is difficult to verify reported passenger counts against actual ridership. 

● **Productivity Losses: **Citizens spend excessive time waiting for buses and dealing with unreliable service, reducing their available time for economic activities. This hidden cost affects the city's overall productivity. 

● Without systematic tracking of vehicle performance, preventive maintenance is often neglected until major breakdowns occur, leading to expensive emergency repairs instead of planned upkeep. 

**Control Weaknesses**

The system lacks effective management and accountability mechanisms:

● **Limited Accountability: **When passengers experience poor service, there is no clear way to attribute responsibility. Was the driver late, was the bus reassigned, or was the schedule unrealistic? Without data, these questions cannot be answered. 

● **Weak Performance Monitoring: **AARTB officials cannot systematically monitor whether operators are fulfilling their service obligations. Compliance checks rely on occasional physical inspections rather than continuous monitoring. 

● **Difficulty Enforcing Standards: **Even when problems are identified, addressing them is challenging because decision-makers lack concrete evidence about patterns of non-compliance. 

● **Informal Changes: **Drivers sometimes deviate from official routes based on traffic conditions or personal judgment, but these variations are not recorded or evaluated for potential system-wide adoption. 

● **Limited Supervision Capacity: **Terminal supervisors can only monitor what happens directly in front of them. They have no visibility into whether buses are following routes correctly or maintaining schedules between terminals. 

**Efficiency Problems**

Operational processes are manual, slow, and prone to errors:

● **Manual Schedule Creation: **Administrators spend significant time creating weekly schedules by hand, checking paper records to avoid assigning the same bus to multiple routes at the same time. This process is tedious and still results in conflicts. 

● **Slow Communication: **Drivers must physically return to terminals or make phone calls to report issues, creating delays in response times. Critical information often gets lost in translation when passed through multiple people. 

● **Redundant Data Entry: **The same information about buses, drivers, and routes is recorded in multiple locations by different people, leading to inconsistencies and duplication of effort. 

● **Time-Consuming Reports: **Compiling monthly reports for AARTB requires administrators to manually aggregate data from various sources, a process that can take several days. 

**Service Quality Shortcomings**

Passengers experience frustration and dissatisfaction due to:

● **Uncertainty and Stress: **Not knowing when a bus will arrive creates anxiety and makes going to places difficult, particularly for passengers trying to reach appointments or work on time. 

● **Overcrowding: **During peak hours, passengers are regularly packed into buses beyond comfortable capacity. Many are left behind at stops because vehicles are too full to accept additional riders. 

● **Lack of Accessibility: **There is no system to help passengers with disabilities, tourists, or those unfamiliar with the city identify which bus to take or when it will arrive. 

● **No Feedback Mechanism: **Passengers who want to complain about service or suggest improvements have no formal channel to do so. Complaints made verbally to drivers or supervisors are rarely documented or acted upon

Table 2.1: Summary of PIECES Analysis

**Dimension**

**Key Problems**

**Performance**

Irregular service intervals, extended waiting times, low schedule adherence, delayed incident response

**Information**

No real-time updates,fragmented data storage, inconsistent route information, limited historical data

**Economics**

Fuel waste, inefficient fleet utilization, revenue leakage, productivity losses, high maintenance costs

**Control**

Limited accountability, weak performance monitoring, difficulty enforcing standards, informal route changes

**Efficiency**

Manual scheduling, slow communication, redundant data entry, paper-based systems, time-consuming reporting

**Service**

Passenger uncertainty, overcrowding, lack of accessibility, poor communication, no feedback channels

**2.2.3 Forms and Reports of the Current System** The system must be designed to ingest, digitize, and replace the main forms and reports currently used \(examples below come from field notes and document review\). Where possible the new system should use structured digital equivalents so data can be analysed automatically. 

Forms Used in Daily Operations

**Bus Assignment Sheet**

This form is prepared each morning by fleet supervisors and distributed to drivers. It contains:

● Bus registration number \(plate number\)

● Driver name and license number

● Assigned route \(e.g., "Meskel Square to Gotera via Sidist Kilo"\)

● Scheduled departure times from origin terminal

● Conductor name \(if applicable\)

● Fuel level at start of shift

Drivers carry this form throughout the day and return it at the end of their shift. Any handwritten notes about problems encountered are added to the margin. 

**Driver Logbook**

Each bus maintains a logbook that stays with the vehicle. Drivers record:

● Date and shift time

● Starting and ending odometer readings

● Number of trips completed

● Any mechanical issues observed \(e.g., "brake noise," "engine overheating"\)

● Unusual incidents \(accidents, police stops\)

This logbook is reviewed periodically by maintenance staff to identify vehicles needing service. 

**Incident Report Form**

When a significant incident occurs \(breakdown, accident, major delay\), drivers or supervisors complete a detailed report containing:

● Date, time, and location of incident

● Bus registration number and driver name

● Description of what happened

● Whether police were involved

● Immediate actions taken

● Supervisor signature

These forms are submitted to the operations manager and filed for reference. 

**Maintenance Request Form**

When a driver identifies a mechanical problem, they fill out a maintenance request describing:

● Bus number

● Nature of the problem

● Severity \(urgent/routine\)

● Date reported

The maintenance department uses these forms to prioritize repair work and order parts. 

**Fare Col ection Summary Sheet**

● At the end of each day, conductors complete a summary showing:

● Route operated

● Number of passengers carried \(estimated based on tickets sold\)

● Total cash collected

● Tickets issued

● Discrepancies or notes

This information is used for revenue accounting and ridership estimates. 

**Reports Generated Periodically**

**Daily Operations Report**

● Operations managers compile a summary each evening covering:

● Total number of buses dispatched by route

● Number of trips completed

● Buses that did not operate \(with reasons: maintenance, no driver, etc.\)

● Major incidents or delays

● Passenger complaints received verbally

This report is reviewed by senior management to identify immediate issues. 

**Weekly Fleet Status Report**

The maintenance department produces a weekly summary showing:

● Total buses in fleet

● Buses currently operational

● Buses under repair \(with expected return dates\)

● Buses awaiting parts

● Maintenance costs incurred

This helps administrators understand fleet availability and budget for repairs. 

**Monthly Performance Report to AARTB**

Each operator submits a monthly report to the Bureau containing:

● Total passengers carried \(estimated\)

● Total kilometers traveled

● Number of buses operated

● Summary of major incidents or breakdowns

● Service disruptions and causes

● Revenue collected

AARTB uses these reports to monitor operator performance and compliance with license terms. 

The proposed system must provide electronic versions of these forms plus exportable reports \(CSV/PDF\) and dashboards for quick oversight. 

**Limitations of Current Forms and Reports**

These documents present several challenges:

● Creating reports requires staff to manually review hundreds of paper forms, making the process slow and error-prone. 

● **Data Loss: **Paper forms can be lost, damaged, or incompletely filled out, resulting in gaps in records. 

● **No Standardization: **Different terminals or departments may use slightly different versions of forms, making aggregation difficult. 

● **Delayed Insights: **By the time reports are compiled and reviewed, the information is often days or weeks old, limiting its usefulness for operational decisions. 

● **Difficult Analysis: **Identifying patterns or trends requires tedious manual review of past reports, which is rarely done systematically. 

● **Storage Challenges: **Boxes of paper records accumulate over time, taking up space and making historical data retrieval impractical. 

**2.2.4 Players of the Existing System** The public bus transport system involves multiple stakeholders, each with distinct roles, responsibilities, and interactions with other players. Understanding these relationships is crucial for designing a system that serves everyone effectively. 

**A. Regulatory and Administrative Bodies**

I. 

**Addis Ababa Road and Transport Bureau \(AARTB\)** The Bureau acts as the central regulatory authority with the following responsibilities:

● Issues operating licenses to bus companies and associations

● Approves route assignments and fare structures

● Sets safety and service quality standards

● Monitors operator compliance through inspections and reports

● Mediates disputes between operators or between operators and passengers

● Coordinates with city planning authorities on transport infrastructure development Bureau officials interact with operators through formal meetings, written directives, and periodic compliance checks. 

**II. Transport and Logistics Agency \(Federal Level\)** While AARTB manages city-level operations, the federal Transport and Logistics Agency provides:

● National policy guidance on public transport

● Standards for vehicle registration and driver licensing

● Coordination between regional transport authorities Federal agencies have limited direct involvement in day-to-day bus operations but influence long-term planning and regulatory frameworks. 

**B. Bus Operating Enterprises and Associations** **I. Anbessa City Bus Service Enterprise \(ACBSE\)** As the primary government-owned operator, Anbessa employs:

● General Manager: manages overall operations, strategic planning, and relationships with AARTB. 

● Operations Managers: Supervise daily fleet deployment, schedule preparation, and service delivery. 

● Fleet Maintenance Manager: Coordinates vehicle repairs, parts procurement, and preventive maintenance programs. 

● Terminal Supervisors: Manage bus departures at major terminals, handle immediate operational issues, and communicate with drivers. 

● Administrative Staff: Process driver payroll, maintain paper records, and compile reports for management and AARTB. 

Anbessa serves as the backbone of the system but faces challenges with aging infrastructure and limited modernization resources. 

**II. Sheger Mass Transit Enterprise \(SMTE\)**

Sheger operates similarly to Anbessa but with:

● Newer fleet focused on high-capacity routes

● Smaller organizational structure with fewer administrative layers

● Limited pilot GPS tracking on some vehicles \(not integrated city-wide\) Sheger management coordinates with AARTB but operates independently from Anbessa with no formal data sharing. 

**III.Private Operators \(Velocity Bus \)**

Private operators bring additional capacity through:

● Operator Management: Company executives who negotiate route licenses with AARTB

and manage business operations. 

● Fleet Coordinators: Assign buses and drivers to routes based on demand and vehicle availability. 

● Maintenance Contractors: Often outsource repairs to third-party garages rather than maintaining in-house facilities. 

Private operators value operational independence but face challenges coordinating with government systems and accessing shared infrastructure like terminals. 

**C. Drivers and Conductors**

**I. Bus Drivers**

Drivers are the most visible face of the system to passengers. Their responsibilities include:

● Following assigned routes and attempting to maintain schedules

● Operating vehicles safely according to traffic laws

● Managing passenger boarding and flow

● Reporting mechanical problems and incidents

● Collecting fares \(on buses without conductors\) Drivers interact with terminal supervisors at the start and end of shifts, communicate with dispatchers when problems arise, and respond to passenger questions throughout the day. Many drivers have years of experience and develop personal strategies for navigating traffic and managing routes. 

**II. Conductors**

On buses conductors:

● Collect fares and issue tickets

● Manage passenger flow and door operation

● Assist passengers with boarding, especially elderly or disabled riders

● Count and record revenue at shift end

Conductors provide important passenger service but their role is decreasing as operators shift to automated fare collection systems. 

**D. Passengers**

Passengers are the end beneficiaries of the system but currently have limited formal representation. Different passenger groups have varying needs: **I. Regular Commuters**

● Workers, students, and others who use buses daily develop deep knowledge of routes and timing through repeated experience. They know which buses to take and roughly when to expect them, but still face uncertainty during disruptions. 

**II. Occasional Users**

● Residents who use buses infrequently or visitors to the city struggle to navigate the system without clear route information or schedules. They often ask drivers or other passengers for help. 

**III.Vulnerable Passengers**

● Elderly passengers, people with disabilities, pregnant women, and those with young children face particular challenges with overcrowded buses and lack of accessible information. 

Passengers interact with the system primarily through drivers and terminal staff, with limited formal channels for feedback or complaints. 

**E. Support and Maintenance Staff** **I. Mechanics and Technicians**

Maintenance staff keep the fleet operational through:

● Routine servicing based on mileage or time intervals

● Responding to driver-reported problems

● Emergency roadside assistance for breakdowns

They rely on driver logbooks and maintenance request forms to prioritize work but often lack complete vehicle history due to poor record-keeping. 

**II. Terminal Staff**

Workers at major terminals include:

● Security personnel who manage vehicle and passenger movement

● Information desk staff who answer passenger questions

● Cleaners who maintain facility hygiene

Terminal staff observe daily operations but have no formal role in service planning or improvement. 

**III. Informal Players**

**Street Marshals \(Lebash\)**

Informal coordinators at some bus stops help direct passengers to the correct buses and manage queuing. They are not officially employed by operators but perform a valuable service that passengers recognize and sometimes compensate voluntarily. 

Parts Suppliers and Service Providers

Local businesses supply spare parts, fuel, tires, and other necessary inputs. Relationships with reliable suppliers are critical for maintaining fleet availability. 

**Summary of Stakeholder Interactions**

The current system involves complex interactions among these players:

● AARTB issues directives → Operators implement services → Drivers execute routes →

Passengers use buses

● Drivers report problems → Supervisors coordinate responses → Maintenance staff repair vehicles

● Operators compile reports → Submit to AARTB → Bureau monitors compliance

● Passengers provide informal feedback → Drivers relay concerns → Rarely reaches management

The lack of integrated digital systems means these interactions rely heavily on manual communication, paper forms, and personal relationships. Information flow is slow, often incomplete, and difficult to verify. A digital tracking and scheduling platform could formalize many of these interactions while maintaining the human relationships that make the system function. 

**2.3 Requirements Definition**

**2.3.1 Functional Requirements**

The Public Bus Tracking and Scheduling System for Ethiopian Cities is designed to address the operational and service delivery gaps found in existing public transportation management. The system must provide the following functional capabilities to ensure seamless administration, monitoring, and service enhancement across bus operators such as Anbessa, Sheger, and Velocity. 

 **Bus and Driver Registration: **Maintain accurate digital records of buses \(plate number, capacity, operator type\) and drivers \(license number, contact information, assigned routes\). 

 **Route and Schedule Management: **Provide CRUD operations for routes and schedules, static map visualization, and automated conflict detection for overlapping time allocations. 

 **Driver Dashboard: **Offer a mobile-friendly interface allowing drivers to update stop progression, submit incident reports, update trip information, and communicate with administrators. 

 **Passenger Dashboard: **Enable passengers to search routes or schedules, view static route maps, estimate arrival times based on schedule, and submit service feedback. 

 **Administrative Dashboard: **Present real-time summaries of buses, active routes, unreported vehicles, delays, and overall fleet performance indicators. 

 **Analytics and Reports: **Generate daily, weekly, and monthly summaries for operations planning, delay analysis, feedback trends, and route performance evaluation. 

 **Incident Management System: **Allow drivers to log breakdowns, accidents, heavy traffic, or delays with severity levels, notifying administrators instantly for immediate action. 

 **Passenger Feedback Categorization: **Classify passenger complaints into categories \(delay, overcrowding, safety issue\) and produce visual summaries for administrators. 

 **Terminal and Stop Management: **Register bus terminals, stops, and capacity details to enhance route and passenger flow planning. 

 **Integration with Mapping Services: **Provide static map-based route visualization using mapping APIs with support for stop markers and route outlines. 

 **Audit Trail and Logging: **Record all user activities \(admin changes, driver updates, schedule modifications\) to ensure transparency and accountability. 

 **Static Bus Status Tracking: **Display buses marked as 'On Route', 'Delayed', 'Under Maintenance', or 'Awaiting Dispatch' without live GPS tracking. 

**2.3.2 Non-Functional Requirements**

The system must meet specific quality standards to ensure performance, usability, and compliance. These non-functional requirements define the essential attributes that guarantee reliability, security, and long-term scalability of the platform. 

 **Usability: **User interfaces must be simple, intuitive, and optimized for both desktop and mobile access. 

 **Reliability: **The system must maintain consistent operation with at least 95% uptime and dependable functionality. 

 **Scalability: **The architecture should support expansion to additional Ethiopian cities and increased bus fleet sizes. 

 **Security: **Authentication, authorization \(RBAC\), and encryption must protect sensitive data from unauthorized access. 

 **Performance: **All dashboards should load within 3 seconds on a 4G connection; database queries must execute efficiently. 

 **Maintainability: **The system must be built with modular architecture \(frontend, backend, database\) to support updates and new integrations. 

 **Accessibility: **Interfaces must support mobile-friendly layouts and be usable on low-bandwidth connections. 

 **Portability: **The web-based system must run effectively across multiple browsers and low-end smartphones. 

 **Data Integrity: **All records must prevent duplication and ensure consistent, accurate data storage. 

 **Compliance: **The system must align with Ethiopian digital governance standards and

transport sector regulations. 

 **Interoperability: **The system should support integration with future GPS modules or external transport data sources. 

 **Backup and Recovery: **Automatic daily backups must be supported to prevent loss of operational data. 

 **Localization: **Date formats, languages, and location naming conventions must follow Ethiopian context standards. 


# Document Outline

+ 2.1 Overview 
+ 2.2 Business area analysis  
	+ 2.2.1 Activities / functions of the organisation 
	+ Addis Ababa Road & Transport Bureau — AARTB 
	+ Bus Drivers and Conductors 
	+ Passengers and public 
	+ 2.2.2 Problems of the current system\(Using the PIE 
	+ Performance Issues 
	+ Information Deficiencies 
	+ Economic Inefficiencies 
	+ Control Weaknesses 
	+ Efficiency Problems 
	+ Service Quality Shortcomings 
	+ 2.2.3 Forms and Reports of the Current System 
	+ Forms Used in Daily Operations 
	+ Bus Assignment Sheet 
	+ Driver Logbook 
	+ Incident Report Form 
	+ Maintenance Request Form 
	+ Fare Collection Summary Sheet 
	+ Reports Generated Periodically 
	+ Daily Operations Report 
	+ Weekly Fleet Status Report 
	+ Monthly Performance Report to AARTB 
	+ Limitations of Current Forms and Reports 
	+ 2.2.4 Players of the Existing System 

+ B.Bus Operating Enterprises and Associations 
+ C.Drivers and Conductors  
	+ I.Bus Drivers 
	+ II.Conductors 

+ D.Passengers  
	+ I.Regular Commuters 
	+ II.Occasional Users 
	+ III.Vulnerable Passengers 

+ E.Support and Maintenance Staff  
	+ I.Mechanics and Technicians 
	+ II.Terminal Staff 
	+ III. Informal Players 

+ Summary of Stakeholder Interactions 
+ 2.3 Requirements Definition  
	+ 2.3.1 Functional Requirements 
	+ 2.3.2 Non-Functional Requirements



