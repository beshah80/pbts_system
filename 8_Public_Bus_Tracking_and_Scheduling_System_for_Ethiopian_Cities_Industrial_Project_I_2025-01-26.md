**ADDIS ABABA UNIVERSITY COLLEGE OF NATURAL**

**AND COMPUTATIONAL SCIENCES**

**SCHOOL OF INFORMATION SCIENCE**

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

Date: January 26, 2026

**EXAMINATION BOARD**

**Advisor Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Examiner Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Examiner Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

— 1 —

**ACKNOWLEDGMENT**

We extend our heartfelt gratitude to our advisor, Meseret H., for her unwavering support and dedication to our success. Her invaluable guidance, insightful feedback, and tireless efforts were pivotal in shaping this project. From assisting us in refining our ideas to providing constructive critiques on our documentation, her contributions played a crucial role in helping us overcome challenges and achieve our objectives. We deeply appreciate her patience, encouragement, and expertise, which served as a constant source of inspiration throughout the project. 

We also express our sincere appreciation to the School of Information Science, Addis Ababa University, for providing the academic environment and resources necessary to carry out this work. 

Finally, we would like to thank every member of the team for their commitment, collaboration, and hard work. We are equally grateful to our families and friends for their continuous encouragement, understanding, and patience throughout this journey. 

— 2 —

**TABLE OF CONTENT**

**EXAMINATION BOARD. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .1**

**ACKNOWLEDGMENT. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2**

**TABLE OF CONTENT. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3**

**LIST OF TABLES. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1**

**LIST OF FIGURES. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3**

**CHAPTER ONE. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .4**

**1. Introduction. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4**

1.1. Overview. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4

1.2. Background of the Organization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4

1.2.1. Addis Ababa Road & Transport Bureau \(AARTB\). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5

1.2.2. Anbessa City Bus Service Enterprise \(ACBSE\). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .5

1.2.3. Sheger Mass Transit Enterprise \(SMTE\). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6

1.2.4 Private Bus Operators \( Velocity Bus\) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6

1.3. Statement of the Problem. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

1.3.1. Passenger Challenges . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

1.3.2. Driver and Supervisor Challenges . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

1.3.3. Administrative Challenges . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

1.3.4. City-Level Challenges. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8

1.4. Objectives of the Project. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8

1.4.1. General Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .8

1.4.2. Specific Objectives of the Project. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8

**1.5. Feasibility Study . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9**

1.5.1. Technical Feasibility. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .9

1.5.2. Economic Feasibility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10

1.5.3. Operational Feasibility. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13

**1.6. Significance of the Project. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13**

**1.7. Beneficiaries of the Project. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14**

**1.8. Methodology. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .15**

1.8.1. Data Sources and Collection Methods. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15

1.8.2. System Development Methodology. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16

**1.9. Development Tools and Technologies. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17**

1.9.1. Frontend Technologies. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17

1.9.2. Backend Technologies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17

1.9.3. Database Technologies. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .17

1.9.4. Documentation & Modeling Tools. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .18

1.9.5. Deployment Environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .18

— 3 —

1.9.6. Development Environment / IDE. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .18

**1.10. Scope of the Project. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18**

**1.11. Risks, Assumptions, and Constraints. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20**

**1.12. Phases and Deliverable. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21**

**1.13. Work Breakdown Structure \(WBS\). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22**

**1.14. Project Schedule. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23**

**CHAPTER TWO . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23**

**2. Business Area Analysis and Requirement Definition. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23**

2.1. Overview. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23

2.2. Business area analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24

2.2.1. Activities / functions of the organization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24

2.2.2. Problems of the current system\(Using the PIECES Framework\) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .26

2.2.3. Forms and Reports of the Existing System . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29

2.2.4. Players of the Existing System . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 38

2.3. Requirements Definition. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40

2.3.1. Functional Requirements. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40

2.3.2. Non-Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42

**CHAPTER THREE. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43**

**3. Object Oriented Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .43**

3.1. Overview. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43

3.2. Use Case Modeling . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43

3.2.1. UI Identification. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44

3.2.2. Business Rules Identification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 46

3.2.3. Actor Identification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .48

3.2.4. Designing the Use Case Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .50

3.2.5. Use Case Description. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 52

**3.3. Conceptual Modeling. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 66**

**3.4. Sequence diagramming . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 84**

**3.5. User Interface Prototyping. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 92**

**CHAPTER FOUR. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98**

**4. Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98**

**REFERENCES. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100**

**APPENDICES. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .101**

Appendix A: List of Acronyms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 101

Appendix B: Glossary of Terms. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .102

Appendix C: Questionnaire and Interview Questions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 104

— 4 —

**LIST OF TABLES**

Table 1 One-Time Costs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10

Table 2 Recurring Costs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11

Table 3 Benefit- Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11

Table 4 Feasibility Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .13

Table 5 Tools and Features. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18

Table 6 Scope Boundaries \(In-Scope vs Out-of-Scope\). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19

Table 7 – Risk Matrix \(Likelihood vs Impact\). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20

Table 8 : Summary of PIECES Analysis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .28

Table 9 User Interface of our system . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44

Table 10 Actors of the System . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49

Table 11 Use Case: System Login. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .52

Table 12 Use Case: Bus Registration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 54

Table 13 Use Case: Driver Management. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .54

Table 14 Use Case: Route Creating . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .55

Table 15 Use Case: Route Modification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .56

Table 16 Use Case: Schedule Creation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 56

Table 17 Use Case: Schedule Modification. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57

Table 18 Use Case: Feedback Management . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57

Table 19 Use Case: Incident Resolution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 58

Table 20 Use Case: Analytics Reports. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 58

Table 21 Use Case: performance Monitoring . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 60

Table 22 Use Case: View Daily Schedule . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61

Table 23 Use Case: Start Trip. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61

Table 24 Use Case: Real-Time Stop Updates. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 62

Table 25 Use Case: End Trip . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .63

Table 26 Use Case: Incident Reporting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .63

Table 27 Delay Reporting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 64

Table 28 Emergency Alert. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .64

Table 29 Search Routes & ETA. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65

Table 30 Submit Feedback. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65

Table 31 View Real-Time Bus Location . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .65

Table 32 Web Socket Broadcast. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65

Table 33 Automated Conflict Detection. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 66

Table 34 : User Class \(Abstract Base Class\) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 68

Table 35 : Administrator Class . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 69

— 1 —

Table 36 : Driver Class . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 70

Table 37 : Passenger Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 71

Table 38 : Bus Class . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 72

Table 39 : Route Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .73

Table 40 : RouteStop Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 75

Table 41 : bus stop class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 76

Table 42 : Terminal Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 77

Table 43 : Schedule Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 78

Table 44 : Trip Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 79

Table 45 : Incident Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 80

Table 46 : Feedback Class. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .82

— 2 —

**LIST OF FIGURES**

Figure 1 Organizational Structure of Addis Ababa Transport System. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .6

Figure 2 WBS Tree \(hierarchical representation of project tasks and sub-tasks\). . . . . . . . . . . . . . . . . . . . . . . . . .22

Figure 3 Gantt Chart. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .23

Figure 4 Trip Search Form Interface \(Guzo System\) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31

Figure 5 : Trip Search Result Display Interface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .32

Figure 6 : Admin Login Form. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 33

Figure 7 : User Registration Form. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 34

Figure 8 : Route Search and Map Display Interface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .36

Figure 9 : All Routes Listing Interface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .37

Figure 10 : Route Visualization and Stops Display Interface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 37

Figure 11 : Use Case Diagram for Public Bus Scheduling and Tracking System. . . . . . . . . . . . . . . . . . . . . . . . .51

Figure 12 : Class Diagram for Public Bus Scheduling and Tracking System . . . . . . . . . . . . . . . . . . . . . . . . . . . .67

Figure 13 : Sequence Diagram - Administrator Authentication . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 84

Figure 14 : Sequence Diagram - Bus Registration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 85

Figure 15 : Sequence Diagram - Route Creation with Stops. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .86

Figure 16 : Sequence Diagram - Real-Time Stop Update. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .89

Figure 17 : Sequence Diagram - Incident Reporting by Driver . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 89

Figure 18 : Sequence Diagram - Passenger Feedback Submission . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .90

Figure 19 : Sequence Diagram - Route Search by Passenger. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 91

Figure 20 : Sequence Diagram - Analytics Report Generation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .92

Figure 21 . Home page- for passenger . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .93

Figure 22 . feedback page - for passenge . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 93

Figure 25 . Driver Login - for driver . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 94

Figure 27 . Incident report page - for driver. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .95

Figure 28 admin login - for admin . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 96

Figure 29 . admin dashboard - for admin . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 97

Figure 30 . bus management - for admin . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98

Figure 31 . driver management - for admin. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98

— 3 —

**CHAPTER ONE**

**1. Introduction**

**1.1. Overview**

Urban transport is the backbone of Ethiopia’s rapidly growing cities. As Addis Ababa’s population exceeds five million, efficient and reliable public transportation has become essential for daily mobility. Public buses operated by the Anbessa City Bus Service Enterprise \(ACBSE\), Sheger Mass Transit, and various private associations serve as the primary mode of transport for most residents. However, these services face persistent operational and communication challenges that hinder effectiveness and passenger satisfaction. 

Major issues include unreliable schedules, overcrowding, lack of real-time information, and limited incident reporting mechanisms. Passengers often experience long waiting times, uncertainty about bus arrivals, and poor service coordination. At the same time, transport authorities and associations struggle with inefficient route management, data inaccuracy, and limited visibility into daily operations. 

To address these issues, the proposed Public Bus Tracking and Scheduling System for Ethiopian Cities aims to create a web-based platform that improves coordination between transport administrators, drivers, and passengers. The system’s goal is to modernize public transport management by providing accurate scheduling, route updates, and accessible passenger information through a unified platform. 

This chapter introduces the project by presenting the background of the transport sector, the problems identified in the current system, and the objectives of the proposed solution. It also outlines the project’s significance, key beneficiaries, scope, methodology, feasibility, potential risks, and development schedule. The ultimate goal is to demonstrate how digital solutions can enhance efficiency, transparency, and user experience in Ethiopia’s urban public transport systems. 

**1.2. Background of the Organization**

Efficient public transportation in Ethiopian cities, especially in Addis Ababa, is crucial for mobility, economic growth, and reducing congestion. However, the system still relies heavily on

— 4 —

manual operations for bus tracking, scheduling, and reporting. Understanding how the main transport institutions currently function and the digital limitations they face helps identify where a Public Bus Tracking and Scheduling System can make the greatest impact. 

This section examines the main actors in Addis Ababa’s public transport system: the Addis Ababa Road and Transport Bureau \(AARTB\), Anbessa City Bus Service Enterprise \(ACBSE\), Sheger Mass Transit Enterprise \(SMTE\), and private operators such as Velocity Bus. Each plays a role in managing or operating city buses, yet all share similar challenges related to data management, system integration, and service monitoring. 

**1.2.1. Addis Ababa Road & Transport Bureau \(AARTB\)**

The Addis Ababa Road and Transport Bureau \(AARTB\) is the city’s regulatory and administrative authority responsible for managing transport operations and setting urban mobility policies, including licensing bus operators, approving routes, and enforcing safety and performance standards; although the Bureau uses both manual processes and computer-based systems, these digital tools are mostly local, isolated, and limited in functionality, focusing mainly on permit management and fleet registration, while monitoring still depends heavily on field inspections and reports from bus enterprises, leading to fragmented data across operators such as Anbessa, Sheger, and private buses, slow data collection and reporting, lack of real-time visibility into bus movements and schedule adherence, and delays in effective monitoring and decision-making. 

**1.2.2. Anbessa City Bus Service Enterprise \(ACBSE\)**

Founded in 1945, Anbessa is the oldest and largest government-owned bus operator in Ethiopia, serving over 1.5 million passengers daily with a fleet of more than 600 buses operating on more than 125 routes across Addis Ababa; although the company has partially digitized fare collection and fleet maintenance logs, bus tracking and scheduling remain largely manual, and while a limited GPS trial was introduced on a small number of buses around 2018 in collaboration with the Ministry of Innovation and Technology, it was not expanded city-wide due to technical and financial constraints, resulting in challenges such as fixed route scheduling that does not adapt to changing passenger demand, manual incident reporting through phone calls or written reports, frequent service disruptions caused by an aging fleet with regular mechanical failures, and the

— 5 —



absence of real-time passenger information, which forces passengers to wait at terminals without knowing actual bus arrival times. 

**1.2.3. Sheger Mass Transit Enterprise \(SMTE\)**

The Sheger Mass Transit Enterprise, launched in 2020, was established to modernize public transportation and complement Anbessa by serving high-demand routes using new diesel and electric buses; although Sheger introduced a small-scale GPS tracking pilot in 2023 to monitor a limited number of buses, the collected data is not integrated with platforms used by the Addis Ababa Road and Transport Bureau or Anbessa, which restricts inter-agency coordination, and as a result the enterprise faces challenges including a limited fleet size compared to growing passenger demand, non-integrated scheduling with no shared system across public and private operators, and continued reliance on manual data reporting where schedule and performance reports are compiled daily or weekly, preventing real-time operational adjustments. 

