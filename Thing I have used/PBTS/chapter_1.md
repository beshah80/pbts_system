**ADDIS ABABA UNIVERSITY COLLEGE OF**

**NATURAL AND COMPUTATIONAL SCIENCES**

**School of Information Science**

Public Bus Tracking and Scheduling System for Ethiopian Cities

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

**Chapter One: Introduction** **1.1 Overview**

Urban transport is the backbone of Ethiopia’s rapidly growing cities. As Addis Ababa’s population exceeds five million, efficient and reliable public transportation has become essential for daily mobility. Public buses operated by the Anbessa City Bus Service Enterprise \(ACBSE\), Sheger Mass Transit, and various private associations serve as the primary mode of transport for most residents. However, these services face persistent operational and communication challenges that hinder effectiveness and passenger satisfaction. 

Major issues include unreliable schedules, overcrowding, lack of real-time information, and limited incident reporting mechanisms. Passengers often experience long waiting times, uncertainty about bus arrivals, and poor service coordination. At the same time, transport authorities and associations struggle with inefficient route management, data inaccuracy, and limited visibility into daily operations. 

To address these issues, the proposed **Public Bus Tracking and Scheduling System** **for Ethiopian Cities **aims to create a web-based platform that improves coordination between transport administrators, drivers, and passengers. The system’s goal is to modernize public transport management by providing accurate scheduling, route updates, and accessible passenger information through a unified platform. 

The platform will feature three main dashboards: I. **Admin Dashboard: **For transport authorities and associations to manage buses, routes, and schedules, and to monitor performance. 

II. **Driver/Supervisor Dashboard: **For updating trip information, reporting incidents, and coordinating with administrators. 

III. **Passenger Dashboard: **For viewing routes, schedules, live bus updates, and submitting feedback. 

— 1 —

The system will be built using modern web technologies that ensure scalability, responsiveness, and ease of maintenance. It will adopt a modular web architecture, connecting a central database with interactive dashboards and an integrated mapping interface for route visualization. 

This chapter introduces the project by presenting the background of the transport sector, the problems identified in the current system, and the objectives of the proposed solution. It also outlines the project’s significance, key beneficiaries, scope, methodology, feasibility, potential risks, and development schedule. The ultimate goal is to demonstrate how digital solutions can enhance efficiency, transparency, and user experience in Ethiopia’s urban public transport systems. 

**1.2 Background of the Organization**

Efficient public transportation in Ethiopian cities, especially in Addis Ababa, is crucial for mobility, economic growth, and reducing congestion. However, the system still relies heavily on manual operations for bus tracking, scheduling, and reporting. 

Understanding how the main transport institutions currently function and the digital limitations they face helps identify where a *Public Bus Tracking and Scheduling* *System * can make the greatest impact. 

This section examines the main actors in Addis Ababa’s public transport system: the Addis Ababa Road and Transport Bureau \(AARTB\), Anbessa City Bus Service Enterprise \(ACBSE\), Sheger Mass Transit Enterprise \(SMTE\), and private operators such as Velocity Bus. Each plays a role in managing or operating city buses, yet all share similar challenges related to data management, system integration, and service monitoring. 

**1.2.1 Addis Ababa Road & Transport Bureau \(AARTB\)** The Addis Ababa Road and Transport Bureau \(AARTB\) is the city’s regulatory and administrative authority responsible for managing all transport operations and setting urban mobility policies. It licenses bus operators, approves routes, and ensures compliance with safety and performance standards. 

— 2 —

**Existing Systems:**

 The Bureau uses limited digital tools for permit management and fleet registration, but there is no centralized or automated bus tracking and scheduling system. 

 Most monitoring is done manually through field inspections and reports from bus enterprises. 

**Challenges:**

 **Fragmented data **— separate systems for different operators \(Anbessa, Sheger, private buses\). 

 **Manual record-keeping **that slows data collection and reporting. 

 **No real-time visibility **of bus movements or schedule adherence. 

 **Delayed decision-making **during traffic disruptions or breakdowns. 

**1.2.2 Anbessa City Bus Service Enterprise \(ACBSE\)** Founded in 1945, Anbessa is the oldest and largest government-owned bus operator in Ethiopia. It serves over 1.5 million passengers daily with a fleet of more than 600

