**3.2.2 Business Rules Identification**

The Public Bus Tracking and Scheduling System is obliged to operate
under a clearly defined set of business rules that standardize data
management and how operational decisions are enforced. The following
business rules ensure consistency, accountability, and regulatory
compliance across all participating operators (Anbessa, Sheger,
Velocity), as well as the Addis Ababa Road and Transport Bureau (AARTB).

A. Bus and Driver Management Rules

1.  Each bus must be uniquely registered using a valid plate number,
    operator type, and capacity before it can be assigned to any route.

2.  A driver may only be assigned to one bus at a time, and each trip
    can only be operated by a single active driver.

3.  Driver assignments must respect licensing requirements, meaning only
    drivers with valid and verified licenses can operate buses.

4.  Buses marked as "Under Maintenance" cannot be scheduled until
    maintenance status is updated to "Operational."

5.  Driver shift changes must be logged and time-stamped to ensure
    accountability and schedule traceability.

B. Route and Scheduling Rules

6.  All routes must be approved by AARTB before being activated in the
    system.

7.  A bus cannot be scheduled on overlapping routes or times, ensuring
    no double-allocation occurs.

8.  Each route must have clearly defined stops and terminals, and these
    cannot be modified without administrative approval.

9.  Schedules must follow the valid operational hours of the assigned
    route, as defined by operator policy.

10. Any schedule change must be automatically logged, including the
    administrator who performed the modification.

C. Incident and Maintenance Rules

11. Drivers must report incidents (breakdown, accident, delay)
    immediately using the system's incident reporting feature.

12. Incident severity levels determine notification priority, with
    critical incidents triggering instant alerts to administrators.

13. A maintenance request must be created before a bus can be moved to
    "Under Repair" status.

14. Completed maintenance must be verified by a maintenance supervisor
    before the bus is returned to service.

15. Historical incident and maintenance records must remain uneditable,
    preserving data integrity.

D. Passenger Information and Service Rules

16. Passengers must be able to view schedules, routes, and static
    arrival estimates, and these must reflect the latest approved data.

17. Passenger feedback must be categorized (delay, overcrowding, safety,
    etc.) and assigned a status such as "Pending," "Reviewed," or
    "Resolved."

18. Feedback cannot be deleted, only archived or closed by authorized
    administrators.

19. Service information visible to passengers must remain consistent
    across all operators, following AARTB communication standards.

E. System Access and Control Rules

20. User authentication is required for all administrative and
    operational functions, including schedule editing and bus status
    updates.

21. Role-Based Access Control (RBAC) must be enforced, with distinct
    permission levels for drivers, passengers, operators, and AARTB
    administrators.

22. Every change or update within the system must generate an entry in
    the audit log, including date, user, and action performed.

23. Only AARTB administrators may approve or deactivate routes, while
    operators manage bus and driver assignments.

24. Drivers may only update trip progress and report incidents, not
    modify routes or schedules.

F. Reporting and Data Rules

25. Daily, weekly, and monthly reports must automatically compile data
    from the system, replacing manual reporting workflows.

26. Data used for reports must originate only from verified internal
    sources (driver logs, assignments, incident reports).

27. Reports submitted to AARTB must follow standard templates for
    performance monitoring.

28. Historical data must be retained for audit and regulatory purposes,
    following national digital governance standards.

29. Duplicate entries (bus registration, driver ID, route ID) must be
    prevented at the database level.

**3.2.3 Actor Identification**

This system relies on interactions between multiple users and other
external systems. Each actor represents a role that either initiates
actions within the system or receives services from it. The following
primary and secondary actors are identified:

1\. Administrator (System Admin / Operator Admin / AARTB Admin)

Responsibilities:

- Register buses, drivers, routes, terminals, and schedules

- Modify or approve route and schedule changes

- Monitor fleet status (On Route, Delayed, Under Maintenance)

- View, approve, or respond to incident reports submitted by drivers

- Review passenger feedback

- Generate operational reports for decision-making

- Manage user accounts and enforce role-based access control

Why they are an actor:  
They interact directly with almost all system modules and have the
highest level of control.

2\. Driver

Primary Actor

Drivers provide real-time operational inputs about bus movements and
issues.

Responsibilities:

- View assigned routes and schedules

- Update trip progress (arrived at stop, departed from stop)

- Submit incident reports (breakdowns, traffic delays, accidents)

- Update bus status (e.g., "Delayed," "Completed Trip")

- Communicate issues to administrators through the system

Why they are an actor:  
Drivers initiate key operational data that determines bus status,
schedule adherence, and incident management.

3\. Passenger

Primary Actor

Passengers are end-users who depend on the system for service
information and feedback.

Responsibilities:

- Search for routes and schedules

- View route maps and static arrival estimates

- Submit feedback or service complaints

- Check bus status (On Route, Delayed, Under Maintenance)

- Navigate terminals and stops through system-provided data

Why they are an actor:  
They consume system information and contribute feedback data that
supports service improvement.

4\. GPS System (External Actor -- Future Integration)

Secondary Actor

Although the current version of the project uses static, non-live
tracking, the system is designed to integrate with GPS modules in future
iterations.

Responsibilities:

- Provide real-time bus location data

- Update bus movement logs

- Trigger delay or deviation alerts

Why they are an actor:  
It interacts automatically with the system to update location-based
tracking functionalities (in future versions).