**1.2.4 Private Bus Operators \( Velocity Bus\)**

Private operators, including Velocity Bus under the Belayneh Kindie Group, play a significant role in public mobility in Addis Ababa, and in 2024 Velocity introduced more than 100 Golden Dragon electric buses, making it the largest electric bus fleet in East Africa; although the company uses basic GPS-based fleet management systems for maintenance and internal route monitoring, it operates independently without data integration or scheduling coordination with government operators, leading to challenges such as the absence of a shared data platform between public and private systems, insufficient charging infrastructure that causes operational delays, and the lack of a centralized passenger information system. 

Figure 1Organizational Structure of Addis Ababa Transport System

— 6 —

**1.3. Statement of the Problem**

The public bus system in Addis Ababa faces multiple operational, informational, and systemic challenges that affect passengers, drivers, administrators, and the city as a whole. Despite serving millions of daily commuters, the current transport network struggles with inefficiencies that reduce service reliability, passenger satisfaction, and overall urban mobility. These challenges can be grouped according to the primary stakeholders involved. 

**1.3.1. Passenger Challenges**

Passengers frequently experience uncertainty and inconvenience due to the following issues:

 **Unpredictable arrivals: **Buses often arrive irregularly, causing passengers to wait more than 30 and 60 minutes without reliable information. 

 **Overcrowding: **During peak hours \(7–9 AM and 5–7 PM\), buses become overloaded, leaving many commuters unable to board. 

 **Lack of information: **There is no centralized platform providing accurate details on routes, schedules, or delays. 

 **Lack of a feedback system: **Passengers are unable to formally submit complaints, report service quality issues, or provide suggestions for improvement. 

**1.3.2. Driver and Supervisor Challenges**

Bus operators and supervisors also face obstacles that limit operational efficiency:

 **Manual incident reporting: **Drivers rely on phone calls or paper logs to report delays, accidents, or mechanical issues, delaying corrective actions. 

 **No digital tools: **Mobile-friendly dashboards or platforms for updating stop information are not available to drivers. 

 **Accountability gaps: **Supervisors have limited ability to verify whether buses are adhering to schedules or planned routes. 

**1.3.3. Administrative Challenges**

At the organizational level, bus associations and regulatory authorities encounter the following problems:

— 7 —

 **Fragmented data: **Information on buses, routes, and schedules is stored in separate, disconnected systems. 

 **Fixed allocation of buses: **Operators such as ACBSE assign a constant number of buses per route without considering daily demand variations. 

 **Lack of analytic: **Authorities cannot access real-time data to optimize routes, predict delays, or respond efficiently to incidents. 

 **Limited oversight: **The Bureau cannot monitor the performance of different operators or track service quality in real time. 

**1.3.4. City-Level Challenges**

The inefficiencies of the public bus system have broader implications for the city:

 **Traffic congestion: **Poorly coordinated scheduling contributes to urban traffic jams. 

 **Economic cost: **Delays and inefficiencies reduce productivity and increase fuel consumption. 

 **Public dissatisfaction: **Weak transport services undermine public trust in city infrastructure and government-managed systems. 

**1.4. Objectives of the Project**

**1.4.1. General Objective**

The general objective of this project is to design and implement a web-based Public Bus Tracking and Scheduling System for Addis Ababa. The system aims to enable transport authorities and bus associations to efficiently manage buses, routes, and schedules, while providing passengers with accurate and timely travel information, 

**1.4.2. Specific Objectives of the Project**

 To provide a digital platform for registering buses and drivers, including details such as plate numbers, capacity, and driver information \(name, license, contact\). 

 To replace fragmented paper-based records with a centralized database, ensuring accuracy, accessibility, and ease of management. 

 To enable administrators to define and manage bus routes, including start points, end points, and intermediate stops. 

— 8 —

 To automate schedule creation with conflict detection to prevent overlapping assignments and improve service reliability. 

 To offer drivers a mobile-friendly interface for viewing assigned routes and schedules, allowing them to update their current stop and report incidents \(traffic delays, breakdowns, blockages\). 

 To facilitate timely communication between drivers and supervisors to enhance operational efficiency. 

 To enable passengers to search for and view routes, schedules, and estimated arrival times while providing a map visualization of bus routes and stops for easier navigation. 

 To create a feedback system for passengers to submit complaints or suggestions, thereby improving service quality and accountability. 

 To provide administrators with real-time dashboards displaying active buses, unreported buses, and delays, along with generating summary reports for planning and performance evaluation. 

 To design the system for scalability, allowing adaptation to other Ethiopian cities \(e.g., Dire Dawa, Mekelle, Hawassa\) with customizable routes, fleet sizes, and reporting tools. 

**1.5. Feasibility Study**

A feasibility study evaluates whether the proposed system is practical, achievable, and sustainable. 

It examines technical, economic, operational, schedule, and legal/ethical dimensions to ensure the project can be successfully implemented. 

**1.5.1. Technical Feasibility**

The proposed Public Bus Tracking and Scheduling System is technically feasible given the available infrastructure, devices, and development environment. 

 **Infrastructure: **Ethiopia’s internet penetration is improving, with 4G coverage widely available in Addis Ababa and expanding 5G pilot projects. 

 **Devices: **Most drivers and supervisors own smartphones capable of running lightweight web applications, facilitating system adoption. 

 **Development Environment**

 **IDE: **Visual Studio Code \(latest version\)

— 9 —

 **Languages & Frameworks: **Next.js, Node.js, TypeScript, MongoDB

 **Hardware: **Development PC with Windows 11 Pro, 11th generation CPU, 16 GB

RAM, 500 GB storage \(360\+ GB free\), 64-bit architecture

 **Software Tools: **Docker for containerized deployment, Vercel for frontend hosting, Render for backend hosting

 **Mapping: **Google Maps API \(static visualization\) provides cost-effective route display without requiring expensive GPS tracking. 

**1.5.2. Economic Feasibility**

Economic feasibility is a critical aspect of project evaluation, focusing on assessing the financial viability of the proposed Public Bus Tracking and Scheduling System for Ethiopian Cities. It involves a detailed analysis of both the expected costs and the anticipated benefits to determine whether the project is economically worthwhile. This evaluation helps stakeholders such as transport authorities, bus operators, and system administrators decide whether the financial investment aligns with the expected operational and social returns. 

The economic feasibility study aims to ensure that the benefits of implementing the system such as reduced waiting times, improved scheduling efficiency, better resource utilization, and enhanced passenger satisfaction justify the costs incurred during development and operation. Both tangible and intangible benefits are considered to provide a comprehensive understanding of the project’s overall economic value. 

**A. **

**One Time Costs**

Table 1 One-Time Costs

**Cost Category**

**Description**

**Estimated Costs \(ETB\)**

**Hardware Costs**

Development Computers

Laptops/desktops for

120,000

development with intel core

i5 or higher, 16GB RAM

Backup and Storage Devices

External hard drives or cloud- 15,000

based storage for data backup

— 10 —

Uninterruptible power supply Power backup for

15,000

\(UPS\)

uninterrupted development

activities. 

**Software development costs**

Security Implementation

Authentication services, JWT 25,000

setup, data encryption

**Training and Awareness**

Administrator & Driver

Orientation and training

20,000

Training

sessions on system usage

**Total One-Time Costs = 190,000 ETB**

B. 

**Recurring Costs \(Annual\)**

Table 2 Recurring Costs

**Cost Category**

**Description**

**Estimated Annual Cost**

**\(ETB\)**

Hosting Costs

Cloud hosting \(Vercel, 

8,000

Render, database services\)

System Maintenance & 

Bug Fixes, updates, 

5,000

Monitoring

performance monitoring

Awareness & Promotion

Informational campaigns for 6,000

drivers and passengers

Miscellaneous

& Unexpected operational

6,000

Contingency

expenses

Mapping & API Services

Google Maps API

25,000

**Total Recurring Costs \(per year\) = 50,000 ETB**

**C. Benefits Analysis**

Table 3 Benefit- Analysis

**Benefit Category**

**Estimated Benefits \(ETB\)**

— 11 —

**Tangible Benefits**

Improved Operational Efficiency

140,000

Reduced Fuel & Operational Costs

90,000

Better Resource Allocation

70,000

**Total Tangible Benefits**

**300,000**

**Intangible Benefits**

Improved Passenger Satisfaction

Not easily quantifiable

Reduced Passenger Waiting Time

Not easily quantifiable

Improved Urban Mobility Planning

Not easily quantifiable

Increased Public Trust in Transport Services

Not easily quantifiable

**Tangible Benefits**

 **Improved Operational Efficiency: **Automating route management, scheduling, and incident reporting significantly reduces administrative workload and human errors. Real-time dashboards allow administrators to identify delays and unreported buses quickly, enabling faster corrective actions. This leads to improved punctuality and smoother daily operations, resulting in measurable efficiency gain**s. **

 **Reduced Fuel and Operational Costs: **Optimized scheduling and better route planning reduce unnecessary idling and inefficient fleet deployment. By minimizing redundant trips and improving bus allocation, fuel consumption and maintenance-related expenses are reduced. For example, avoiding over-servicing low-demand routes helps operators save fuel and vehicle wear costs. 

 **Better Resource Allocation: **Analytics and performance reports generated by the system enable transport authorities to allocate buses and drivers based on actual demand patterns. 

High-traffic routes receive adequate resources, while underutilized routes are adjusted accordingly. This data-driven allocation reduces congestion, improves service reliability, and lowers operational waste. 

The total one-time investment of approximately 215,000 ETB, combined with an annual recurring cost of about 25,000 ETB, is economically justified by the estimated tangible benefits of 300,000

ETB per year. When intangible benefits such as passenger satisfaction, reduced waiting time, improved service reliability, and enhanced city-level mobility planning are considered, the overall return on investment becomes significantly higher. 

— 12 —

Therefore, the Public Bus Tracking and Scheduling System is economically feasible, offering a strong benefit-to-cost ratio and sustainable long-term value for Ethiopian urban transport systems. 

**1.5.3. Operational Feasibility**

The project is operationally feasible, as administrators currently rely on manual scheduling, and digital dashboards will enhance their efficiency and monitoring capabilities. Increasing smartphone adoption among passengers allows them to access dashboards easily, and public kiosks or web interfaces can further support access. Overall, minimal training and awareness campaigns will be needed to ensure successful implementation. 

Table 4 Feasibility Summary

**Dimension**

**Findings**

**Conclusion**

Technical

Internet coverage, smartphones, cloud hosting available

Feasible

Economic

Low cost, high benefits

Feasible

Operational

Drivers, administrators, and passengers can adapt with Feasible

training

**1.6. Significance of the Project**

The Public Bus Tracking and Scheduling System holds significant value for multiple stakeholders, including passengers, drivers, administrators, the city, and the project developers \(Us\) themselves: 1\) **For Passengers:**

 Reduced uncertainty and waiting times. 

 Access to accurate route and schedule information. 

 Ability to provide feedback and report service issues. 

2\) **For Drivers:**

 Easier and faster incident reporting through digital dashboards. 

 Clearer schedules and route assignments. 

 Reduced unjust blame for delays, improving work accountability. 

3\) **For Administrators**

— 13 —

 Centralized management of buses, routes, and schedules. 

 Real-time monitoring of bus operations for improved oversight. 

 Analytic and reports to support effective planning and decision-making. 

4\) **For the City:**

 Improved efficiency of urban transport, reducing traffic congestion. 

 Supports sustainable mobility and environmental goals. 

 Aligns with Ethiopia’s national digital transformation and smart city strategies. 

5\) **For the Project Developers \(Students / Us\):**

 Gain practical experience in web development, database management, and dashboard design. 

 Hands-on exposure to modern technologies

 Develop skills in project management, problem solving, and research methodology. 

 Contribute to a real-world solution with social and economic impact, enhancing academic and professional growth. 

**1.7. Beneficiaries of the Project**

The project directly and indirectly benefits a wide range of stakeholders:

 **Addis Ababa Road & Transport Bureau \(AARTB\): **Improved oversight, centralized monitoring, and enhanced planning capabilities. 

 **Public Bus Service Enterprise: **Better scheduling, incident management, and fleet utilization. 

 **Drivers and Supervisors: **Simplified reporting, clearer assignments, and enhanced accountability. 

 **Passengers: **Access to accurate route and schedule information, reduced waiting times, and the ability to submit feedback. 

 **Students and Researchers: **Reference for future projects in transport digitization, smart cities, and public service systems. 

 **Project Developers \(Us / Students\): **Acquisition of technical skills, practical experience, and contribution to a meaningful real-world system that can improve urban mobility. 

— 14 —

**1.8. Methodology**

