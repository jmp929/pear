# Developer README

## Pear: data pair lookup tool
This tool is for researchers who want to dynamically display data to survey respondents based on their inputs. With this tool, they can upload datasets, easily manage them, and use the API endpoint propped up by this application to query data from survey responses.

## Getting started
In order to run this application, you will need to install a few base packages. To note, this README assumes this being run on a linux operating system. In order to run this application locally, python3 and Node.js will need to be installed. If these are already installed, the following instructions can be ignored. If they are not, do the following. To install python3, one can use the brew command, specifically `brew install python`. For installing Node.js, one should again use brew by running `brew install node`. If all this is installed locally, one should have the necessary base packages.

Once all of that is installed, you should pull this repository to your local machine. In the same directory as this codebase, you also create a virtual environment to store the various other smaller packages necessary for running this application.  It is the preference of this team to use virtualenv for this. If this is not installed yet, and assuming python3 has been installed correctly at this point, the python package manager pip can be used to install it by running `pip install virutalenv`. Then, in the directory containing this codebase, one should run. `virtualenv venv`, which will create a virtual environment called venv.  After creating said virtual environment, one should then run `source venv/bin/activate`, which will launch the virtual environment. Once running within the virtual environment, one should then navigate into this codebase, where a requirements.txt file will be located, and run `pip install -r requirements.txt`. This will install all the other necessary packages for the python application to run correctly. Along with that, and again assuming Node.js is installed on your machine, one will need to run `nvm install` and `npm build` to install the necessary packages for the front end. Once all that is complete, you should have everything necessary installed.

Running this application should be very simple if everything up to this point has been installed correctly. Ensuring the virtual environment is activated and in the project directory, one simply needs to run `python manage.py runserver` to start up the server.  Along with starting up the server, one will also want to create themselves a super user account so they can see all portions of the site when it is running. This can be achieved by running `python manage.py createsuperuser` and then just following the commands prompted.

These instructions were last tested 11/12/21 by all members of our team, David Lundberg, Sam Lempp, and Joshua Parker, all on a linux operating system

## Testing
For running tests, on the backend, Django makes this very easy. All of the test are located in the test.py files in the applications of the project. In order to run these tests, all one needs to do is run `python manage.py test` and that will kick off all tests located within this files. Testing on the frontend was done with using Jest, a JavaScript test runner that works via jsdom, and also React's set of testing helpers called React Testing Library. In order to run the tests, one will input the command `npm run test`. If one is seeking the full coverage report regarding the frontend then one will simply run the command `jest --coverage`.

## Deployment
The app is deployed using Redhat Openshift on the Carolina Cloud Apps server. The frontend, backend, and database occupy different Kuuberntes containers in the Openshift project cluster. New developers should contact one of the original developers to be given access to the project (currently requires a UNC onyen login). In the code, comments are given for which settings must be changed for deployment vs local productions. It is also recommended that developers download the Openshift command-line-interface to manage the deployment alongside Openshift's web UI.

## Techonologies Used
This application uses PostgreSQL for the database and Django its framework. The codebase is split between the backend, which is written in Python, and the frontend which is done with React. Our application is then deployed on Carolina Cloud Apps. To see the ADRs for these decisions, please visit the ADRs file in the base directory the repository.

## Contributing
In order to start contributing to this application, a new developer must do a few things. First off, this team utilizes the Agile method for development. As such, said developer would need to learn the basics of that. For keeping track of small efforts going on within the project, this team uses a Trello board, which a new developer would have to gain access to. Along with that, the developer would need to be invited to contribute to this GitHub repository. For styling and testing, this team is very open to new styles and methods. Currently, we mainly rely on unit tests for this application and adhere to PEP3 for python styling. For more information on the structure of this team, please reference our team website [here](https://samlempp.github.io/ZIP-Code-Lookup/)

## Authors

The major authors of this project have been David Lundberg, Sam Lempp, and Joshua Parker. David has primarily taken care of designing and building out the frontend. Josh has. Run point on building out the backend and the database structure. Last but not least, Sam has contributed to the functionality of the frontend, along with connecting the backend to the frontend and deploying this application.

## License

MIT License

Copyright (c) 2021 Tyler Scott

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements

We would like extend a big thank you to Thomas Nielsen, who has mentored us along with this project. Along with Thomas, we also want to express our thanks to our client Tyler Scott who has been very helpful thus far. Lastly, our team would like to thank Professor Terrell for his lessons this semester that have helped us along the way.
