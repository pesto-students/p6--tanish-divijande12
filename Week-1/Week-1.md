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