This project employs a mixed-methods approach for data collection and adopts an Agile \(Scrum\) methodology for system development. The combination ensures that the proposed Public Bus Tracking and Scheduling System is grounded in accurate, real-world insights from Addis Ababa’s transport sector and developed iteratively with stakeholder feedback to ensure practical usability. 

**1.8.1. Data Sources and Collection Methods**

To gather comprehensive and reliable information, data were obtained from both **primary **and **secondary **sources. The primary sources provided firsthand data from key stakeholders, while the secondary sources offered additional background and comparative information from existing studies, reports, and digital platforms. 

**1.8.1.1. Primary Data Sources**

Primary data were collected directly from the following groups and institutions:

 **Public Bus Enterprise: **Officials were interviewed to understand the operational structure, data management practices, and the manual and semi-digital systems currently in use for bus regulation and reporting. 

 **Bus Drivers: **Provided practical insights into daily operations, route management, schedule adherence, and incident reporting processes. 

 **Passengers: **Shared experiences related to waiting times, route reliability, information access, and overall satisfaction with the city’s public transport system. 

**Primary Data Collection Methods**

**Interviews**

 Conducted with Velocity bus officials, bus drivers, and passengers. 

 Questions focused on challenges in current scheduling and tracking methods, communication issues, and expectations for a digital solution. 

**Observation**

 Observations were carried out at key bus terminals such as **Meskel Square**, **Mexico** **Square**, **Megenagna**, and **Piyassa**. 

— 15 —

 Focus areas included queue length, bus arrival intervals, passenger flow, and information dissemination methods. 

**1.8.1.2. Secondary Data Sources**

Secondary data were obtained from previously published materials, online platforms, and institutional documents to supplement the primary findings. These helped provide background information on the transport sector, related technologies, and existing projects. 

 Websites and Online Tools: Platforms such as AddisMapTransit and Google Maps Transit were reviewed for route data and mapping features. 

 Research and Reports: Studies from the World Bank, Ministry of Transport, and prior academic research on intelligent transport systems in Ethiopia were analyzed. 

 Public Bus Enterprises: Information was gathered from official documents, reports, news articles, and company websites on Anbessa, Sheger, and Velocity Bus operations and initiatives. 

**Secondary Data Collection Methods**

**Document Review**

 Involved examining policy papers, operator schedules, operational manuals, and reports from relevant institutions. 

 Included reviewing templates such as driver logs, route plans, and incident reporting forms. 

**Web and Literature Review**

 Analysis of online transport platforms, prior university projects, and international best practices in bus tracking and scheduling systems. 

**1.8.2. System Development Methodology**

The **Agile \(Scrum\) **methodology was adopted for system development to allow flexibility, iterative progress, and consistent feedback from stakeholders throughout the process. 

**Key Features of the Agile Approach:**

— 16 —

 **Sprints: **Development was organized into 2–3 week cycles, each focusing on core components such as bus registration, route management, and passenger dashboards. 

 **Deliverables: **Each sprint produced a functional prototype that could be tested and refined. 

 **Feedback Loops: **Regular review meetings with stakeholders \(including AARTB

representatives\) guided revisions and improvements. 

 **Adaptability: **Requirements and features were updated based on feedback, testing results, and evolving project needs to ensure that the final system met practical and operational expectations. 

**1.9. Development Tools and Technologies**

This section outlines the technologies, tools, and environment used for the development of the Public Bus Tracking and Scheduling System. These tools support efficient development, testing, deployment, and documentation. 

**1.9.1. Frontend Technologies**

 **Next.js \(App Router\): **Implements server-side rendering for fast load times and improved SEO. 

 **Typescript: **Ensures type safety across front-end and back-end code, reducing runtime errors. 

 **Tailwind CSS: **Provides utility-first styling for responsive, accessible, and consistent UI design. 

**1.9.2. Backend Technologies**

 **Node.js \+ Express: **Lightweight and scalable back-end framework for handling requests efficiently. 

 **JWT Authentication: **Provides secure login for administrators and drivers. 

**1.9.3. Database Technologies**

 **Supabase \+ Prisma: **database with type-safe queries and schema management for structured data storage. 

— 17 —

**1.9.4. Documentation & Modeling Tools**

 **UML Diagrams: **Use case, sequence, and class diagrams to model system design. 

 **Lucidchart / Draw.io: **Visual modeling and diagram creation for clear system representation. 

**1.9.5. Deployment Environment**

 **Vercel: **Front-end hosting with automatic builds and deployment. 

 **Render: **Back-end hosting with support for Node.js applications. 

 **CI/CD Tools: **Automates testing and deployment for efficient project delivery. 

**1.9.6. Development Environment / IDE**

 **IDE: **Visual Studio Code \(latest version\) for coding, debugging, and version control. 

 **Operating System: **Windows 11 Pro, 64-bit. 

 **Hardware: **11th generation CPU, 16 GB RAM, 500 GB storage \(360\+ GB free\). 

 **Additional Tools: **Git for version control, Postman for API testing. 

**Rationale: **This setup ensures that the development, testing, and deployment of the system can be performed efficiently without hardware or software limitations. 

Table 5 Tools and Features

**Category**

**Technology / Tool**

**Features / Advantages**

Frontend

Next.js,Typescript, Tailwind SEO friendly, type safety, responsive and accessible CSS

UI

Backend

Node.js, JWT

Scalable, efficient data fetching, secure authentication

Database

MongoDB \+ Prisma

Type-safe queries, schema management, flexible

storage

Documentatio UML,Lucidchart/Draw.io

Clear visual diagrams,API documentation, system

n/Modeling

modeling

Vercel,Render,Docker,CI/D

Cloud-ready, containerized, automated testing and

Deployment

deployment

Development VSCode, Windows11 Pro, Sufficient IDE and hardware setup for development Environment

16GB RAM, 500 GB storage and testing

**1.10. Scope of the Project**

— 18 —

The scope defines the boundaries of the Public Bus Tracking and Scheduling System by clearly identifying what is included \(in-scope\) and what is excluded \(out-of-scope\) in the current development phase. 

**In-Scope**

The system will cover the following functionalities:

 Admin CRUD operations for buses, routes, and schedules. 

 Automated schedule conflict detection to prevent overlapping assignments. 

 Driver dashboard for updating current stops and reporting incidents. 

 Passenger dashboard for viewing routes, schedules, and feedback submission. 

 Static map visualization of routes and stops. 

 Feedback system for passengers to report complaints or suggestions. 

 Analytic dashboard for administrators to monitor bus activity, delays, and unreported buses. 

 Inclusion of government-owned \(Anbessa, Sheger\) and private buses \(Velocity\) for route and schedule management. 

**Out-of-Scope**

The following features are not included in the current project version:

 Other bus operators are not included in this version of the project. 

 Ticketing/payment integration

Table 6 Scope Boundaries \(In-Scope vs Out-of-Scope\)

**Category**

**In-Scope**

**Out-of-Scope**

Functionality

Admin CRUD \(buses, routes, schedules\)

Ticketing/payment

integration

Scheduling

Schedule conflict detection

Other

private

or

government operators

Driver Features

Stop updates & incident reporting

Passenger

Route/schedule views, static map visualization, 

feedback system

— 19 —

Analytic

Admin dashboard for monitoring buses, delays, 

and unreported activities

Operators Covered Only government buses \(Anbessa, Sheger\) and

private buses \(Velocity\)

**1.11. Risks, Assumptions, and Constraints**

This section identifies potential challenges, underlying assumptions, and constraints affecting the development and deployment of the Public Bus Tracking and Scheduling System. 

**Risks**

 **Low driver adoption: **Drivers may be reluctant to adopt digital dashboards. 

 **Mobile data costs: **Continuous internet access may incur costs for drivers. 

 **Inconsistent route naming: **Variations in route names could cause confusion. 

 **Resistance to digital change: **Stakeholders may prefer traditional methods over digital systems. 

**Assumptions**. 

 The Addis Ababa Road & Transport Bureau supports the pilot implementation. 

 Internet access is available at key bus terminals. 

**Constraints**

 **Infrastructure Limitations: **Power outages and inconsistent mobile network coverage at terminals and along routes. 

 **Fleet and Hardware Limitations: **Only some buses have GPS devices; older buses may not support system hardware. 

**Data and Integration Constraints: **Existing systems are fragmented and may not integrate easily. 

Table 7 – Risk Matrix \(Likelihood vs Impact\)

**Risk**

**Likelihood Impact**

**Mitigation**

Medium

High

Training, awareness, and user-friendly interface

Low driver adoption

design

Mobile data costs

Medium

Medium Optimize app for low data usage, offline support

— 20 —

Inconsistent

route High

Medium Standardize route naming conventions in

naming

database

Resistance to digital Medium

High

Regular stakeholder engagement and

change

demonstrations

**1.12. Phases and Deliverable**

The project will follow a structured, phase-based development approach, ensuring that all tasks are completed systematically and documentation is maintained at each stage. 

**Phase 1 – Discovery: **Conduct interviews with AARTB officials, bus drivers, and passengers to gather firsthand insights. Observe operations at major bus terminals and compile findings to finalize the problem statement. 

**Phase 2 – Design: **Develop UML diagrams to model system workflows, create the database schema for efficient data management, and design wire-frames for Admin, Driver, and Passenger dashboards. 

**Phase 3 – Implementation: **Build the core system modules, including Admin functionalities for managing buses, routes, and schedules, Driver dashboard for updating stops and reporting incidents, and Passenger dashboard for accessing route and schedule information. 

**Phase 4 – Testing: **Conduct unit testing of individual components, integration testing to ensure modules work together, and usability testing to validate the system from the perspective of end-users. 

**Phase 5 – Deployment: **Deploy the system on a cloud platform for pilot use, allowing administrators, drivers, and passengers to interact with the system in a real operational environment. 

**Phase 6 – Evaluation: **Review system performance, analyze collected analytics, gather stakeholder feedback, and make final adjustments to improve usability and efficiency before project completion. 

**Deliverables:**

 Project documentation and reports

— 21 —



 UML diagrams and wire-frames

 MVP system \(Admin, Driver, and Passenger dashboards\)

 Pilot deployment and feedback report

**1.13. Work Breakdown Structure \(WBS\)**

The Work Breakdown Structure \(WBS\) organizes the project into manageable components, ensuring that all tasks are properly allocated and tracked. The main components of the system development are:

Figure 2 WBS Tree \(hierarchical representation of project tasks and sub-tasks\). 

— 22 —



**1.14. Project Schedule**

The project will follow a structured timeline to ensure timely completion and milestone tracking. 

Figure 3 Gantt Chart

**CHAPTER TWO**

**2. Business Area Analysis and Requirement Definition**

**2.1. Overview**

This chapter looks into the current operations of Addis Ababa's public bus transport system and identifies specific requirements for the proposed tracking and scheduling platform. The analysis focuses on understanding how transport authorities, bus operators, drivers, and passengers currently interact within the existing system while documenting the actual workflows, communication patterns, and administrative processes that describe daily operations. 

The chapter begins with a business area analysis that lists out the main activities performed by different stakeholders in the transport network. Then it evaluates the limitations of current

— 23 —

practices using the PIECES framework, which provides a structured way to assess performance, information flow, economic efficiency, control mechanisms, operational effectiveness, and service quality issues. Following this, the chapter documents the existing forms, reports, and paper-based tools that administrators and drivers use for record-keeping and communication. 

Lastly, it identifies all essential players in the system and their specific roles, responsibilities, and challenges. 

By analyzing these aspects, this chapter provides a clear understanding of what needs to change and why. This directly informs the functional and non-functional requirements that will guide system design and development in the following chapters. 

**2.2. Business area analysis**

The business area analysis maps the current operational structure of the public bus ecosystem in Addis Ababa. It identifies key stakeholders and their interdependent functions, covering regulatory oversight, operational execution, and end-user interaction. Analyzing these existing activities is crucial for identifying pain points and defining the requirements for a new, more efficient system design. 

**2.2.1. Activities / functions of the organization**

The public bus ecosystem in Addis Ababa is formed by multiple institutions with distinct but related responsibilities:

**A. Regulatory and Administrative Bodies**

**I. Addis Ababa Road & Transport Bureau — AARTB**

The Addis Ababa Road and Transport Bureau is responsible for several key functions in managing urban bus services. This includes route planning and approval, where routes are determined based on population distribution and traffic patterns and then assigned to different operators. The Bureau also handles licensing and registration, processing applications for new bus operators, issuing operating permits, and maintaining records of all licensed vehicles and drivers. 

Performance monitoring is conducted through periodic inspections at terminals and along routes to ensure operators adhere to approved schedules and maintain service standards. Additionally, the Bureau is involved in policy development, creating regulations for fare structures, safety requirements, and service quality benchmarks that all operators must follow. Finally, it undertakes

— 24 —

data compilation, collecting monthly and quarterly reports from operators regarding fleet performance, passenger volumes, and operational challenges. 

**B. Bus Operating Enterprises and Associations**

**I. Anbessa City Bus Service Enterprise \(ACBSE\)**