buses operating on 125\+ routes across Addis Ababa. 

**Existing Systems:**

 Anbessa has partially digitized fare collection and fleet maintenance logs, but bus tracking and scheduling are still manual. 

 A limited GPS trial system was introduced in a few buses around 2018 in collaboration with the Ministry of Innovation and Technology, but it was not scaled city-wide due to technical and financial constraints. 

**Challenges:**

 **Fixed route scheduling: **Buses per route remain constant despite changing demand. 

 **Manual incident reporting: **Drivers use phone calls or written reports to log delays or breakdowns. 

— 3 —

 **Aging fleet: **Frequent mechanical failures cause irregular services and unreliable schedules. 

 **Lack of real-time passenger information: **Passengers wait long at terminals without knowing bus arrival times. 

**1.2.3 Sheger Mass Transit Enterprise \(SMTE\)** The Sheger Mass Transit Enterprise, launched in 2020, was created to modernize public transport and complement Anbessa by serving high-demand routes using new diesel and electric buses. 

**Existing Systems:**

 Sheger has a **small-scale GPS tracking pilot **for monitoring a few buses introduced in 2023. 

 The data is **not integrated **with AARTB or Anbessa platforms, limiting inter-agency coordination. 

**Challenges:**

 **Limited fleet size **relative to passenger demand. 

 **Non-integrated scheduling: **No shared system with other public or private operators. 

 **Manual data reporting: **Schedule and performance reports are compiled at the end of the day or week, making real-time adjustment impossible. 

**1.2.4 Private Bus Operators \( Velocity Bus\)** Private operators, including Velocity Bus under the Belayneh Kindie Group, contribute significantly to public mobility. In 2024, Velocity introduced over 100

Golden Dragon electric buses, making it the largest electric fleet in East Africa. 

**Existing Systems:**

 Velocity uses basic GPS-based fleet management for maintenance and internal route monitoring. 

 However, it operates independently, with no data integration or scheduling coordination with government operators. 

— 4 —



**Challenges:**

 **Lack of shared data platform **between private and public systems. 

 **Insufficient charging infrastructure **causing operational delays. 

 **Absence of centralized passenger information systems. **

*Figure 1.1 – Organizational Structure of Addis Ababa Transport System* **1.3 Statement of the Problem**

The public bus system in Addis Ababa faces multiple operational, informational, and systemic challenges that affect passengers, drivers, administrators, and the city as a whole. Despite serving millions of daily commuters, the current transport network struggles with inefficiencies that reduce service reliability, passenger satisfaction, and overall urban mobility. These challenges can be grouped according to the primary stakeholders involved. 

**1.3.1 Passenger Chal enges**

Passengers frequently experience uncertainty and inconvenience due to the following issues:

— 5 —

 **Unpredictable arrivals: **Buses often arrive irregularly, causing passengers to wait more than 30 and 60 minutes without reliable information. 

 **Overcrowding: **During peak hours \(7–9 AM and 5–7 PM\), buses become overloaded, leaving many commuters unable to board. 

 **Lack of information: **There is no centralized platform providing accurate details on routes, schedules, or delays. 

 **No feedback system: **Passengers cannot formally report complaints, service quality issues, or suggestions for improvement. 

**1.3.2 Driver and Supervisor Challenges**

Bus operators and supervisors also face obstacles that limit operational efficiency:

 **Manual incident reporting: **Drivers rely on phone calls or paper logs to report delays, accidents, or mechanical issues, delaying corrective actions. 

 **No digital tools: **Mobile-friendly dashboards or platforms for updating stop information are not available to drivers. 

 **Accountability gaps: **Supervisors have limited ability to verify whether buses are adhering to schedules or planned routes. 

**1.3.3 Administrative Challenges**

At the organizational level, bus associations and regulatory authorities encounter the following problems:

 **Fragmented data: **Information on buses, routes, and schedules is stored in separate, disconnected systems. 

 **Fixed allocation of buses: **Operators such as ACBSE assign a constant number of buses per route without considering daily demand variations. 

 **Lack of analytics: **Authorities cannot access real-time data to optimize routes, predict delays, or respond efficiently to incidents. 

 **Limited oversight: **The Bureau cannot monitor the performance of different operators or track service quality in real time. 

— 6 —

