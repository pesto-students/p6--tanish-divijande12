# What is the main functionality of the browser?
A web browser takes you anywhere on the internet. It retrieves information from other parts of the web and displays it on your desktop or mobile device. The information is transferred using the Hypertext Transfer Protocol, which defines how text, images and video are transmitted on the web.
Browsers user internal cache which gets stored and the user can open the same webpage time and again without losing extra data.

# High level components of browser
1. The user interface:

This includes the address bar, back/forward button, bookmarking menu, etc. Every part of the browser display except the window where you see the requested page.

2. The browser engine: marshals actions between the UI and the rendering engine.

3. The rendering engine :

responsible for displaying requested content. For example if the requested content is HTML, the rendering engine parses HTML and CSS, and displays the parsed content on the screen.

4. Networking:

For network calls such as HTTP requests, using different implementations for different platform behind a platform-independent interface.

5. UI backend:

Used for drawing basic widgets like combo boxes and windows. This backend exposes a generic interface that is not platform specific. Underneath it uses operating system user interface methods.

6. JavaScript interpreter.

Used to parse and execute JavaScript code.

7. Data storage.

This is a persistence layer. The browser may need to save all sorts of data locally, such as cookies. Browsers also support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem.

It is important to note that browsers such as Chrome run multiple instances of the rendering engine: one for each tab. Each tab runs in a separate process.