As the largest government-owned operator, Anbessa manages a fleet of over 400 buses serving more than 100 routes. Its daily operations include fleet management, where buses are assigned to specific routes each morning based on availability and maintenance schedules, and driver scheduling, which ensures that shift rotations provide adequate coverage throughout operating hours. The company also handles maintenance coordination, tracking bus conditions, scheduling repairs, and managing spare parts inventory. Fare collection is performed manually, with conductors recording daily ticket sales and cash collected. Incident documentation involves receiving phone calls or written reports from drivers regarding accidents, breakdowns, or major delays, which are then logged in paper registers. Additionally, terminal supervision is carried out by supervisors stationed at major terminals to manage bus departures, address passenger complaints, and coordinate with drivers. 

**II. Sheger Mass Transit Enterprise \(SMTE\)**

Launched in 2020, Sheger Mass Transit Enterprise focuses on high-capacity routes using newer vehicles. Its operations are similar to those of Anbessa but on a smaller scale. This includes route operations, managing assigned routes primarily along major corridors, and limited digital monitoring, where a small GPS pilot program is used on select vehicles, although the collected data is not shared with other operators or the Bureau. Sheger also handles performance reporting, submitting weekly summaries to the Addis Ababa Road and Transport Bureau regarding service delivery and any operational disruptions. 

**III. Private Operators \(Velocity Bus \)**

Private operators such as Velocity Bus provide additional capacity, especially on routes where government fleets cannot meet demand. Their operations include independent scheduling, creating timetables without formal coordination with government operators, and basic fleet tracking, using simple GPS devices mainly for internal security and maintenance rather than for passenger information. They also manage fare collection independently, operating under Bureau-approved fare structures while handling revenue on their own. 

**C. Bus Drivers**

● Follow assigned schedules and routes

— 25 —

● Handles boarding, manage crowding, and responding to passenger questions about routes and destinations

● Manual Reporting: Calling supervisors via personal phones when problems occur, such as mechanical breakdowns or severe traffic delays and even

● Cash Handling: Conductors collect fares and reconcile cash at the end of each shift, submitting totals to supervisors. 

**D. Passengers**

● Passengers are the end users whose daily activities shape affect patterns:

● Relies on personal experience, word-of-mouth information, or informal inquiries at terminals to determine which bus to take. 

● Standing at stops without accurate information about when the next bus will arrive or how many passengers it might already be carrying. 

● Occasionally expressing complaints directly to drivers or supervisors, though there is no formal system for recording or addressing these concerns

**2.2.2. Problems of the current system\(Using the PIECES Framework\)** The PIECES framework provides a structured approach to analyzing system problems across six dimensions: Performance, Information, Economics, Control, Efficiency, and Service. This analysis reveals specific deficiencies in the current public bus transport system. 

**1\) Performance Issues**

The system currently faces several performance issues that affect service reliability and consistency. Irregular service intervals are common, with buses on the same route arriving unpredictably—sometimes with gaps of 15 minutes followed by multiple buses arriving within a few minutes—because there is no mechanism to monitor spacing between vehicles. Extended waiting times are a frequent problem for passengers at major terminals such as Meskel Square and Mexico Square, where waiting periods can range from 30 to 60 minutes during off-peak hours and become even longer during peak times when buses bypass stops due to overcrowding. 

Additionally, posted timetables at terminals often do not reflect actual bus availability, as breakdowns or route reassignments occur without notice, leaving passengers and terminal supervisors uninformed. The system also suffers from delayed incident response, with replacement buses taking 45 minutes or more to arrive mid-route because drivers must locate a phone signal, call headquarters, and wait for supervisors to manually coordinate alternatives. 

— 26 —

**2\) Information Deficiencies**

Critical information gaps impact all stakeholders in the system. Passengers have no way of knowing whether their bus is approaching, delayed, or canceled, relying entirely on visual observation and guesswork. Bus assignments, driver schedules, and maintenance records are maintained separately in paper registers or basic spreadsheets across different departments, requiring managers to manually compile information from multiple sources when analyzing patterns or making decisions. Route maps and stop lists vary between operators, and even within Anbessa, different terminals may have slightly different versions of the same route due to informal changes that were never officially documented. The absence of digital records makes it nearly impossible to analyze trends, such as which routes experience the most breakdowns, peak demand periods, or changes in service quality over time. Furthermore, passengers receive almost no information about routes, schedules, or service changes, aside from destination signs on bus fronts, making it particularly difficult for new residents or visitors to navigate the system. 

**3\) Economic Inefficiencies**

Current practices result in significant resource wastage and lost revenue. Fuel is wasted from idle buses, which often sit at terminals for extended periods because schedules are not aligned with actual demand; some routes are over-served during slow periods, while others lack sufficient coverage during peak times. Fleet utilization is inefficient, as fixed bus assignments to routes regardless of time or day leave some vehicles underused while other routes consistently experience overcrowding. Manual fare collection and cash reconciliation create opportunities for errors and discrepancies, making it difficult to verify reported passenger counts against actual ridership. Productivity losses also occur, as citizens spend excessive time waiting for buses and coping with unreliable service, reducing their time for economic activities and impacting the city’s overall productivity. Additionally, without systematic vehicle performance tracking, preventive maintenance is often neglected until major breakdowns happen, resulting in costly emergency repairs instead of planned upkeep. 

**4\) Control Weaknesses**

The system currently lacks effective management and accountability mechanisms. Limited accountability makes it difficult to determine responsibility when passengers experience poor service, such as whether delays are due to driver lateness, bus reassignments, or unrealistic schedules, since there is no data to clarify these issues. Performance monitoring is weak, as AARTB officials rely on occasional physical inspections rather than continuous oversight to ensure operators meet service obligations. Enforcing standards is challenging because decision-

— 27 —

makers often lack concrete evidence of non-compliance patterns. Additionally, informal changes occur when drivers deviate from official routes due to traffic conditions or personal judgment, but these variations are neither recorded nor evaluated for potential system-wide adoption. 

Supervision capacity is limited, with terminal supervisors only able to observe activities directly in front of them, leaving no visibility into whether buses are maintaining routes and schedules between terminals. 

**5\) Efficiency Problems**

Operational processes are largely manual, slow, and prone to errors. Schedule creation is manual, with administrators spending significant time preparing weekly schedules by hand and cross-checking paper records to avoid assigning the same bus to multiple routes simultaneously—a tedious process that still leads to conflicts. Communication is slow, as drivers must return to terminals or make phone calls to report issues, causing delays and sometimes resulting in critical information being lost or miscommunicated. Redundant data entry occurs when the same information about buses, drivers, and routes is recorded in multiple locations by different personnel, creating inconsistencies and duplication of effort. Additionally, reporting is time-consuming, as compiling monthly reports for AARTB requires administrators to manually aggregate data from various sources, often taking several days to complete. 

**6\) Service Quality Shortcomings**

Passengers often experience frustration and dissatisfaction due to several factors. Uncertainty and stress arise from not knowing when a bus will arrive, making it difficult to plan trips or reach appointments and work on time. Overcrowding is common during peak hours, with buses often filled beyond comfortable capacity, leaving many passengers behind at stops. Lack of accessibility affects passengers with disabilities, tourists, and those unfamiliar with the city, as there is no system to guide them on which bus to take or when it will arrive. Additionally, there is no formal feedback mechanism, so complaints or suggestions made verbally to drivers or supervisors are rarely documented or acted upon. 

Table 8 : Summary of PIECES Analysis

**Dimension**

**Key Problems**

**Performance **Irregular service intervals, extended waiting times, low schedule adherence, delayed incident response

— 28 —

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

**2.2.3. Forms and Reports of the Existing System**

Currently, there is no officially documented or publicly accessible passenger-facing digital system used by city bus operators such as Velocity Bus for real-time bus tracking, route visualization, or scheduling services. As part of this study, direct communication was conducted with representatives of Velocity Bus to request access to their existing system interfaces and screenshots for academic analysis. However, the request was declined due to security and data protection policies. 

According to the information provided by the organization, the existing internal system used by Velocity Bus consists only of driver-side and administrative applications. These internal systems support limited operational functionalities such as GPS-based bus tracking, driver management, and cash or income management. The system is not designed for passenger use, and no public web or mobile application is available for commuters. As a result, screenshots or documentation of this system could not be obtained. 

Due to these constraints, the analysis of the existing system was carried out using publicly available transportation-related digital platforms that are currently accessible in Ethiopia. 

Specifically, the Guzo online bus booking system and the AddisMapTransit mobile application were selected as reference systems to examine existing forms, interfaces, and features related to public transportation information services. These systems were reviewed to understand their

— 29 —

functionalities, user interfaces, and limitations, which helps identify gaps and inform the design of the proposed system. 

**A. Existing System Interfaces and Forms \(Guzo Web System\)**

**I. Trip Search and Booking Interface**

The Guzo web system provides a basic trip search interface that allows users to search for available intercity bus trips. The interface collects the following inputs from users. 

 Departure city

 Departure terminal

 Destination city

 Travel date \(calendar-based selection\)

 Number of passengers

Upon submitting the search form, the system displays a **search results page **intended to list available trips that match the user’s input criteria. However, during system observation, the platform frequently displays a *“No trips found” * message, indicating limited backend integration or unavailable real-time trip data. 

— 30 —



Figure 4 Trip Search Form Interface \(Guzo System\)

— 31 —



Figure 5: Trip Search Result Display Interface

Although this interface demonstrates basic form-based data input and retrieval functionality, it lacks advanced features such as real-time bus availability, route mapping, live tracking, and schedule reliability. 

**II. User Authentication Forms**

The Guzo system also includes authentication-related interfaces, which appear to be intended primarily for administrative users. These interfaces include:

**Login Form**, which collects:

 Phone number

— 32 —



 Password

 “Remember me” option

 Forgot password feature

**Account Registration Form**, which collects:

 First name

 Last name

 Phone number

 Password and password confirmation

A verification interface is also included for account confirmation. 

Figure 6: Admin Login Form

— 33 —



Figure 7: User Registration Form

Despite the availability of these forms, most authentication-related features are non-functional, including account verification and password recovery. This indicates that the platform operates largely as a demonstration or prototype system rather than a fully implemented and reliable solution. 

**B. Existing Mobile Application Features \(AddisMapTransit App\)**

The AddisMapTransit mobile application provides limited route-based information for public buses operating within Addis Ababa. The application focuses mainly on static route visualization and does not support real-time operational features. 

**I. Route Search and Map Display Interface**

The home screen of the application allows users to search for routes by specifying origin \(“From”\) and destination \(“To”\) locations. Based on the user’s input, the system displays:

 Estimated travel time

 Estimated travel distance

 Available bus names serving the selected route

A map is displayed showing approximate route paths, with the search results listed below the map. 

— 34 —



— 35 —



Figure 8: Route Search and Map Display Interface

This feature provides basic navigational assistance; however, it relies on static data and does not reflect real-time traffic conditions or actual bus locations. 

**II. All Routes Listing Interface**

The application includes an “All Routes” section that displays a list of available bus routes within Addis Ababa. Each route includes the route name and associated bus identifiers and is selectable by the user. 

— 36 —



Figure 9: All Routes Listing Interface

While this feature allows users to explore existing routes, it does not provide schedule information, service availability status, or filtering options. 

**III. Route Detail and Stops Visualization Interface**

When a user selects a specific route, the application displays a detailed route view consisting of:

 A map with a line drawn from the route’s starting point to its endpoint

 A list of bus stops displayed at the bottom of the screen

Figure 10: Route Visualization and Stops Display Interface

This interface helps users understand route structure and stop locations but lacks features such as estimated arrival times, live bus movement, or stop-level scheduling information. 

— 37 —

**C. Limitations of the Existing Systems**

The analysis of the Guzo web system and the AddisMapTransit mobile application revealed several significant limitations, including:

 Absence of real-time bus tracking and live location updates

 Limited functionality, with several features operating only as demonstrations

 Lack of passenger-facing scheduling and service status information

 AddisMapTransit incompatibility with Android versions above 12

 No integration with fleet management, driver management, or income systems

 Absence of administrative dashboards, analytics, and reporting tools

 Poor scalability and limited cross-platform accessibility

These limitations significantly reduce the effectiveness of the existing systems in supporting modern urban public transportation management and delivering reliable passenger information services. 

**2.2.4. Players of the Existing System**

The public bus transport system involves multiple stakeholders, each with distinct roles, responsibilities, and interactions with other players. Understanding these relationships is crucial for designing a system that serves everyone effectively. 

**A. Regulatory and Administrative Bodies**

**I. **

**Addis Ababa Road and Transport Bureau \(AARTB\)**

The Bureau serves as the central regulatory authority with several key responsibilities. It issues operating licenses to bus companies and associations, approves route assignments, and sets safety and service quality standards. The Bureau also monitors operator compliance through inspections and reports and coordinates with city planning authorities on transport infrastructure development. 

Interaction with operators occurs through formal meetings, written directives, and periodic compliance checks. 

**B. Bus Operating Enterprises and Associations**

