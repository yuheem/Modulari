# README

---

# Proposed Level of Achievement

Gemini

Test the app using the link below :)

[https://modulari.netlify.app/](https://modulari.netlify.app/)

Access to Modulari github: [https://github.com/yuheem98/Modulari](https://github.com/yuheem98/Modulari)

# Motivation

When you are fresh out of tertiary education, researching and considering prospective courses to apply for in university can be a daunting task. While many of us have a rough idea of what the course entails and the job opportunities it brings, many are still **uncertain** of whether their choice is a right fit for them. Furthermore, it is not always clear **what to expect** from your course.

With a plethora of modules available for prospective students, many will find it **confusing** and **complex** to get a full picture of what to expect and learn in their course of choice. This problem extends to current undergraduates as well. Many current undergraduates may be **unsure** of \***\*how to **plan** which modules to take to ensure that they will graduate on schedule. They may also find it difficult to source for information on **specific modules\*\* required to achieve their desired specialization.

We believe such problems arise due to a lack of a visualization tool which can help students have a better way to conceptualize how each module is related to each other. Thus, we would like to create one for the benefit of current and prospective students.

# Aim

We want to provide a tool to help current and prospective students plan their track in academia by providing clarity and insight through visualizing their university course pathway.

# User Stories

1. As a student who is deciding on which course to choose in university, I want to see what skills and abilities I will be able to gain by looking at a mapping of the modules I will complete in the future.

2. As a student who is deciding on how to plan my modules based on the area I wish to specialize in, I want to be able to quickly see all the prerequisite modules and what they will eventually map to.

3. As a student, I am confused by all the information posted online in text. I want a visual aid to help me see which modules I have to take in order to obtain my degree and fulfill any specialization requirements.

4. As a student, I would like to be able to jump quickly to information about related modules in the specialization I am interested in.

# Scope of Project

**Modulari** provides a web-based graphical user interface for students to generate graphs to help students better able to visualize their university pathway.

### **Who is Modulari intended for?**

1. Prospective NUS students
   - Will be able to better visualize what their years of studying in NUS will be like (e.g what modules they will be taking)
   - Will be able to gain a better understanding of what to expect in their specified course/degree by keying in the modules in their degree requirements
2. Current NUS students
   - Will be able to better plan what modules to take to graduate smoothly
   - Will be able to better plan modules to achieve their specialization of choice

# Core Features

Modulari is implemented using HTML, CSS, Javascript as well as D3.

Any module information shown in Modulari is scraped from NUSMods. Therefore, Modulari only acts as a visualisation and planning tool for students and any errors in the module information including but not exclusive to prerequisites, exam information, SU information etc is due to error in information by NUSMods.

### Starting page

- When users first open Modulari, a legend of the graph will be shown to users (Figure 1)
- After closing the legend, users will be able to view the legend again by clicking on the ? button at the top right corner (circled in red in Figure 2)

![README_images/README_legend.png](README_images/README_legend.png)

Figure 1: Starting page displaying legend

![README_images/README_legend_button_circled.png](README_images/README_legend_button_circled.png)

Figure 2: Question-mark button (circled in red) to open the legend for future reference

### **Module Map Generator**

The graph shown in the Module Map Generator is implemented using D3 and is based on:
[https://bl.ocks.org/agnjunio/fd86583e176ecd94d37f3d2de3a56814](https://bl.ocks.org/agnjunio/fd86583e176ecd94d37f3d2de3a56814)

[https://bl.ocks.org/ravi4j/0529296064dd32ba14e5907264f9e8f4](https://bl.ocks.org/ravi4j/0529296064dd32ba14e5907264f9e8f4)

- To generate prerequisite trees for interested modules, users will need to key in their desired module code into the search bar.
  1. If an invalid module code is detected, an alert will be shown to the users letting them know that the module code keyed in is invalid (Figure 3)
  2. If the module is already shown in the graph, a similar alert will be shown to users letting them know that the module is already shown in the graph (Figure 4)

![README_images/README_invalid_module_code.png](README_images/README_invalid_module_code.png)

Figure 3: Alert shown when invalid module code is added

![README_images/README_module_already_shown.png](README_images/README_module_already_shown.png)

Figure 4: Alert shown when module added is already shown in the graph

- Upon a valid module code, the app will generate the prerequisite tree for the specified module
- Prerequisite tree is represented as a coloured directed-acyclic graph

  1. Each node/circle represents a module with its respective module code and is colour-coded based on the level of the module as shown in the legend, with nodes/circles corresponding to the module code keyed in by users bolded with a red border
  2. Modules which are a prerequisite of another module are connected by an edge (see below for more information regarding the different types of edges or look at the legend shown above in Figure 1)
  3. Each node/circle can be expanded to view its module description and other information when clicked (refer to Module Description feature and Figure 22 below for more details)
  4. Users will also be able to zoom in and out of the graph using the mousepad or a mouse, as well as move the prerequisite tree around by clicking on the grid and moving the mouse to its desired position (Figure 5 - 7)
  5. Nodes/circles are also able to be dragged around by clicking on the desired node/circle and dragging it to its desired position, any nodes/circles connected to it will move along with it as well
  6. By hovering over nodes/circles, the immediate prerequisites of the module, as well as the modules the hovered module is an immediate prerequisite of will be highlighted while any other modules in the graph will be faded. (Figure 8 & 9)

     ![README_images/README_es2660.png](README_images/README_es2660.png)

     Figure 5: Normal view of graph

     ![README_images/README_zoomed_out.png](README_images/README_zoomed_out.png)

     Figure 6: Zoomed out view of graph

     ![README_images/README_zoomed_in.png](README_images/README_zoomed_in.png)

     Figure 7: Zoomed in view of graph

     ![README_images/README_CS2104_normal.png](README_images/README_CS2104_normal.png)

     Figure 8: Prerequisite tree of CS2104

     ![README_images/README_CS2104_hover.png](README_images/README_CS2104_hover.png)

     Figure 9: When mouse is hovered over CS2030 (CS1010 is an immediate prerequisite of CS2030 and CS2030 is an immediate prerequisite of CS2104, CS2113 and CS2113T), while other modules in the prerequisite tree of CS2104 is faded

- Users will be able to add on modules they are interested in to generate the prerequisite tree of the added modules and see how they relate to the modules currently generated
  1. Assume module CS2040 is added, which would generate the prerequisite tree shown below. (Figure 10)
  2. If CS2030 is added next, since CS2030 and CS2040 share the same prerequisite of CS1010, the prerequisite tree of CS2040 and that of CS2030 will be merged to form the graph shown below. (Figure 11)
  3. If ES2660 is added next, as ES2660 and its prerequisites are unrelated to any of the modules currently displayed, prerequisite tree for ES2660 is separated from that of CS2040 and CS2030 (Figure 12)

![README_images/README_2040.png](README_images/README_2040.png)

Figure 10: Prerequisite tree generated when CS2040 (bolded with a red border) is added

![README_images/README_20402030.png](README_images/README_20402030.png)

Figure 11: Prerequisite tree generated when CS2030 (bolded with a red border) is added on top of CS2040

![README_images/README_es2660%201.png](README_images/README_es2660%201.png)

Firgure 12: Prerequisite tree generated when ES2660 (bolded in a red border) is added to the existing graph

- Different types of arrows are used to represent different types of prerequisite requirements for modules

  1. "OR" arrows are solid black arrows, "AND" arrows are dashed arrows and "AND-OR" arrows are coloured dashed arrows
  2. For the module CS2113 (Figure 13), it requires either only CS2040C or both CS2030 and CS2040 in order to fulfill the requirements for CS2113
  3. For the module CS3235 (Figure 14), it requires 3 modules to fulfill its prerequisites (CS2107, **either** CS2106 **or** CG2271, **AND** **either** CS2105 **or** EE4204)

     ![README_images/README_and-or.png](README_images/README_and-or.png)

     Figure 13: Prerequisites for CS2113

  ![README_images/README_and_arrows.png](README_images/README_and_arrows.png)

  Figure 14: Prerequisites for CS3235

### Filter Sidebar

- Prerequisite tree can be modified to match user's preferred filters via the user interface

  1. Users can open the sidebar using the button at the top left hand corner (circled in red in Figure 15)
  2. Users will be able to filter the tree by level of module, faculty, number of MCs and if the module is examinable or not (Figure 17 - 21)

  ![README_images/README_sidebar_circled.png](README_images/README_sidebar_circled.png)

  Figure 15: Sidebar button circled in red

  ![README_images/README_sidebar.png](README_images/README_sidebar.png)

  Figure 16: Filter sidebar

  ![README_images/README_filter-2000.png](README_images/README_filter-2000.png)

  Figure 17: Filter graph by level

  ![README_images/README_filter-computing.png](README_images/README_filter-computing.png)

  Figure 18: FIlter graph by faculty

  ![README_images/README_filter-mc.png](README_images/README_filter-mc.png)

  Figure 19: Filter graph by number of MCs

  ![README_images/README_filter-exam.png](README_images/README_filter-exam.png)

  Figure 20: Filter graph by exam information

  ![README_images/README_filter-multioptions.png](README_images/README_filter-multioptions.png)

  Figure 21: Filter graph using all 4 options

### Module Description

- General information of the modules will be included (Figure 22)
  1. Module code
  2. Name of module
  3. Number of module credits
  4. Information whether there is a final exam
  5. Information about SU option
  6. Prerequisites of modules in words

![README_images/README_mod_info.png](README_images/README_mod_info.png)

Figure 22: Module information for CS2106

- A link will be provided at the bottom of every module description and when clicked on, the NUSMods page on the module selected will open in a new tab or window. Users will then be able to access more information on the module from the timetable to reviews by other NUS students (Figure 23)

![README_images/README_mod_info_circled_link.png](README_images/README_mod_info_circled_link.png)

Figure 23: Link to NUSMods page for CS2106 circled in red

### Deleting modules from prerequisite tree

- To delete modules from the prerequisite tree, click on the red trashcan icon (underlined red) in the top right corner of the grid (Figure 24).
  1. Users are required to click on the specified module before clicking the trash icon to delete the module. =
  2. If no module is selected to be deleted, an alert will appear at the bottom of the page informing users what to do. (Figure 25)
  3. Before a module is deleted, a prompt will appear asking the user to confirm if they want to delete the selected module from the tree. (Figure 26)
  4. Figure 27 shows the prerequisite tree displayed after deleting a module

![README_images/README_underlined_icons.png](README_images/README_underlined_icons.png)

Figure 24: Delete module (underlined red) and clear modules (underlined green) icons

![README_images/README_del_error.png](README_images/README_del_error.png)

Figure 25: Alert shown when no module is selected to be deleted

![README_images/README_del_confirm.png](README_images/README_del_confirm.png)

Figure 26: Confirmation prompt to delete module CS2106

![README_images/README_del_circled.png](README_images/README_del_circled.png)

Figure 27: Prerequisite tree displayed after deleting CS2106. Prerequisites of CS2106 circled in red.

- To clear all modules from the prerequisite tree, click on the broom icon (underlined green) in the top right corner of the grid (Figure 24).
  1. Before clearing all the modules, a prompt will appear asking the user to confirm if they want to clear everything from the tree. (Figure 28)
  2. If confirmed, all modules will be cleared from the grid (Figure 29)

![README_images/README_clear_confirm.png](README_images/README_clear_confirm.png)

Figure 28: Confirmation prompt to clear all modules

![README_images/README_clear.png](README_images/README_clear.png)

Figure 29: All modules cleared

### Module Planner

- Modulari provides a template for users to plan modules with. Users are able to access this planner by clicking on the calendar icon (circled red in Figure 30) to open up the module planner (Figure 31)
- The default module planner includes 2 tabs (with 5 module slots each) titled Sem 1 and Sem 2 respectively for users to plan for both semesters in the current academic year if desired so (Figure 32).

![README_images/README_planner_icon.png](README_images/README_planner_icon.png)

Figure 31: Module planner icon circled in red

![README_images/README_default_planner.png](README_images/README_default_planner.png)

Figure 32: Default planner template

- Users are able to rename title of each tab by clicking on the pen icon next to the title in the planner (Figure 33).
  1. To confirm the change in title of the current tab, users are required to click on the tick to confirm the change in title
  2. In the event that another tab has the same title as an already existing tab, a warning will appear to alert the users and prompt them to change the title of the planner (Figure 34)

![README_images/README_planner_rename_title.png](README_images/README_planner_rename_title.png)

Figure 33: Rename Sem 1 title to HelloWorld

![README_images/README_planner_rename_alert.png](README_images/README_planner_rename_alert.png)

Figure 34: Warning that appears when user tries to rename a tab with a title that already exists

- Users will be able to add more tabs to the planner should they want to plan ahead of the current academic year by clicking on the plus icon next to the current tabs. A new tab will then be created with no title (Figure 35).
- Likewise, should users want to delete tabs, they can click on the cross icon next to the title in each tab to delete the tab
  1. If users delete all the tabs in the planner, a message will appear to add tabs using the plus button (Figure 36)

![README_images/README_planner_untitled_tab.png](README_images/README_planner_untitled_tab.png)

Figure 35: New tab created with no title

![README_images/README_planner_no_tab.png](README_images/README_planner_no_tab.png)

Figure 36: No tabs message

- Users can add or delete module slots in each planner by clicking on the plus and minus buttons found at the bottom right of the planner (Figure 37 & 38)
  1. If users delete all the module slots in the planner, a message will appear to prompt the user to add module slots using the plus button below

![README_images/README_planner_add_modules.png](README_images/README_planner_add_modules.png)

Figure 37: Added 2 new module slots to the default template of 5 module slots

![README_images/README_planner_no_modules.png](README_images/README_planner_no_modules.png)

Figure 38: No module slots message

- An apply button can be found at the bottom left corner of the planner should users want to see how the modules they plan to take compare to the prerequisite tree they have generated (Figure 39 & 40)
  1. Modules keyed in to the planner will be highlighted if present in the tree while any other modules not found in the planner will be faded

![README_images/README_planner_before_apply.png](README_images/README_planner_before_apply.png)

Figure 39: Before modules in planner are applied to the graph

![README_images/README_planner_after_apply.png](README_images/README_planner_after_apply.png)

# How is Modulari different from NUSMods

While NUSMods does provide a prerequisite tree for users to view how modules relate to one another, the prerequisite tree only displays the immediate prerequisites needed to take the module and does not show if the prerequisites needed to take the module has other prerequisites to be fulfilled. Modulari, however, plans to show all prerequisites, all the way to the level 1000 modules. This should allow for better planning as users will be able to easily see all the prerequisites that need to be fulfilled at a glance, which would be especially useful for higher-level modules.

![README_images/Untitled.png](README_images/Untitled.png)

Prerequisite tree shown on NUSMods for module CS4238 - only shows CS3235 as prerequisite but does not show the prerequisites to take CS3235 (shown below)

![README_images/Untitled%201.png](README_images/Untitled%201.png)

Prerequisite tree shown on NUSMods for module CS3235

![README_images/README_CS4238.png](README_images/README_CS4238.png)

Prerequisite tree shown on Modulari for CS4238

Furthermore, NUSMods only shows the prerequisite tree of one specific module, as such, it is difficult to see how 2 different modules are related to each other if at all. However, Modulari displays the prerequisite trees of interested modules in the same place. Thus it would be easier to visualise and plan what modules to take in the current semester and upcoming semesters.

# Testing Modulari

Before deploying Modulari for public testing, we did our own rounds of testing by adding modules and comparing the result to NUSMods to check for any discrepancies. By doing so, we realised that there were different conditions for prerequisites and we had to find a way to display the correct information visually. Thus, we decided to implement different types of arrows to indicate more complex prerequisite requirements. We also decided to add the prerequisite section in words in the module description if users prefer to view the immediate prerequisites in words for are still unfamiliar with the legend to quickly decipher the prerequisite requirements.

We also tested the performance of Modulari to see if there are any lags when a large number of modules are generated as well as if all the features work as they should be working.

After testing ourselves, we deployed the app via netlify and sent the link to our friends and family for testing and accumulated their feedback. Below is a table of some feedback during our testing.

[User-testing feedback](https://www.notion.so/a3f075c0408c478aa3f87c1bb1ad7db0)
