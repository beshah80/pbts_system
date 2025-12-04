**Chapter 3: Object Oriented Analysis**

**Overview**

This chapter presents the Object-Oriented Analysis (OOA) for the Public
Bus Tracking and Scheduling System for Ethiopian Cities. Object-Oriented
Analysis is a crucial methodology used to define the software
requirements by modeling the system as a group of interacting objects.
The primary goal of this phase is to identify and formally describe the
system\'s core functional requirements, business rules, and its static
and dynamic structures from the user\'s perspective.

For this project, the OOA phase is instrumental in transforming the
identified problems of urban mobility---such as unpredictable bus
arrivals, inefficient scheduling, and lack of real-time information for
passengers and managers---into a clear, structured, and unambiguous
software specification. The models developed in this chapter will serve
as the foundational blueprint, ensuring that the subsequent design and
implementation stages are aligned with the specific needs of Ethiopian
cities\' public transport ecosystem. This analysis is structured into
three key modeling activities: Use Case Modeling to capture functional
requirements, Conceptual Modeling to define the static structure, and
Sequence Diagramming to illustrate dynamic interactions.

**Use Case Modeling**

Use Case Modeling is a foundational technique in object-oriented
analysis that serves to capture the functional requirements of a system
from an external perspective. It focuses on what the system should do,
rather than how it will do it, by defining the interactions between
users and the system to achieve specific, valuable goals. For the Public
Bus Tracking and Scheduling System, this process is instrumental in
translating the complex, real-world challenges of urban Ethiopian
transport---such as information asymmetry, scheduling ineffiencies, and
operational opacity---into a clear, structured set of system behaviors.
By systematically identifying user interfaces, defining governing
business rules, categorizing actors, and modeling their interactions,
use case modeling ensures the resulting platform is both functionally
robust and deeply aligned with the needs of its diverse stakeholders,
from daily commuters to city transport managers.

**UI Identification**

User Interface (UI) Identification is the process of enumerating and
defining the primary points of interaction between the actors and the
system. It moves beyond abstract functionality to conceptualize the
tangible screens and components through which users will accomplish
their goals. This step is not concerned with visual design elements like
color or typography, but rather with the functional layout, information
architecture, and navigational flow. For this system, UI identification
is critical due to the varied contexts of its users: a passenger on a
mobile device needs quick, glanceable information, while a system
administrator at a desktop requires comprehensive data management tools.
Identifying these interfaces early ensures that the system\'s
architecture supports a seamless, intuitive, and context-aware user
experience, bridging the gap between high-level use cases and the final,
deployable application.

| ID    | User Interface                | Used By                 | Description/Purpose                                                                                                             |
|-------|-------------------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| UI_01 | System Login Page             | Admin, Driver, Passenge | A secure authentication gateway for all users to access their respective dashboards.                                            |
| UI_02 | Admin Dashboard Home          | Admin                   | The main admin portal showing KPIs (On-time Performance, Active Buses, etc.) and system health alerts.                          |
| UI_03 | Bus Fleet Management Page     | Admin                   | Interface for registering new buses, editing details (license plate, capacity), and decommissioning buses.                      |
| UI_04 | Driver Management Page        | Admin                   | Interface for registering new drivers, assigning them to buses, and managing their accounts.                                    |
| UI_05 | Route Management Page         | Admin                   | Interface for creating new bus routes, defining stop sequences, and modifying existing routes.                                  |
| UI_06 | Schedule Management Page      | Admin                   | Interface for creating and modifying departure/arrival timetables for buses on specific routes.                                 |
| UI_07 | Feedback & Complaints Inbox   | Admin                   | A dedicated interface to view, filter, and respond to feedback and complaints submitted by passengers.                          |
| UI_08 | Incident Resolution Dashboard | Admin                   | A console to view reported incidents (delays, emergencies), assign resources, and mark them as resolved.                        |
| UI_09 | Analytics & Reporting Page    | Admin                   | Interface to generate, view, and export performance reports (e.g., punctuality, passenger load).                                |
| UI_10 | System Monitoring Page        | Admin                   | A real-time view of system status, including server health and GPS data feed integrity.                                         |
| UI_11 | Driver Login Screen           | Driver                  | A simple, secure login screen for the driver\'s mobile/tablet application.                                                      |
| UI_12 | Driver Trip Dashboard         | Driver                  | The main screen for drivers, showing their daily schedule, a \"Start/End Trip\" button, and next stop information.              |
| UI_13 | Incident Reporting Screen     | Driver                  | A form-based interface for drivers to report incidents (breakdowns, accidents) with reason and optional notes.                  |
| UI_14 | Delay Reporting Screen        | Driver                  | A quick-access screen (often a modal) to report a delay, typically with pre-set reasons like \"Heavy Traffic.\"                 |
| UI_15 | Emergency Alert Screen        | Driver                  | A single, highly prominent button to trigger an immediate emergency alert to system administrators.                             |
| UI_16 | Passenger App Home (Live Map) | Passenger               | The default screen featuring an interactive map showing the user\'s location and real-time positions of buses.                  |
| UI_17 | Route Search & Results Page   | Passenger               | Interface for passengers to enter a start and destination to find available routes and see estimated arrival times.             |
| UI_18 | Feedback Submission Form      | Passenger               | A form accessible from the passenger app to submit feedback, complaints, or suggestions.                                        |
| UI_19 | Real-time Notification Panel  | Passenger               | A screen within the app to view and manage push alerts for bus arrivals, delays, and system announcements                       |
| UI_20 | System Broadcast Console      | System                  | A backend interface (used by the system/WebSocket service) to manage and push real-time alerts to all connected clients.        |
| UI_21 | Conflict Detection Log        | System / Admin          | An administrative interface that displays automatically detected scheduling conflicts or resource allocation issues for review. |