**I. Anbessa City Bus Service Enterprise \(ACBSE\)**

As the primary government-owned operator, Anbessa employs:

 General Manager: manages overall operations, strategic planning, and relationships with AARTB. 

— 38 —

 Operations Managers: Supervise daily fleet deployment, schedule preparation, and service delivery. 

 Fleet Maintenance Manager: Coordinates vehicle repairs, parts procurement, and preventive maintenance programs. 

 Administrative Staff: Process driver payroll, maintain paper records, and compile reports for management and AARTB. 

Anbessa serves as the backbone of the system but faces challenges with aging infrastructure and limited modernization resources. 

**II. Sheger Mass Transit Enterprise \(SMTE\)**

Sheger operates similarly to Anbessa but with:

 Newer fleet focused on high-capacity routes

 Smaller organizational structure with fewer administrative layers

 Limited pilot GPS tracking on some vehicles \(not integrated city-wide\) Sheger management coordinates with AARTB but operates independently from Anbessa with no formal data sharing. 

**III.Private Operators \(Velocity Bus \)**

Private operators bring additional capacity through:

 Operator Management: Company executives who negotiate route licenses with AARTB

and manage business operations. 

 Fleet Coordinators: Assign buses and drivers to routes based on demand and vehicle availability. 

 Maintenance Contractors: Often outsource repairs to third-party garages rather than maintaining in-house facilities. 

Private operators value operational independence but face challenges coordinating with government systems and accessing shared infrastructure like terminals. 

**C. Drivers**

Drivers are the most visible face of the system to passengers. Their responsibilities include:

 Following assigned routes and attempting to maintain schedules

 Operating vehicles safely according to traffic laws

 Managing passenger boarding and flow

 Reporting mechanical problems and incidents

— 39 —

 Collecting fares \(on buses without conductors\)

Drivers interact with terminal supervisors at the start and end of shifts, communicate with dispatchers when problems arise, and respond to passenger questions throughout the day. Many drivers have years of experience and develop personal strategies for navigating traffic and managing routes. 

**D. Passengers**

Passengers are the end beneficiaries of the system but currently have limited formal representation. 

Different passenger groups have varying needs:

**I. Regular Passengers**

 Workers, students, and others who use buses daily develop deep knowledge of routes and timing through repeated experience. They know which buses to take and approximately when to expect them, but still face uncertainty during disruptions. 

**II. Occasional Passengers**

 Residents who use buses infrequently or visitors to the city struggle to navigate the system without clear route information or schedules. They often ask drivers or other passengers for assistance. 

**III.Vulnerable Passengers**

 Elderly passengers, people with disabilities, pregnant women, and those with young children face particular challenges with overcrowded buses and lack of accessible information. 

Passengers interact with the system primarily through drivers and terminal staff, with limited formal channels for feedback or complaints. 

**E. Mechanics and Technicians**

Maintenance staff keep the fleet operational through:

 Routine servicing based on mileage or time intervals

 Responding to driver-reported problems

 Emergency roadside assistance for breakdowns

They rely on driver logbooks and maintenance request forms to prioritize work but often lack complete vehicle history due to poor record-keeping. 

**2.3. Requirements Definition**

**2.3.1. Functional Requirements**

— 40 —

Functional requirements define the specific operations and services that the system must provide to users. These requirements describe how different system actors—administrators, drivers, and passengers—interact with the system to perform tasks related to bus management, scheduling, monitoring, and service improvement. 

The Public Bus Tracking and Scheduling System for Ethiopian Cities is designed to address the operational and service delivery gaps found in existing public transportation management. The system must provide the following functional capabilities to ensure seamless administration, monitoring, and service enhancement across bus operators such as Anbessa, Sheger, and Velocity. 

 **Bus and Driver Registration: **Maintain accurate digital records of buses \(plate number, capacity, operator type\) and drivers \(license number, contact information, assigned routes\). 

 **Route and Schedule Management: **Provide CRUD operations for routes and schedules, static map visualization, and automated conflict detection for overlapping time allocations. 

 **Driver Dashboard: **Offer a mobile-friendly interface allowing drivers to update stop progression, submit incident reports, update trip information, and communicate with administrators. 

 **Passenger Dashboard: **Enable passengers to search routes or schedules, view static route maps, estimate arrival times based on schedule, and submit service feedback. 

 **Administrative Dashboard: **Present real-time summaries of buses, active routes, unreported vehicles, delays, and overall fleet performance indicators. 

 **Analytic s and Reports: **Generate daily, weekly, and monthly summaries for operations planning, delay analysis, feedback trends, and route performance evaluation. 

 **Incident Management System: **Allow drivers to log breakdowns, accidents, heavy traffic, or delays with **severity **levels, notifying administrators instantly for immediate action. 

 **Passenger Feedback Categorization: **Classify passenger complaints into categories \(delay, overcrowding, safety issue\) and produce visual summaries for administrators. 

 **Terminal and Stop Management: **Register bus terminals, stops, and capacity details to enhance route and passenger flow planning. 

 **Integration with Mapping Services: **Provide static map-based route visualization using mapping API s with support for stop markers and route outlines. 

— 41 —

 **Audit Trail and Logging: **Record all user activities \(admin changes, driver updates, schedule modifications\) to ensure transparency and accountability. 

 **Static Bus Status Tracking: **Display buses marked as 'On Route', 'Delayed', 'Under Maintenance', or 'Awaiting Dispatch' without live GPS tracking. 

**2.3.2. Non-Functional Requirements**

Non-functional requirements define the quality attributes and operational constraints of the system. 

These requirements ensure that the system is reliable, secure, scalable, and suitable for real-world deployment in Ethiopian public transport environments. 

The system must meet specific quality standards to ensure performance, usability, and compliance. 

These non-functional requirements define the essential attributes that guarantee reliability, security, and long-term scalability of the platform. 

 **Usability: **User interfaces must be simple, intuitive, and optimized for both desktop and mobile access. 

 **Reliability: **The system must maintain consistent operation with at least 95% uptime and dependable functionality. 

 **Scalability: **The architecture should support expansion to additional Ethiopian cities and increased bus fleet sizes. 

 **Security: **Authentication, authorization \(RBAC\), and encryption must protect sensitive data from unauthorized access. 

 **Performance: **All dashboards should load within 3 seconds on a 4G connection; database queries must execute efficiently. 

 **Maintainability: **The system must be built with modular architecture \(front-end, backend, database\) to support updates and new integration's. 

 **Accessibility: **Interfaces must support mobile-friendly layouts and be usable on low-bandwidth connections. 

 **Portability: **The web-based system must run effectively across multiple browsers and low-end smartphones. 

 **Data Integrity: **All records must prevent duplication and ensure consistent, accurate data storage. 

— 42 —

 **Compliance: **The system must align with Ethiopian digital governance standards and transport sector regulations. 

**CHAPTER THREE**

**3. Object Oriented Analysis**

**3.1. Overview**

This chapter presents the Object-Oriented Analysis \(OOA\) for the Public Bus Tracking and Scheduling System for Ethiopian Cities. Object-Oriented Analysis is a crucial methodology used to define the software requirements by modeling the system as a group of interacting objects. The primary goal of this phase is to identify and formally describe the system's core functional requirements, business rules, and its static and dynamic structures from the user's perspective. 

For this project, the OOA phase is instrumental in transforming the identified problems of urban mobility—such as unpredictable bus arrivals, inefficient scheduling, and lack of real- time information for passengers and managers—into a clear, structured, and unambiguous software specification. The models developed in this chapter will serve as the foundational blueprint, ensuring that the subsequent design and implementation stages are aligned with the specific needs of Ethiopian cities' public transport ecosystem. This analysis is structured into three key modeling activities: Use Case Modeling to capture functional requirements, Conceptual Modeling to define the static structure, and Sequence Diagramming to illustrate dynamic interactions. 

**3.2. Use Case Modeling**

Use Case Modeling is a foundational technique in object-oriented analysis that serves to capture the functional requirements of a system from an external perspective. It focuses on what the system should do, rather than how it will do it, by defining the interactions between users and the system to achieve specific, valuable goals. For the Public Bus Tracking and Scheduling System, this process is instrumental in translating the complex, real-world challenges of urban Ethiopian transport—such as information asymmetry, scheduling inefficiencies, and operational opacity—

into a clear, structured set of system behaviors. By systematically identifying user interfaces, defining governing business rules, categorizing actors, and modeling their interactions, use case

— 43 —

modeling ensures the resulting platform is both functionally robust and deeply aligned with the needs of its diverse stakeholders, from daily commuters to city transport manages. 

**3.2.1. UI Identification**

User Interface \(UI\) Identification is the process of enumerating and defining the primary points of interaction between the actors and the system. It moves beyond abstract functionality to conceptualize the tangible screens and components through which users will accomplish their goals. This step is not concerned with visual design elements like color or typography, but rather with the functional layout, information architecture, and navigational flow. For this system, UI identification is critical due to the varied contexts of its users: a passenger on a mobile device needs quick, glance-able information, while a system administrator at a desktop requires comprehensive data management tools. Identifying these interfaces early ensures that the system's architecture supports a seamless, intuitive, and context-aware user experience, bridging the gap between high-level use cases and the final, deploy-able application. 

Table 9 User Interface of our system

ID

User Interface

Used By

Description/Purpose

UI\_01

System Login Page

Admin, Driver, 

A secure authentication gateway for

users to access their respective

dashboards. 

UI\_02

Admin Dashboard

Admin

The main admin portal showing KPIs

Home

\(On-time Performance, Active Buses, 

etc.\) and system health alerts. 

UI\_03

Bus Fleet Management Admin

Interface for registering new buses, 

Page

editing details \(license plate, 

capacity\), and decommissioning

buses. 

UI\_04

Driver Management

Admin

Interface for registering new drivers, 

Page

assigning them to buses, and

managing their accounts. 

UI\_05

Route Management

Admin

Interface for creating new bus routes, 

— 44 —

Page

defining stop sequences, and

modifying existing routes. 

UI\_06

Schedule Management Admin

Interface for creating and modifying

Page

departure/arrival timetables for buses

on specific routes. 

UI\_07

Feedback & 

Admin

A dedicated interface to view, filter, 

Complaints Inbox

and respond to feedback and

complaints submitted by passengers. 

UI\_08

Incident Resolution

Admin

A console to view reported incidents

Dashboard

\(delays, emergencies\), assign

resources, and mark them as

resolved. 

UI\_09

Analytics & Reporting Admin

Interface to generate, view, and

Page

export performance reports \(e.g., 

punctuality, passenger load\). 

UI\_10

System Monitoring

Admin

A real-time view of system status, 

Page

including server health and GPS data

feed integrity. 

UI\_11

Driver Login Screen

Driver

A simple, secure login screen for the

driver's mobile/tablet application. 

UI\_12

Driver Trip Dashboard Driver

The main screen for drivers, showing

their daily schedule, a "Start/End

Trip" button, and next stop

information. 

UI\_13

Incident Reporting

Driver

A form-based interface for drivers to

Screen

report incidents \(breakdowns, 

accidents\) with reason and optional

notes. 

— 45 —

UI\_14

Delay Reporting

Driver

A quick-access screen \(often a

Screen

modal\) to report a delay, typically

with pre-set reasons like "Heavy

Traffic." 

UI\_15

Emergency Alert

Driver

A single, highly prominent button to

Screen

trigger an immediate emergency alert

to system administrators. 

UI\_16

Passenger App Home

Passenger

The default screen featuring an

\(Live Map\)

interactive map showing the user's

location and real-time positions of

buses. 

UI\_17

Route Search & 

Passenger

Interface for passengers to enter a

Results Page

start and destination to find available

routes and see estimated arrival

times. 

UI\_18

Feedback Submission

Passenger

A form accessible from the passenger

Form

app to submit feedback, complaints, 

or suggestions. 

UI\_19

Real-time Notification Passenger

A screen within the app to view and

Panel

manage push alerts for bus arrivals, 

delays, and system announcements

UI\_20

Conflict Detection Log System / Admin

An administrative interface that

displays automatically detected

scheduling conflicts or resource

allocation issues for review. 

**3.2.2. Business Rules Identification**

— 46 —

The Public Bus Tracking and Scheduling System is obliged to operate under a clearly defined set of business rules that standardize data management and how operational decisions are enforced. 

The following business rules ensure consistency, accountability, and regulatory compliance across all participating operators \(Anbessa, Sheger, Velocity\), as well as the Addis Ababa Road and Transport Bureau \(AARTB\). 

**A. Bus and Driver Management Rules**

1. Each bus must be uniquely registered using a valid plate number, operator type, and capacity before it can be assigned to any route. 

2. A driver may only be assigned to one bus at a time, and each trip can only be operated by a single active driver. 

3. Driver assignments must respect licensing requirements, meaning only drivers with valid and verified licenses can operate buses. 

4. Buses marked as “Under Maintenance” cannot be scheduled until maintenance status is updated to “Operational.” 