**1.3.4 City-Level Challenges** The inefficiencies of the public bus system have broader implications for the city:

 **Traffic congestion: **Poorly coordinated scheduling contributes to urban traffic jams. 

 **Economic cost: **Delays and inefficiencies reduce productivity and increase fuel consumption. 

 **Public dissatisfaction: **Weak transport services undermine public trust in city infrastructure and government-managed systems. 

**1.4 Objectives of the Project**

**1.4.1 General Objective**

The general objective of this project is to design and implement a web-based Public Bus Tracking and Scheduling System for Addis Ababa. The system aims to enable transport authorities and bus associations to efficiently manage buses, routes, and schedules, while providing passengers with accurate and timely travel information **1.4.2 Specific Objectives of the Project**

 To provide a digital platform for registering buses and drivers, including details such as plate numbers, capacity, and driver information \(name, license, contact\). 

 To replace fragmented paper-based records with a centralized database, ensuring accuracy, accessibility, and ease of management. 

 To enable administrators to define and manage bus routes, including start points, end points, and intermediate stops. 

 To automate schedule creation with conflict detection to prevent overlapping assignments and improve service reliability. 

 To offer drivers a mobile-friendly interface for viewing assigned routes and schedules, allowing them to update their current stop and report incidents \(traffic delays, breakdowns, blockages\). 

 To facilitate timely communication between drivers and supervisors to enhance operational efficiency. 

— 7 —

 To enable passengers to search for and view routes, schedules, and estimated arrival times while providing a static map visualization of bus routes and stops for easier navigation. 

 To create a feedback system for passengers to submit complaints or suggestions, thereby improving service quality and accountability. 

 To provide administrators with real-time dashboards displaying active buses, unreported buses, and delays, along with generating summary reports for planning and performance evaluation. 

 To design the system for scalability, allowing adaptation to other Ethiopian cities \(e.g., Dire Dawa, Mekelle, Hawassa\) with customizable routes, fleet sizes, and reporting tools. 

**1.5 Feasibility Study**

A feasibility study evaluates whether the proposed system is practical, achievable, and sustainable. It examines technical, economic, operational, schedule, and legal/ethical dimensions to ensure the project can be successfully implemented.1.5.1 Technical Feasibility

**1.5.1 Technical Feasibility**

The proposed Public Bus Tracking and Scheduling System is technically feasible given the available infrastructure, devices, and development environment. 

 **Infrastructure: **Ethiopia’s internet penetration is improving, with 4G

coverage widely available in Addis Ababa and expanding 5G pilot projects. 

 **Devices: **Most drivers and supervisors own smartphones capable of running lightweight web applications, facilitating system adoption. 

 **Development Environment**

 **IDE: **Visual Studio Code \(latest version\)

 **Languages & Frameworks: **Next.js, Node.js, GraphQL, TypeScript, MongoDB

 **Hardware: **Development PC with Windows 11 Pro, 11th generation CPU, 16 GB RAM, 500 GB storage \(360\+ GB free\), 64-bit architecture

— 8 —

 **Software Tools: **Docker for containerized deployment, Vercel for frontend hosting, Render for backend hosting

 **Mapping: **Google Maps API \(static visualization\) provides cost-effective route display without requiring expensive GPS tracking. 

**1.5.2 Economic Feasibility**

The project is economically feasible due to low costs and significant benefits. 

Development will be student-led, incurring no labor costs, while hosting will utilize free-tier services for pilot deployment. Training expenses will be minimal, focusing on drivers and administrators. Benefits include reduced delays, which enhance passenger satisfaction, improved scheduling that leads to fuel savings and less operational inefficiency, and data-driven planning that supports long-term efficiency improvements. Overall, the project offers a high benefit-to-cost ratio. 

**1.5.3 Operational Feasibility**

The project is operationally feasible, as drivers already use smartphones for communication, making it practical for them to update stops via the application. 

Administrators currently rely on manual scheduling, and digital dashboards will enhance their efficiency and monitoring capabilities. Increasing smartphone adoption among passengers allows them to access dashboards easily, and public kiosks or web interfaces can further support access. Overall, minimal training and awareness campaigns will be needed to ensure successful implementation. 

Table 1.1: Feasibility Summary

**Dimension**

**Findings**

**Conclusion**

Technical

Internet coverage, smartphones, cloud hosting available Feasible

