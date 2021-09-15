# Comic Reader

Application for viewing folders of image files, meant to be used for comics. Allows seamless transition between folder 
directories, usually representing the different chapters of the comic. 

## Installation

- `git clone https://github.com/lschpmn/comic-reader.git`
- `npm i`
- `./node_modules/.bin/ts-node index.ts`

## Usage

Star the application, then on the top right click the navigation button to change parent directory. All sub folders for 
the current parent directory is displayed on the left. Navigate through them to find your preferred starting point and 
double-click the image. The comic will display that image in either full screen or the pictures full resolution, whichever 
is smaller. Clicking on the right side will advance the comic, the left side will go back. The application automatically 
searches the directory structure to find the next chapter of your comic and will allow you to continue reading without 
interruption. 