5. Driver shift changes must be logged and time-stamped to ensure accountability and schedule traceability. 

**B. Route and Scheduling Rules**

1. A bus cannot be scheduled on overlapping routes or times, ensuring no double- allocation occurs but there will be exceptions. 

2. Each route must have clearly defined stops and terminals, and these cannot be modified without administrative approval. 

3. Schedules must follow the valid operational hours of the assigned route, as defined by operator policy. 

4. Any schedule change must be automatically logged, including the administrator who performed the modification. 

**C. Incident and Maintenance Rules**

1. Drivers must report incidents \(breakdown, accident, delay\) immediately using the system’s incident reporting feature. 

2. Incident severity levels determine notification priority, with critical incidents triggering instant alerts to administrators. 

3. A maintenance request must be created before a bus can be moved to “Under Repair” 

status. 

4. Completed maintenance must be verified by a maintenance supervisor before the bus is returned to service. 

— 47 —

5. Historical incident and maintenance records must remain uneditable, preserving data integrity. 

**D. Passenger Information and Service Rules**

1. Passengers must be able to view schedules, routes, and static arrival estimates, and these must reflect the latest approved data. 

2. Passenger feedback must be categorized \(delay, overcrowding, safety, etc.\) and assigned a status such as “Pending,” “Reviewed,” or “Resolved.” 

3. Feedback cannot be deleted, only archived or closed by authorized administrators. 

4. Service information visible to passengers must remain consistent across all operators, following AARTB communication standards. 

**E. System Access and Control Rules**

1. User authentication is required for all administrative and operational functions, including schedule editing and bus status updates. 

2. Role-Based Access Control \(RBAC\) must be enforced, with distinct permission levels for drivers, operators, and AARTB administrators. 

3. Every change or update within the system must generate an entry in the audit log, including date, user, and action performed. 

4. Drivers may only update trip progress and report incidents, not modify routes or schedules. 

**F. Reporting and Data Rules**

1. Daily, weekly, and monthly reports must automatically compile data from the system, replacing manual reporting workflows. 

2. Data used for reports must originate only from verified internal sources \(driver logs, assignments, incident reports\). 

3. Reports submitted to AARTB must follow standard templates for performance monitoring. 

4. Historical data must be retained for audit and regulatory purposes, following national digital governance standards

5. Duplicate entries \(bus registration, driver ID, route ID\) must be prevented at the database level. 

**3.2.3. Actor Identification**

Actors are external entities such as users, operational staff, and automated system components that interact with the Public Bus Scheduling and Tracking System to accomplish various

— 48 —

transportation-related tasks. Identifying these actors is a crucial part of system analysis because it establishes the boundaries of the system, highlights who depends on the system’s services, and clarifies how each actor contributes to the overall operation of the bus network. 

In the context of a bus scheduling and real-time tracking environment, the system supports multiple categories of actors, each with unique goals and responsibilities. Administrators are responsible for managing operational data such as buses, drivers, routes, and schedules; drivers rely on the system to perform live trip updates and incident reporting; passengers use the system to access route information and track buses in real time; and internal automated services ensure continuous communication and conflict detection. 

By identifying and understanding these different actors, the system can be designed to meet operational requirements, improve transportation efficiency, and provide a seamless experience for all users. 

Table 10 Actors of the System

Actor

Instruction

Interaction with the System

Admin

System administrator responsible for

Manages bus and driver

managing fleet data, drivers, routes, 

records, creates and updates

schedules, and monitoring operational

routes and schedules, resolves

performance. 

incidents, responds to feedback, 

and generates performance and

analytic s reports. 

Driver

Authorized bus operator responsible for

Logs into the driver

carrying out scheduled trips and reporting dashboard, views assigned operational statuses during

schedules, starts and ends

trips, sends real-time stop

transit. 

updates,reports

delays/incidents, and triggers

emergency alerts. 

Passenger

Public transport user searching for route

Searches routes and ETAs, 

information, tracking bus movements, 

views real-time bus locations, 

and submitting feedback. 

and submits feedback about

services. 

— 49 —

**3.2.4. Designing the Use Case Diagram**

A use case represents a specific interaction between an actor and the system that enables the achievement of a meaningful goal. In the context of the Public Bus Scheduling and Tracking System, use cases help describe how different users such as administrators, drivers, and passengers interact with the system to perform essential transportation-related tasks. These interactions include activities like managing bus schedules, reporting incidents, tracking bus locations, and accessing route information. 

Use case diagrams serve as an effective method for capturing and communicating the functional requirements of the system. They provide a visual overview of how external entities depend on the system’s capabilities and how the system must respond to achieve operational goals. By designing a comprehensive use case diagram for the Public Bus Scheduling and Tracking System, we can clearly define system boundaries,identify all key actors, and document the required functionalities in a structured and easily understandable form. 

— 50 —



Figure 11 : Use Case Diagram for Public Bus Scheduling and Tracking System

— 51 —

**3.2.5. Use Case Description**

Table 11 Use Case: System Login

Name

System login

Identifier

UC-001

Actors

Admin, Driver, Passenger

Description

This use case allows all system users

administrators, drivers, and passengers to

securely authenticate and access their

respective system dashboards. Each actor logs

in to access features that correspond to their

role within the Public Bus Scheduling and

Tracking System. 

● User has a registered account in the system. 

Precondition

● The system is online and accessible. 

3 User is successfully authenticated. 

Postcondition

4 The system redirects the user to their role-

based dashboard \(Admin Dashboard, Driver

Dashboard, or Passenger Dashboard\). 

Trigger

User enters their username/ID and password

in the login form. 

— 52 —

Normal Flow

A. User navigates to the login page. 

B. User enters credentials \(username/ID and

password\). 

C. System validates the input format. 

D. System checks user information in the

authentication database. 

E. If valid, system identifies the user’s role

\(Admin, Driver, Passenger\). 

F. System loads the appropriate dashboard

based on role. 

G. User gains access to system services. 

Alternative Flow

**AF-01**: Invalid Credentials – System displays

an error message and prompts the user to re-

enter correct login information. 

**AF-02**: Incorrect Role Credentials – User

attempts to access a restricted dashboard →

System denies access and redirects to role-

appropriate dashboard. 

**AF-03**: Account Locked – After multiple

failed attempts, account is locked → User

must contact admin/support. 

**AF-04**: Missing Fields – System detects

empty username or password field →

Prompts user to fill in required fields. 

**AF-05**: Network/Server Error – System

cannot connect to authentication service →

Displays temporary access error message. 

— 53 —

Table 12 Use Case: Bus Registration

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

1\) Admin opens the bus registration form. 

Normal Flow

2\) Admin enters all required fields \(plate

number, capacity, model, etc.\). 

3\) System validates inputs. 

4\) System checks for duplicate plate number. 

5\) System saves the bus to the database. 

6\) System displays success message. 

Alternative Flow

AF-01: Missing Required Fields → System

requests admin to complete missing

information. 

AF-02: Duplicate Bus Plate → System warns

and prevents registration. 

AF-03: Validation Error → System highlights

incorrect fields. 

Table 13 Use Case: Driver Management

Name

Driver Management

Identifier

UC-003

Actors

Admin

— 54 —

Description

Admin adds, updates, or removes drivers

from the system. 

Precondition

Admin is authenticated. 

Postcondition

Driver account created/updated/deleted. 

Trigger

Admin selects driver management option. 

1. Admin opens driver management panel. 

Normal Flow

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

Table 14 Use Case: Route Creating

Name

Route Creation

Identifier

UC-004

Actors

Admin

Description

Create a new bus route with stops and route

details. 

Precondition

Admin is logged in. 

Postcondition

New route stored in system. 

Trigger

Admin selects "Create Route". 

— 55 —

1. Admin opens route creation form. 

Normal Flow

2. Admin enters route number, 

stops, direction, and map details. 

3. System validates stops and route format. 

4. System checks for conflicts \(extend:

UC- 023\). 

5. System saves route. 

6. System confirms creation. 

Alternative Flow

AF-01: Conflict Detected → System suggests

correction. 

AF-02: Missing Stop Locations → Admin

must complete data. 

Table 15 Use Case: Route Modification

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

1. Admin selects route to edit. 

Normal Flow

2. Admin modifies stops or direction. 

3. System validates updates. 

4. Conflict Detection runs \(extend\)

Alternative Flow

AF-01: Invalid Route Data → System

prevents saving. 

AF-02: Conflict Found → Admin must

resolve issues. 

Table 16 Use Case: Schedule Creation

Name

Schedule Creation

— 56 —

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

1. Admin selects route and bus. 

Normal Flow

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

Table 17 Use Case: Schedule Modification

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

Similar to UC-006 but editing instead of

creating. 

Alternative Flow

Same alternatives as UC-06. 

Table 18 Use Case: Feedback Management

Name

Feedback Management

Identifier

UC-008

— 57 —

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

1. Admin views feedback list. 

Normal Flow

2. Admin reads details. 

3. Admin responds or resolves. 

4. System stores action. 

Alternative Flow

AF-01: No Feedback → System shows

empty list. 

Table 19 Use Case: Incident Resolution

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

Normal Flow

1. Admin opens incident list. 

2. Admin reviews details. 

3. Admin resolves incident or requests info. 

System saves status. 

Alternative Flow

AF-01: Insufficient Info → Admin requests

details. 

Table 20 Use Case: Analytics Reports

Name

Analytics Reports

Identifier

UC-010

Actors

Admin

— 58 —

Description

This use case enables the admin to generate

analytical reports based on bus operations, 

schedules, delays, incidents, feedback, and

driver performance. These reports help in

monitoring system efficiency and making data

driven decisions. 

1. Admin is logged in. 

Precondition

2. System contains collected trip data, 

incident logs, delays, and feedback

records. 

1. Analytics report is generated successfully. 

Postcondition

2. Admin can view, download, or export

the report. 

Trigger

Admin selects "Generate Analytics Report" 

from the dashboard. 

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

6. System displays the generated report to

The

7. admin

— 59 —

Alternative Flow

 AF-01: No Data Available → System

notifies admin that the selected date

range has insufficient data. 

 AF-02: Invalid Filter Selection → System

prompts admin to correct filters \(e.g., 

invalid date range\). 

 AF-03: Processing Timeout → System

fails to process large datasets and

suggests narrowing the report scope. 

Table 21 Use Case: performance Monitoring

Name

Performance Monitoring

Identifier

UC-011

Actors

Admin

Description

Allows the admin to monitor real-time and

historical operational performance of buses, 

drivers, and the scheduling system. This

includes delays, route efficiency, on-time

performance, passenger feedback trends, 

and incident frequency

Precondition

1. Admin is authenticated. 

System has collected recent operational

metrics. 

Postcondition

Admin views performance indicators displayed

in charts, tables, or alerts. 

Trigger

Admin opens the “Performance Monitoring” 

dashboard. 

1. Admin opens the performance dashboard. 

Normal Flow

2. System loads KPIs such as average

delay time, on-time statistics, incidents

per route, passenger satisfaction scores, 

and driver efficiency. 

— 60 —

3. Admin filters or selects specific metrics. 

System updates dashboard visuals based on

selected filters. 

Alternative Flow

AF-01: Real-Time Data Not Available →

System displays last updated snapshot

AF-02: Metric Calculation Error → System

notifies admin and hides incomplete KPIs. 

Table 22 Use Case: View Daily Schedule

Name

View Daily Schedule

Identifier

UC-012

Actors

Driver

Description

Driver views all assigned trips for the day, 

including departure times, route details, and

bus information. 

Precondition

Driver is logged in and has assigned trips. 

Postcondition

Schedule is displayed. 

Trigger

Driver selects “View Daily Schedule”. 

1. System retrieves the driver’s assigned

Normal Flow

trips. 

2. System displays each trip with

departure and route details. 

3. Driver selects a trip to view more

information. 

Alternative Flow

AF-01: No Assigned Trips → System

displays “No trips found for today”. 

Table 23 Use Case: Start Trip

Name

Start Trip

Identifier

UC-013

Actors

Driver

— 61 —

Description

Driver begins an assigned trip, activating

real-

time tracking and enabling stop updates. 

Precondition

Trip exists and is assigned to the driver. 

Postcondition

Driver taps the “Start Trip” button. 

Trigger

Admin opens feedback page. 

1. Driver selects a trip. 

Normal Flow

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

Table 24 Use Case: Real-Time Stop Updates

Name

Real-Time Stop Updates

Identifier

UC-014

Actors

Driver

Description

Driver updates each stop \(Arrived/Departed\), 

enabling real-time location tracking for

passengers. 

Precondition

Trip must be in progress. 

Postcondition

Location and stop status are updated. 

Trigger

Driver taps “Arrived” or “Departed” at each

stop. 

— 62 —

1. Driver selects the stop. 

Normal Flow

2. Driver updates arrival/departure. 

3. System records timestamp and

GPS location. 

4. Web Socket Broadcast \(UC-022\) sends

update to passengers. 

Table 25 Use Case: End Trip

Name

End Trip