Economic

Low cost, high benefits

Feasible

Operational

Drivers, administrators, and passengers can adapt with Feasible training

— 9 —

**1.6 Significance of the Project** The Public Bus Tracking and Scheduling System holds significant value for multiple stakeholders, including passengers, drivers, administrators, the city, and the project developers \(Us\) themselves:

1\) **For Passengers:**

 Reduced uncertainty and waiting times. 

 Access to accurate route and schedule information. 

 Ability to provide feedback and report service issues. 

2\) **For Drivers:**

 Easier and faster incident reporting through digital dashboards. 

 Clearer schedules and route assignments. 

 Reduced unjust blame for delays, improving work accountability. 

3\) **For Administrators \(AARTB, Anbessa, and Other Operators\)**

 Centralized management of buses, routes, and schedules. 

 Real-time monitoring of bus operations for improved oversight. 

 Analytics and reports to support effective planning and decision-making. 

4\) **For the City:**

 Improved efficiency of urban transport, reducing traffic congestion. 

 Supports sustainable mobility and environmental goals. 

 Aligns with Ethiopia’s national digital transformation and smart city strategies. 

5\) **For the Project Developers \(Students / Us\):**

 Gain practical experience in **web development, database management, and** **dashboard design**. 

 Hands-on exposure to modern technologies such as **Next.js, Node.js,** **GraphQL, MongoDB, and cloud deployment**. 

— 10 —

 Develop skills in **project management, problem solving, and research** **methodology**. 

 Contribute to a **real-world solution **with social and economic impact, enhancing academic and professional growth. 

**1.7 Beneficiaries of the Project**

The project directly and indirectly benefits a wide range of stakeholders:

 **Addis Ababa Road & Transport Bureau \(AARTB\): **Improved oversight, centralized monitoring, and enhanced planning capabilities. 

 **Anbessa City Bus Service Enterprise: **Better scheduling, incident management, and fleet utilization. 

 **Sheger Mass Transit & Private Associations: **Scalable solution for integration into existing operations. 

 **Drivers and Supervisors: **Simplified reporting, clearer assignments, and enhanced accountability. 

 **Passengers: **Access to accurate route and schedule information, reduced waiting times, and the ability to submit feedback. 

 **Urban Planners and Policymakers: **Data-driven insights to support transport policies and urban mobility planning. 

 **Students and Researchers: **Reference for future projects in transport digitalization, smart cities, and public service systems. 

 **Project Developers \(Us / Students\): **Acquisition of technical skills, practical experience, and contribution to a meaningful real-world system that can improve urban mobility. 

**1.8 Methodology**

This project employs a mixed-methods approach for data collection and adopts an Agile \(Scrum\) methodology for system development. The combination ensures that the proposed Public Bus Tracking and Scheduling System is grounded in accurate, real-world insights from Addis Ababa’s transport sector and developed iteratively with stakeholder feedback to ensure practical usability. 

— 11 —

**1.8.1 Data Sources and Collection Methods** To gather comprehensive and reliable information, data were obtained from both **primary **and **secondary **sources. The primary sources provided firsthand data from key stakeholders, while the secondary sources offered additional background and comparative information from existing studies, reports, and digital platforms. 

**1.8.1.1 Primary Data Sources**

Primary data were collected directly from the following groups and institutions:

 **Addis Ababa Road and Transport Bureau \(AARTB\): **Officials were interviewed to understand the Bureau’s operational structure, data management practices, and the manual and semi-digital systems currently in use for bus regulation and reporting. 

 **Bus Drivers: **Provided practical insights into daily operations, route management, schedule adherence, and incident reporting processes. 

 **Passengers: **Shared experiences related to waiting times, route reliability, information access, and overall satisfaction with the city’s public transport system. 

**Primary Data Collection Methods**

**Interviews**

 Conducted with AARTB officials, bus drivers, and passengers. 

 Questions focused on challenges in current scheduling and tracking methods, communication issues, and expectations for a digital solution. 

**Observation**

 Observations were carried out at key bus terminals such as **Meskel** **Square**, **Mexico Square**, **Megenagna**, and **Piyassa**. 

 Focus areas included queue length, bus arrival intervals, passenger flow, and information dissemination methods. 

— 12 —