![alt text](https://i.imgur.com/VcpjfPL.png)

# Rendering engine and its use

In a software application the rendering engine is the module that is reasonable for generating the graphical output. Basically the job of a rendering engine is to convert the applications internal model into a series of pixel brightness's that can be displayed by a monitor (or other graphical device e.g a printer). For example in a 3D game, the rendering engine might take a collection of 3D polygons as inputs (as well as camera and lighting data) and use that to generate 2D images to be outputted to the monitor.

In a type setting application the rendering engine might take a string a characters and font data (and other assets e.g. images) as inputs and convert them to well formatted image you see on screen or printed on a page.

Rendering engines are often written to take advantage of features of graphics cards (e.g. highly parallelized matrix operations). Programming rendering engines require a strong understanding of geometry. Rendering engines is one of the few areas where the effort of code optimization makes sense (e.g. it's not uncommon to have performance requirements like must output a frame every 1/60th of a second).

# Parsers (HTML,CSS, etc)

Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run, for example the JavaScript engine inside browsers.

The browser parses HTML into a DOM tree. HTML parsing involves tokenization and tree construction. HTML tokens include start and end tags, as well as attribute names and values. If the document is well-formed, parsing it is straightforward and faster. The parser parses tokenized input into the document, building up the document tree.

When the HTML parser finds non-blocking resources, such as an image, the browser will request those resources and continue parsing. Parsing can continue when a CSS file is encountered, but <script> tags—particularly those without an async or defer attribute—blocks rendering, and pauses parsing of HTML.

When the browser encounters CSS styles, it parses the text into the CSS Object Model (or CSSOM), a data structure it then uses for styling layouts and painting. The browser then creates a render tree from both these structures to be able to paint the content to the screen. JavaScript is also downloaded, parsed, and then executed.

JavaScript parsing is done during compile time or whenever the parser is invoked, such as during a call to a method.

# Script processors

The script processor executes Javascript code to process an event. The processor uses a pure Go implementation of ECMAScript 5.1 and has no external dependencies. This can be useful in situations where one of the other processors doesn’t provide the functionality you need to filter events.

The processor can be configured by embedding Javascript in your configuration file or by pointing the processor at external file(s).

processors:
  - script:
      lang: javascript
      source: >
        function process(event) {
            event.Tag("js");
        }

This loads filter.js from disk.

processors:
  - script:
      lang: javascript
      file: ${path.config}/filter.js

Parameters can be passed to the script by adding params to the config. This allows for a script to be made reusable. When using params the code must define a register(params) function to receive the parameters.

processors:
  - script:
      lang: javascript
      tag: my_filter
      params:
        threshold: 15
      source: >
        var params = {threshold: 42};
        function register(scriptParams) {
            params = scriptParams;
        }
        function process(event) {
            if (event.Get("severity") < params.threshold) {
                event.Cancel();
            }
        }
If the script defines a test() function it will be invoked when the processor is loaded. Any exceptions thrown will cause the processor to fail to load. This can be used to make assertions about the behavior of the script.

function process(event) {
    if (event.Get("event.code") === 1102) {
        event.Put("event.action", "cleared");
    }
    return event;
}

function test() {
    var event = process(new Event({event: {code: 1102}}));
    if (event.Get("event.action") !== "cleared") {
        throw "expected event.action === cleared";
    }
}

Configuration options

The script processor has the following configuration settings:

lang
This field is required and its value must be javascript.
tag
This is an optional identifier that is added to log messages. If defined it enables metrics logging for this instance of the processor. The metrics include the number of exceptions and a histogram of the execution times for the process function.
source
Inline Javascript source code.
file
Path to a script file to load. Relative paths are interpreted as relative to the path.config directory. Globs are expanded.
files
List of script files to load. The scripts are concatenated together. Relative paths are interpreted as relative to the path.config directory. And globs are expanded.
params
A dictionary of parameters that are passed to the register of the script.
tag_on_exception
Tag to add to events in case the Javascript code causes an exception while processing an event. Defaults to _js_exception.
timeout
This sets an execution timeout for the process function. When the process function takes longer than the timeout period the function is interrupted. You can set this option to prevent a script from running for too long (like preventing an infinite while loop). By default there is no timeout.
max_cached_sessions
This sets the maximum number of Javascript VM sessions that will be cached to avoid reallocation. The default is 4.

# Tree construction

The CSSOM and DOM trees are combined into a render tree, which is then used to compute the layout of each visible element and serves as an input to the paint process that renders the pixels to screen. Optimizing each of these steps is critical to achieving optimal rendering performance.

In the previous section on constructing the object model, we built the DOM and the CSSOM trees based on the HTML and CSS input. However, both of these are independent objects that capture different aspects of the document: one describes the content, and the other describes the style rules that need to be applied to the document. How do we merge the two and get the browser to render pixels on the screen?

TL;DR #
The DOM and CSSOM trees are combined to form the render tree.
Render tree contains only the nodes required to render the page.
Layout computes the exact position and size of each object.
The last step is paint, which takes in the final render tree and renders the pixels to the screen.
First, the browser combines the DOM and CSSOM into a "render tree," which captures all the visible DOM content on the page and all the CSSOM style information for each node.

![alt text](https://web-dev.imgix.net/image/C47gYyWYVMMhDmtYSLOWazuyePF2/b6Z2Gu6UD1x1imOu1tJV.png?auto=format&w=845)

To construct the render tree, the browser roughly does the following:

Starting at the root of the DOM tree, traverse each visible node.

Some nodes are not visible (for example, script tags, meta tags, and so on), and are omitted since they are not reflected in the rendered output.
Some nodes are hidden via CSS and are also omitted from the render tree; for example, the span node---in the example above---is missing from the render tree because we have an explicit rule that sets the "display: none" property on it.
For each visible node, find the appropriate matching CSSOM rules and apply them.

Emit visible nodes with content and their computed styles.

The final output is a render tree that contains both the content and style information of all the visible content on the screen. With the render tree in place, we can proceed to the "layout" stage.

Up to this point we've calculated which nodes should be visible and their computed styles, but we have not calculated their exact position and size within the viewport of the device---that's the "layout" stage, also known as "reflow."

# Order of script processing

Executable objects go through four execution stages. The second one is the generation stage. Scripts are generated during this stage. The time at which the script is generated depends on object attributes. The order in which scripts are processed in an object depends on which Process pages the scripts are on.

Script processing includes the following:

Execution Stages
Time of Processing
Order of Processing
Processing In Scripts
Execution Stages

To configure the object attributes correctly so that the script elements behave as you expect, you must understand the stages of execution that a task goes through. The task is activated, generated, processed (that is, executed on the target computer) and finally completed.

The following topics describe the execution stages and the individual steps that take place in each stage. Read them before starting with the Automation Engine scripting language:

Execution Stages

Activation

Generation

Processing

Completion

Time of Processing

The time at which the script is generated depends on the Generate Task at attribute that you define on the object Attributes page. You have two options:

Generate Task at: Activation time

The script is generated at the beginning of the generation stage.

Generate Task at: Runtime

The script is generated much later in the generation stage

Example

The following script uses a function to set the value of a variable to the current date and time:

:SET &CURRENTTIME# = SYS_TIME()

The actual date and time that the script returns depend on the point in time at which the task is generated. Assume that you have two tasks that are configured differently:

Task A is configured to be generated at activation time. The value of the variable is set immediately upon activation.

Task B is configured to be generated at runtime. The task is in a workflow that has several preceding tasks before Task B. Task B is generated when the preceding tasks have finished. The value of the variable is set to the actual time when the task is generated.

For more information about object attributes that concern generation, see Attributes Page. Read also Generating at Activation or at Runtime, where the implications of choosing either option are described in detail.

Important! If you exit the AWI after starting an object that is configured to be generated at activation, script generation may not have finished. If the script includes elements that require action, such as a :READ statement, you may not get the desired results.

Order of Processing

Depending on the type of object, the task may have more than one Process page on which you can write scripts. The scripts in the Process pages are processed in the following order:

Pre-Process page and Process page
Child Post Process page
Post Process page
For more information, see Process Pages.

Processing In Scripts

The Automation Engine processes scripts line by line. The results of executed script elements (such as the value of a variable that has been set) are regularly written to the AE database. This process is referred to as a commit. Other scripts can only access these new or modified values after the values have been committed.

When scripts run for longer times, the Automation Engine automatically makes a commit every 5 seconds. In addition, some script elements that require processes to complete also result in commits.

Examples

Some script elements start or stop tasks, and wait for the RunID of the task to be returned, therefore resulting in a commit. The following functions are examples of such script elements:

ACTIVATE_UC_OBJECT
CANCEL_UC_OBJECT
RESTART_UC_OBJECT
Some script statements require user interaction. The system waits for the user to react, so script statements such as the following also result in a commit:

:BEGINREAD... :ENDREAD
:READ
The :WAIT script statement instructs the system to wait for a specific length of time, and also results in a commit.

Tip: Use :WAIT to enforce a commit.

# Layout and painting how browser works

![alt text](https://www.freecodecamp.org/news/content/images/2019/06/dns_resolve.png)

# Diagram when user hits the url in the browser

![alt text](https://www.knowbe4.com/hubfs/How-The-Web-Works.jfif)