Identifier

UC-015

Actors

Driver

Description

Driver completes a trip, allowing the system

to finalize logs and stop real-time tracking. 

Precondition

Trip is in progress

Postcondition

Driver taps “End Trip”. 

Trigger

Admin opens feedback page. 

1. Driver ends trip. 

Normal Flow

2. System finalizes timestamps. 

3. Real-Time Stop Updates included. 

3. Web Socket Broadcast extended to notify

passengers. 

Alternative Flow

AF-01: Trip Already Completed → System

prevents duplicate ending. 

Table 26 Use Case: Incident Reporting

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

— 63 —

Postcondition

Incident is recorded. 

Trigger

Driver selects “Report Incident”. 

1. Driver opens incident form. 

Normal Flow

2. Driver enters details. 

3. System stores incident. 

4. Incident Resolution \(UC-009\) is included. 

Alternative Flow

AF-01: Missing Details → Prompt driver to

fill required fields. 

Table 27 Delay Reporting

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

Trigger

Driver taps “Report Delay”. 

1. Driver selects delay reason. 

Normal Flow

System records delay. Admin dashboard is

updated. 

Alternative Flow

AF-01: No Delay Reason Selected → System

prompts selection. 

Table 28 Emergency Alert

Name

Emergency Alert

Identifier

UC-018

Actors

Driver

— 64 —

Description

Driver triggers an emergency alert for

severe incidents. 

Normal Flow

System sends high-priority alert to admin. 

Table 29 Search Routes & ETA

Name

Search Routes & ETA

Identifier

UC-019

Actors

Passenger

Description

Passengers search routes and view

estimated arrival times. 

Table 30 Submit Feedback

Name

Submit Feedback

Identifier

UC-020

Actors

Passenger

Description

Passengers submit feedback; included by

admin feedback handling. 

Table 31 View Real-Time Bus Location

Name

View Real-Time Bus Location

Identifier

UC-021

Actors

Passenger

Description

Passengers view real-time bus location. 

Table 32 Web Socket Broadcast

Name

Web Socket Broadcast

Identifier

UC-022

Actors

System

Description

System broadcasts real-time driver updates to

all users. 

— 65 —

Table 33 Automated Conflict Detection

Name

Automated Conflict Detection

Identifier

UC-023

Actors

System

Description

System automatically detects scheduling, 

routing, and resource conflicts. 

**3.3. Conceptual Modeling**

**3.3.1 Class Diagram**

The class diagram shows the structure of the Public Bus Tracking and Scheduling System by defining the main entities, their properties, relationships, and operations. This diagram guides the database design and helps developers understand how different parts of the system connect and work together. 

— 66 —



Figure 12 : Class Diagram for Public Bus Scheduling and Tracking System

— 67 —

**3.3.2 Class Descriptions**

This section provides detailed descriptions of each class in the system, including attributes, methods, and responsibilities. 

Table 34 : User Class \(Abstract Base Class\)

**User Class**

Aspect

Details

Purpose

Serves as the parent class for all system users, providing common

authentication and profile management functionality. 

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

— 68 —

**User Class**

logout\(\)

None

Invalidates current session

Methods

updateProfile\(\)

data

Updates user information

resetPassword\(\)

newPassword

Changes user password with

validation

Relationships

Parent class to Administrator, Driver, and Passenger \(inheritance\)

Responsibilities

• User authentication and session management

• Common profile data storage

• Password security handling

Table 35 : Administrator Class

**Administrator Class**

Aspect

Details

Purpose

Manages system configuration, oversees operations, and monitors performance across all transport services. 

Inherits From

User class \(all User attributes and methods\)

Name

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

Methods

createRoute\(\)

routeData

Defines new route with stops

createSchedule\(\)

scheduleData

Assigns bus to route with timing

— 69 —

**Administrator Class**

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

Table 36 : Driver Class

**Driver Class**

Aspect

Details

Purpose

Operates buses, updates trip progress, and reports operational issues during service delivery. 

Inherits From

User class \(all User attributes and methods\)

Name

Data type

Description

Additional

attributes

licenseNumber

String, Unique

Driver's license identifier

licenseExpiry

Date

License validity end date

assignedBusId

String, Foreign

Currently assigned bus

Key

— 70 —

**Driver Class**

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

Table 37 : Passenger Class

**Passenger Class**

Aspect

Details

Purpose

Accesses route information, views schedules, and provides feedback about service quality. 

Inherits From

User class \(all User attributes and methods\)

Name

Data type

Description

— 71 —

**Passenger Class**

Additional

preferredRoutes

Array of Strings

Saved favorite routes for quick

attributes

access

Name

Parameters

Description

searchRoutes\(\)

origin, destination Finds available routes between

locations

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

• Providing service feedback for improvements

Table 38 : Bus Class

**Bus Class**

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

manufacturer

String

Vehicle make and model

— 72 —

**Bus Class**

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

• Involved in multiple Incidents \(1:N\)

• Created by one Administrator \(N:1\)

Responsibilities • Fleet inventory management

• Maintenance tracking and scheduling

• Driver assignment coordination

• Operational status monitoring

Table 39 : Route Class

**Route Class**

Aspect

Details

Purpose

Defines bus paths through the city with all stopping points, timing, and distance information. 

— 73 —

**Route Class**

Name

Data type

Description

routeId

String, Primary Key Unique route identifier

Attributes

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

— 74 —

**Route Class**

Responsibilities • Route definition and structure

• Stop sequence management

• Distance and duration calculation

• Route activation/deactivation control

Table 40 : RouteStop Class

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

— 75 —

**RouteStop Class**

Relationships

• Belongs to one Route \(N:1\)

• References one BusStop \(N:1\)

Responsibilities • Maintaining stop order along routes

• Timing calculations for each stop

• Route navigation support

• Stop sequence integrity

Table 41 : bus stop class

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

stopName

String

Display name of stop

Attributes

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

• Referenced as current location in Trips \(1:N\)

— 76 —

**BusStop Class**

Responsibilities • Stop location management

• Amenity information tracking

• Geographic search support

• Stop identification and naming

Table 42 : Terminal Class

**Terminal Class**

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

terminalName

String

Official terminal name

Attributes

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

— 77 —

**Terminal Class**

• Serves as end point for multiple Routes \(1:N\)

Responsibilities • Terminal facility management

• Capacity monitoring and allocation

• Route coordination point

• Operating hours enforcement

Table 43 : Schedule Class

**Schedule Class**

Aspect

Details

Purpose

Links buses to routes for specific time periods and tracks assignment details to prevent conflicts. 

Name

Data type

Description

scheduleId

String, Primary

Unique schedule identifier

Key

Attributes

busId

String, Foreign

Assigned bus

Key

routeId

String, Foreign

Assigned route

Key

driverId

String, Foreign

Assigned driver

Key

scheduledDepartureTime

DateTime

Planned start time

scheduledArrivalTime

DateTime

Planned end time

status

Enum

SCHEDULED, IN\_PROGRESS, 

COMPLETED, or CANCELLED

createdBy

String, Foreign

Administrator who created

Key

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

— 78 —

**Schedule Class**

assignDriver\(\)

driverId

Links driver to schedule

Methods

cancelSchedule\(\)

reason

Marks schedule as cancelled

updateStatus\(\)

newStatus

Changes schedule status

getEstimatedCompletion\(\)

None

Calculates expected arrival time

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

Table 44 : Trip Class

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

scheduleId

String, Foreign Key

Associated schedule

Attributes

actualDepartureTime

DateTime

Actual start time

actualArrivalTime

DateTime

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

— 79 —

**Trip Class**

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

• Historical trip data collection for analytics

Table 45 : Incident Class

**Incident Class**

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

reportedBy

String, Foreign Key

Driver who reported incident

Attributes

— 80 —

**Incident Class**

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

— 81 —

**Incident Class**

Responsibilities • Incident documentation and tracking

• Priority assignment and routing

• Administrator notification and alerting

• Resolution monitoring and response time tracking

Table 46 : Feedback Class

**Feedback Class**

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

or ADDRESSED

status

Enum

REPORTED, IN\_PROGRESS, or

RESOLVED

— 82 —

**Feedback Class**

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

Marks safety-related feedback for

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

— 83 —



**3.4. Sequence diagramming**

Figure 13 : Sequence Diagram - Administrator Authentication

— 84 —



Figure 14: Sequence Diagram - Bus Registration

— 85 —



Figure 15 : Sequence Diagram - Route Creation with Stops

— 86 —



*Figure 3.6: Sequence Diagram - Schedule Creation with Conflict Detection*

— 87 —



*Figure 3.7: Sequence Diagram - Trip Initiation by Driver*

— 88 —





Figure 16 : Sequence Diagram - Real-Time Stop Update

Figure 17 : Sequence Diagram - Incident Reporting by Driver

— 89 —



Figure 18 : Sequence Diagram - Passenger Feedback Submission

— 90 —



Figure 19 : Sequence Diagram - Route Search by Passenger

— 91 —



Figure 20 : Sequence Diagram - Analytics Report Generation

**3.5. User Interface Prototyping**

User interface prototyping, as described by Scott Ambler, involves creating a preliminary version of an application's interface to test its design and functionality \(Ambler, 2012\). This process aims to ensure a user-friendly, efficient, and aesthetically pleasing interface that meets user needs. It allows for early issue identification, user feedback, and iterative design improvements, before full implementation. 

— 92 —





This section presents the visual layout and design of the system through the UI prototype images illustrated below. 

Figure 21 . Home page- for passenger

Figure 22 . feedback page - for passenge

— 93 —



Figure 25 . Driver Login - for driver

— 94 —



Figure 27. Incident report page - for driver

— 95 —



Figure 28 admin login - for admin

— 96 —



Figure 29 . admin dashboard - for admin

— 97 —





Figure 30 . bus management - for admin

Figure 31 . driver management - for admin

**CHAPTER FOUR**

**4. Conclusion**

The Public Bus Tracking and Scheduling System project has been meticulously designed and developed to address the critical challenges facing urban public transportation in Addis Ababa and other Ethiopian cities. The current reliance on manual scheduling, fragmented data systems, and lack of real-time information has led to significant inefficiencies, passenger dissatisfaction, unreliable service delivery, and limited operational oversight. This project offers a transformative solution by introducing a centralized, web-based platform that bridges the gap between transport authorities, bus operators, drivers, and passengers. 

Through its carefully designed features, the system provides comprehensive bus and driver registration, intelligent route and schedule management with conflict detection, 

— 98 —

real-time trip tracking and incident reporting, passenger information access with map visualization, and an analytics dashboard for data-driven decision-making. The inclusion of multiple bus operators \(Anbessa, Sheger, and Velocity\) ensures broad coverage, while the scalable architecture prepares the platform for expansion to other Ethiopian cities such as Dire Dawa, Mekelle, Bahir Dar and Hawassa. These innovations position the system as a valuable tool for modernizing urban transport while improving service quality and operational efficiency. 

The project's success has been supported by a structured development approach. By adopting the Agile \(Scrum\) methodology, the team ensured continuous feedback from stakeholders, including officials from bus drivers, and passengers, allowing iterative improvements that align with real-world operational needs. Object-oriented analysis provided clarity in system design through comprehensive UML diagrams, while modern web technologies \(Next.js, Node.js, MongoDB, and Prisma\) ensured scalability, performance, and maintainability. A phased work plan with clear milestones ensured that the project remained on schedule and within the constraints of an academic timeline. 

The potential impact of the Public Bus Tracking and Scheduling System is significant across multiple stakeholder groups. For passengers, the system reduces uncertainty and waiting times by providing accurate route and schedule information, offers a transparent feedback mechanism to report service issues and suggestions, and improves overall travel experience through better service coordination. For drivers and supervisors, it enables faster and more efficient incident reporting through digital dashboards, provides clearer route and schedule assignments, and reduces unjust blame for delays by maintaining accurate operational records. For administrators and transport authorities, the platform delivers centralized management of buses, routes, and schedules, real-time monitoring and oversight of bus operations, and analytics and reports that support strategic planning and performance evaluation. At the city level, the system contributes to improved efficiency of urban transport infrastructure, reduced traffic congestion through better coordination, support for sustainable mobility and environmental goals, and alignment with Ethiopia's national digital transformation and smart city strategies. 

— 99 —

Beyond immediate operational benefits, the project addresses long-term goals by creating a foundation for data-driven transport planning, establishing a scalable model that can be adapted to other cities, and demonstrating how digital solutions can modernize public services in developing countries. The system's modular architecture and use of open web standards ensure that future enhancements. 

The development process itself has been a valuable learning experience for the project team. Students gained practical experience in full-stack web development, database design and management, API development, and cloud deployment strategies. The project also developed essential soft skills including stakeholder engagement and requirements gathering, project management and Agile methodology application, problem-solving in real-world contexts, and technical documentation and presentation. 

This hands-on experience with modern technologies and methodologies has enhanced both academic understanding and professional readiness. 