**1.8.1.2 Secondary Data Sources** Secondary data were obtained from previously published materials, online platforms, and institutional documents to supplement the primary findings. These helped provide background information on the transport sector, related technologies, and existing projects. 

 **Anbessa City Bus Service Enterprise \(ACBSE\): **Information was collected from official documents, published reports, and research papers describing its operations, challenges, and prior digital initiatives. 

 **Sheger Mass Transit Enterprise \(SMTE\): **Secondary information was drawn from news articles, government publications, and previous studies. 

 **Velocity Bus \(Private Operator\): **Data were gathered from the Belayneh Kindie Group website and related news coverage on electric bus deployment. 

 **Websites and Online Tools: **Platforms such as **AddisMapTransit **and **Google Maps Transit **were reviewed for route data and mapping features. 

 **Research and Reports: **Studies from the **World Bank**, **Ministry of** **Transport**, and prior academic research on intelligent transport systems in Ethiopia were analyzed. 

**Secondary Data Collection Methods**

**Document Review**

 Involved examining policy papers, operator schedules, operational manuals, and reports from relevant institutions. 

 Included reviewing templates such as driver logs, route plans, and incident reporting forms. 

**Web and Literature Review**

 Analysis of online transport platforms, prior university projects, and international best practices in bus tracking and scheduling systems. 

— 13 —

**1.8.2 System Development Methodology** The **Agile \(Scrum\) **methodology was adopted for system development to allow flexibility, iterative progress, and consistent feedback from stakeholders throughout the process. 

**Key Features of the Agile Approach:**

 **Sprints: **Development was organized into 2–3 week cycles, each focusing on core components such as bus registration, route management, and passenger dashboards. 

 **Deliverables: **Each sprint produced a functional prototype that could be tested and refined. 

 **Feedback Loops: **Regular review meetings with stakeholders \(including AARTB representatives\) guided revisions and improvements. 

 **Adaptability: **Requirements and features were updated based on feedback, testing results, and evolving project needs to ensure that the final system met practical and operational expectations. 

**1.9 Development Tools and Technologies**

This section outlines the technologies, tools, and environment used for the development of the Public Bus Tracking and Scheduling System. These tools support efficient development, testing, deployment, and documentation. 

**1.9.1 Frontend Technologies**

 **Next.js \(App Router\): **Implements server-side rendering for fast load times and improved SEO. 

 **TypeScript: **Ensures type safety across frontend and backend code, reducing runtime errors. 

 **Tailwind CSS: **Provides utility-first styling for responsive, accessible, and consistent UI design. 

— 14 —

**1.9.2 Backend Technologies**

 **Node.js \+ Express: **Lightweight and scalable backend framework for handling requests efficiently. 

 **Apollo GraphQL Server: **Enables flexible queries, avoids over-fetching, and optimizes data transfer. 

 **JWT Authentication: **Provides secure login for administrators and drivers. 

**1.9.3 Database Technologies**

 **MongoDB \+ Prisma: **NoSQL database with type-safe queries and schema management for structured data storage. 

**1.9.4 Documentation & Modeling Tools**

 **UML Diagrams: **Use case, sequence, and class diagrams to model system design. 

 **Lucidchart / Draw.io: **Visual modeling and diagram creation for clear system representation. 

 **Swagger: **API documentation for backend services. 

**1.9.5 Deployment Environment**

 **Vercel: **Frontend hosting with automatic builds and deployment. 

 **Render: **Backend hosting with support for Node.js applications. 

 **Docker: **Containerization for consistent environments across development and deployment. 

 **CI/CD Tools: **Automates testing and deployment for efficient project delivery. 

**1.9.6 Development Environment / IDE**

 **IDE: **Visual Studio Code \(latest version\) for coding, debugging, and version control. 

 **Operating System: **Windows 11 Pro, 64-bit. 

 **Hardware: **11th generation CPU, 16 GB RAM, 500 GB storage \(360\+ GB

free\). 

— 15 —

 **Additional Tools: **Git for version control, Postman for API testing. 

**Rationale: **This setup ensures that the development, testing, and deployment of the system can be performed efficiently without hardware or software limitations. 

Table 1.2: Tools and Features

**Category**

**Technology / Tool**

**Features / Advantages**

Frontend

Next.js, TypeScript, Tailwind SEO-friendly, type safety, responsive and CSS