In conclusion, the Public Bus Tracking and Scheduling System represents a landmark solution that redefines the way public bus services are managed in Ethiopian cities. 

By solving key challenges related to scheduling, tracking, information access, and operational oversight, the platform stands to enhance urban mobility, empower transport workers, and deliver better service outcomes for millions of daily commuters. Its successful implementation sets a benchmark for innovation in the transport sector and provides a scalable foundation for future enhancements and geographic expansion. The project demonstrates that with careful planning, stakeholder engagement, and appropriate technology choices, digital transformation can significantly improve public services even in resource-constrained environments. 

**REFERENCES**

*1. Addis Ababa City Administration. \(2022\). Addis Ababa integrated development* *master plan. City Planning Commission. *

*2. Addis Ababa Road and Transport Bureau. \(2023\). Public transport regulations* *and operational guidelines. *

*3. Addis Map Transit. \(2024\). Addis Ababa bus routes and stop information. *

*https://addismaptransit.com*

— 100 —

*4. Anbessa City Bus Service Enterprise. \(2023\). Operational information and* *service descriptions. *

*5. Google. \(2024\). Google Maps: Mapping and transit visualization services. *

*https://maps.google.com*

*6. Moovit. \(2024\). Public transport routes and real-time transit information for* *Addis Ababa. https://moovitapp.com*

*7. Sheger Mass Transit Enterprise. \(2023\). Service operations and route* *information. *

*8. Supabase Inc. \(2024\). Supabase database and back-end documentation. *

*https://supabase.com/docs*

*9. Velocity Bus Enterprise. \(2024\). Electric bus operations and fleet information*

*\[Internal report/Field data\]. *

*10. Vercel. \(2024\). Next.js framework documentation. https://nextjs.org/docs*

*11. World Bank. \(2020\). Ethiopia – Urban transport development program. World* *Bank Group. *

*12. World Wide Web Consortium. \(2023\). Web content accessibility guidelines* *\(WCAG\) 2.1. https://www.w3.org/TR/WCAG21/. *

**APPENDICES**

**Appendix A: List of Acronyms**

Acronym

Full Form

AARTB

Addis Ababa Road and Transport Bureau

ACBSE

Anbessa City Bus Service Enterprise

API

Application Programming Interface

CI/CD

Continuous Integration / Continuous Deployment

CPU

Central Processing Unit

CRUD

Create, Read, Update, Delete

CSS

Cascading Style Sheets

ETA

Estimated Time of Arrival

ETB

Ethiopian Birr

— 101 —

Acronym

Full Form

GB

Gigabyte

GPS

Global Positioning System

HSL

Hue, Saturation, Lightness

HTML

HyperText Markup Language

IDE

Integrated Development Environment

JSON

JavaScript Object Notation

JWT

JSON Web Token

KPI

Key Performance Indicator

MVP

Minimum Viable Product

OOA

Object-Oriented Analysis

PC

Personal Computer

RAM

Random Access Memory

RBAC

Role-Based Access Control

SEO

Search Engine Optimization

SMTE

Sheger Mass Transit Enterprise

UI

User Interface

UML

Unified Modeling Language

UPS

Uninterruptible Power Supply

UX

User Experience

WBS

Work Breakdown Structure

**Appendix B: Glossary of Terms**

 **Administrator**

A user role responsible for managing the system, including routes, schedules, buses, and driver accounts. 

 **Back-end**

The server-side part of the web application that handles logic, database interactions, and authentication. 

— 102 —

 **Bus**

A public transport vehicle registered in the system with specific capacity and operator details. 

 **Conflict Detection**

An automated system feature that identifies and prevents overlapping schedules or resource allocations. 

 **Dashboard**

A graphical user interface that provides a centralized view of relevant information and controls for specific user roles. 

 **Feedback**

Input provided by passengers regarding service quality, used for analysis and improvement. 

 **Front-end**

The client-side part of the web application that users interact with directly. 

 **Incident**

An unplanned event such as a breakdown, accident, or delay that affects bus operations. 

 **Passenger**

A user who utilizes the public bus system and accesses the platform for route information. 

 **Route**

A predefined path consisting of a start point, end point, and intermediate stops. 

 **Schedule**

A planned assignment linking a bus, driver, and route to a specific time slot. 

 **Stakeholder**

Any individual or group involved in or affected by the project, such as AARTB, drivers, and passengers. 

 **Stop**

A designated location along a route where buses pick up and drop off passengers. 

— 103 —

 **Terminal**

A major station serving as the origin or destination for multiple bus routes. 

 **Trip**

The actual execution of a schedule by a driver, tracked in real-time. 

 **Web Socket**

A communication protocol enabling real-time, two-way interaction between the server and client. 

 **Wire-frame**

A visual guide that represents the skeletal framework of a website or application interface. 

**Appendix C: Questionnaire and Interview Questions**

The following questionnaires were employed to gather requirements and understand the current challenges of the public transport system from the perspective of passengers and the bus administration. 

**C.1 Passenger Questionnaire**

**Introduction**

Thank you for participating in this survey about the Public Bus Service. Your insight as a passenger is crucial for improving the transportation experience. This brief questionnaire will take about 5-10

minutes to complete, and your responses will remain confidential. We appreciate your time. 

**1. How frequently do you use public bus transportation? **

 Daily

 A few times a week

 Rarely

 Never

**2. What is your primary challenge when using the public bus system? **

 Long waiting times

 Lack of arrival time information

 Overcrowding

 Security concerns

— 104 —

 Other: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**3. On average, how long do you wait for a bus during peak hours? **

 0 - 15 minutes

 15 - 30 minutes

 30 - 60 minutes

 More than an hour

**4. Do you currently have any way to know the exact location or arrival time** **of your bus before you reach the station? **

 Yes

 No

**5. How do you currently plan your trips? **

 I just go to the station and wait

 I ask people at the station

 I use a printed schedule \(if available\)

 Other

**6. Have you ever missed an important event or been late to work/school due** **to unpredictable bus schedules? **

 Yes

 No

**7. If there was a mobile application that allowed you to track buses in real-time and view schedules, would you use it? **

\[ \] Yes

\[ \] No

**8. What specific features would you value most in a bus tracking app? \(Select** **all that apply\)**

 Real-time bus location on a map

 Estimated Time of Arrival \(ETA\)

 Trip planning/Route navigation

 Digital ticketing/payment

— 105 —

 Seat availability status

**9. Would you recommend a real-time bus tracking system to other**

**passengers? **

 Strongly Recommend

 Recommend

 Would not recommend

**C.2 Interview Questions for Bus Administration**

**Introduction**

We are conducting a study to design a Centralized Public Bus Tracking and Scheduling System. Since your enterprise plays a key role in the city’s transport network, we would like to understand your current technical capabilities and operational challenges. 

**1. Does your organization currently have a digital system for fleet** **management? **

 Yes, we have a fully digitized system. 

 We have a partial system \(e.g., GPS only\). 

 No, we rely on manual processes. 

**2. You mentioned having GPS and video capability on buses. Is this data** **currently accessible to passengers in any way? **

 Yes, via a website/app. 

 No, it is strictly for internal monitoring. 

 Other: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**3. How are bus schedules currently created and managed? **

 Manually \(Excel/Paper\)

 Using specialized scheduling software

 Dynamic/Real-time adjustment system

**4. How do you currently communicate schedule changes or delays to** **passengers? **

 We don’t have a direct channel. 

 Through station dispatchers. 

— 106 —

 Social media / Website. 

 Other

**5. How do drivers report their status or start their trips? **

 Paper logbooks at terminals. 

 Radio communication. 

 Mobile app / Digital terminal. 

**6. What is the main challenge you face in managing bus frequency and route** **adherence? **

 Traffic congestion causing unpredictable delays. 

 Lack of real-time visibility on driver performance. 

 Difficulty in dynamic rescheduling. 

 Shortage of buses/drivers. 

**7. Does your current cash flow or ticketing system integrate with any external** **API s or passenger apps? **

 Yes

 No

 Planned for future

**8. Would your administration be willing to integrate with a centralized public** **transit platform that shares real-time data with passengers? **

 Yes, fully supportive. 

 Maybe, depending on data privacy contracts. 

 No, we prefer to keep our data internal. 

**9. What are the key performance indicators \(KPI s\) you currently track? **

 Fuel consumption

 Driver working hours

 Daily revenue

 on-time performance

 All of the above

— 107 —


# Document Outline

+ EXAMINATION BOARD  
+ ACKNOWLEDGMENT 
+ TABLE OF CONTENT 
+ LIST OF TABLES 
+ LIST OF FIGURES 
+ CHAPTER ONE 
+ 1. Introduction  
	+ 1.1. Overview 
	+ 1.2. Background of the Organization 
	+ 1.2.1. Addis Ababa Road & Transport Bureau \(AARTB\) 
	+ 1.2.2. Anbessa City Bus Service Enterprise \(ACBSE\) 
	+ 1.2.3. Sheger Mass Transit Enterprise \(SMTE\) 
	+ 1.2.4 Private Bus Operators \( Velocity Bus\) 
	+ 1.3.Statement of the Problem 
	+ 1.3.1.Passenger Challenges 
	+ 1.3.2. Driver and Supervisor Challenges 
	+ 1.3.3.Administrative Challenges 
	+ 1.3.4.City-Level Challenges 
	+ 1.4.Objectives of the Project 
	+ 1.4.1. General Objective 

+ The general objective of this project is to design  
	+ 1.4.2. Specific Objectives of the Project 

+ 1.5. Feasibility Study  
	+ 1.5.1.Technical Feasibility 
	+ 1.5.2.Economic Feasibility 
	+ 1.5.3.Operational Feasibility 

+ 1.6.Significance of the Project 
+ 1.7. Beneficiaries of the Project 
+ 1.8. Methodology  
	+ This project employs a mixed-methods approach for  
	+ 1.8.1. Data Sources and Collection Methods  
		+ 1.8.1.1.Primary Data Sources  
			+ Primary Data Collection Methods 

		+ 1.8.1.2. Secondary Data Sources  
			+ Secondary Data Collection Methods 


	+ 1.8.2.System Development Methodology 

+ 1.9.Development Tools and Technologies  
	+ 1.9.1.Frontend Technologies 
	+ 1.9.2.Backend Technologies 
	+ 1.9.3. Database Technologies 
	+ 1.9.4.Documentation & Modeling Tools 
	+ 1.9.5.Deployment Environment 
	+ 1.9.6. Development Environment / IDE 

+ 1.10.Scope of the Project  
	+ The scope defines the boundaries of the Public Bus 

+ 1.11. Risks, Assumptions, and Constraints 
+ 1.12.Phases and Deliverable 
+ 1.13.Work Breakdown Structure \(WBS\) 
+ 1.14.Project Schedule 
+ CHAPTER TWO 
+ 2.Business Area Analysis and Requirement Definition  
	+ 2.1.Overview 
	+ 2.2.Business area analysis 
	+ 2.2.1. Activities / functions of the organization  
		+ I.Addis Ababa Road & Transport Bureau — AARTB 

	+ B.Bus Operating Enterprises and Associations  
		+ C.Bus Drivers  
		+ D.Passengers  

	+ 2.2.2.Problems of the current system\(Using the PIECES Fr  
		+ 1\)Performance Issues 
		+ 2\)Information Deficiencies 
		+ Critical information gaps impact all stakeholders  
		+ 3\)Economic Inefficiencies 
		+ Current practices result in significant resource w 
		+ 4\)Control Weaknesses 
		+ The system currently lacks effective management an 
		+ 5\)Efficiency Problems 
		+ 6\)Service Quality Shortcomings 
		+ Passengers often experience frustration and dissat 

	+ 2.2.3. Forms and Reports of the Existing System 
	+ 2.2.4. Players of the Existing System 
	+ B.Bus Operating Enterprises and Associations 
	+ C.Drivers  
	+ D.Passengers  
		+ Passengers are the end beneficiaries of the system 
		+ I.Regular Passengers 
		+ II.Occasional Passengers 
		+ III.Vulnerable Passengers 

	+ E.Mechanics and Technicians 
	+ 2.3.Requirements Definition 
	+ 2.3.1.Functional Requirements 
	+ 2.3.2. Non-Functional Requirements 

+ CHAPTER THREE 
+ 3.Object Oriented Analysis  
	+ 3.1. Overview 
	+ 3.2.Use Case Modeling 
	+ 3.2.1.UI Identification 
	+ 3.2.2.Business Rules Identification 
	+ 3.2.3.Actor Identification 
	+ 3.2.4.Designing the Use Case Diagram 
	+ 3.2.5.Use Case Description 

+ 3.3. Conceptual Modeling  
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
	+  Feedback  

+ 3.4. Sequence diagramming 
+ 3.5. User Interface Prototyping 
+ CHAPTER FOUR 
+ 4. Conclusion 
+ REFERENCES 
+ APPENDICES  
	+ Appendix A: List of Acronyms 
	+ Appendix B: Glossary of Terms 
	+ Appendix C: Questionnaire and Interview Questions