accessible UI

Backend

Node.js, GraphQL, JWT

Scalable, 

efficient

data

fetching, 

secure

authentication

Database

MongoDB \+ Prisma

Type-safe queries, schema management, flexible storage

Documentation/M UML, Lucidchart / Draw.io, Clear visual diagrams, API documentation, system odeling

Swagger

modeling

Vercel, 

Render, 

Docker, Cloud-ready, containerized, automated testing and Deployment

CI/CD

deployment

Development

VS Code, Windows 11 Pro, 16 Sufficient IDE and hardware setup for Environment

GB RAM, 500 GB storage

development and testing

**1.10 Scope of the Project**

The scope defines the boundaries of the Public Bus Tracking and Scheduling System by clearly identifying what is included \(in-scope\) and what is excluded \(out-of-scope\) in the current development phase. 

**In-Scope**

The system will cover the following functionalities:

 Admin CRUD operations for buses, routes, and schedules. 

 Automated schedule conflict detection to prevent overlapping assignments. 

 Driver dashboard for updating current stops and reporting incidents. 

 Passenger dashboard for viewing routes, schedules, and feedback submission. 

 Static map visualization of routes and stops. 

— 16 —

 Feedback system for passengers to report complaints or suggestions. 

 Analytics dashboard for administrators to monitor bus activity, delays, and unreported buses. 

 Inclusion of government-owned \(Anbessa, Sheger\) and private buses \(Velocity\) for route and schedule management. 

**Out-of-Scope**

The following features are not included in the current project version:

 Live GPS tracking of buses in real time. 

 Predictive estimated time of arrivals \(ETAs\) based on traffic conditions. 

 Other bus operators are not included in this version of the project. 

Table 1.3 – Scope Boundaries \(In-Scope vs Out-of-Scope\) **Category**

**In-Scope**

**Out-of-Scope**

Functionality

Admin CRUD \(buses, routes, schedules\)

Live GPS tracking

Scheduling

Schedule conflict detection

Predictive ETAs

Stop updates & incident reporting

Full mobile apps

Driver Features

Passenger

Route/schedule

views, 

static

map Ticketing/payment

visualization, feedback system

integration

Analytics

Admin dashboard for monitoring buses, 

delays, and unreported activities

Operators Covered

Only government buses \(Anbessa, Sheger\)

Other private or

and private buses \(Velocity\)

government operators

— 17 —

**1.11 Risks, Assumptions, and Constraints** This section identifies potential challenges, underlying assumptions, and constraints affecting the development and deployment of the Public Bus Tracking and Scheduling System. 

**Risks**

 **Low driver adoption: **Drivers may be reluctant to adopt digital dashboards. 

 **Mobile data costs: **Continuous internet access may incur costs for drivers. 

 **Inconsistent route naming: **Variations in route names could cause confusion. 

 **Resistance to digital change: **Stakeholders may prefer traditional methods over digital systems. 

**Assumptions**

 Drivers own smartphones capable of running the system. 

 The Addis Ababa Road & Transport Bureau supports the pilot implementation. 

 Internet access is available at key bus terminals. 

**Constraints**

 Limited project duration \(semester-long project\). 

 Budget restrictions due to academic project funding. 

 GPS integration is not included in the current project scope\(means live GPS

but there will be static GPS/Manually\). 

**Table 1.4 – Risk Matrix \(Likelihood vs Impact\)** **Risk**

**Likelihood Impact**

**Mitigation**

Medium

High

Training, awareness, and user-friendly interface Low driver adoption

design

Mobile data costs

Medium

Medium Optimize app for low data usage, offline support Inconsistent

route High

Medium Standardize route naming conventions in naming

database

— 18 —

Resistance to digital Medium High

Regular stakeholder engagement and

change

demonstrations

**1.12 Phases and Deliverables**

The project will follow a structured, phase-based development approach, ensuring that all tasks are completed systematically and documentation is maintained at each stage. 

**Phase 1 – Discovery: **Conduct interviews with AARTB officials, bus drivers, and passengers to gather firsthand insights. Observe operations at major bus terminals and compile findings to finalize the problem statement. 

**Phase 2 – Design: **Develop UML diagrams to model system workflows, create the database schema for efficient data management, and design wireframes for Admin, Driver, and Passenger dashboards. 

**Phase 3 – Implementation: **Build the core system modules, including Admin functionalities for managing buses, routes, and schedules, Driver dashboard for updating stops and reporting incidents, and Passenger dashboard for accessing route and schedule information. 

**Phase 4 – Testing: **Conduct unit testing of individual components, integration testing to ensure modules work together, and usability testing to validate the system from the perspective of end-users. 

**Phase 5 – Deployment: **Deploy the system on a cloud platform for pilot use, allowing administrators, drivers, and passengers to interact with the system in a real operational environment. 

**Phase 6 – Evaluation: **Review system performance, analyze collected analytics, gather stakeholder feedback, and make final adjustments to improve usability and efficiency before project completion. 

**Deliverables:**

 Project documentation and reports

 UML diagrams and wireframes

— 19 —



 MVP system \(Admin, Driver, and Passenger dashboards\)

 Pilot deployment and feedback report

**1.13 Work Breakdown Structure \(WBS\)**

The Work Breakdown Structure \(WBS\) organizes the project into manageable components, ensuring that all tasks are properly allocated and tracked. The main components of the system development are:

Figure 1.2 – **WBS Tree **\(hierarchical representation of project tasks and sub-tasks\). 

— 20 —



**1.14 Project Schedule**

The project will follow a structured timeline to ensure timely completion and milestone tracking. 

Figure 1.3. **Gantt Chart**

— 21 —


# Document Outline

+ Chapter One: Introduction  
	+ 1.1 Overview 
	+ 1.2 Background of the Organization  
		+ 1.2.1 Addis Ababa Road & Transport Bureau \(AARTB\) 
		+ 1.2.2 Anbessa City Bus Service Enterprise \(ACBSE\) 
		+ 1.2.3 Sheger Mass Transit Enterprise \(SMTE\) 
		+ 1.2.4 Private Bus Operators \( Velocity Bus\) 

	+ 1.3 Statement of the Problem  
		+ 1.3.1 Passenger Challenges 
		+ 1.3.2 Driver and Supervisor Challenges 
		+ 1.3.3 Administrative Challenges 
		+ 1.3.4 City-Level Challenges 

	+ 1.4 Objectives of the Project  
		+ 1.4.1 General Objective 


+ The general objective of this project is to design  
	+ 1.4.2 Specific Objectives of the Project 

+ To provide a digital platform for registering buse 
+ To replace fragmented paper-based records with a c 
+ To enable administrators to define and manage bus  
+ To automate schedule creation with conflict detect 
+ To offer drivers a mobile-friendly interface for v 
+ To facilitate timely communication between drivers 
+ To enable passengers to search for and view routes 
+ To create a feedback system for passengers to subm 
+ To provide administrators with real-time dashboard 
+ To design the system for scalability, allowing ada  
	+ 1.5 Feasibility Study  
		+ 1.5.1 Technical Feasibility 
		+ 1.5.2 Economic Feasibility  
			+ The project is economically feasible due to low co 

		+ 1.5.3 Operational Feasibility 
		+ 1.6 Significance of the Project 
		+ 1.7 Beneficiaries of the Project 

	+ 1.8 Methodology  
		+ This project employs a mixed-methods approach for  
		+ 1.8.1 Data Sources and Collection Methods  
			+ 1.8.1.1 Primary Data Sources  
				+ Primary Data Collection Methods 

			+ 1.8.1.2 Secondary Data Sources  
				+ Secondary Data Collection Methods 


		+ 1.8.2 System Development Methodology 
		+ 1.9 Development Tools and Technologies  
			+ 1.9.1 Frontend Technologies 
			+ 1.9.2 Backend Technologies 

		+ 1.9.3 Database Technologies 
		+ 1.9.4 Documentation & Modeling Tools 
		+ 1.9.5 Deployment Environment 
		+ 1.9.6 Development Environment / IDE 
		+ 1.10 Scope of the Project  
			+ The scope defines the boundaries of the Public Bus 

		+ 1.11 Risks, Assumptions, and Constraints 


+ Table 1.4 – Risk Matrix \(Likelihood vs Impact\)  
	+ 1.12 Phases and Deliverables 
	+ 1.13 Work Breakdown Structure \(WBS\) 
	+ 1.14 Project Schedule



