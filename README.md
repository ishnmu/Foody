# Foody
_A Simple Food Ordering application developed as a part of TaughtWorks Workshop for *Designing Microservices*_

Application has two independently deployable services (MicroServices)
	- ExperienceAPIs (Client Facing Service)
	- PaymentGateway (Dedicated Payment Services)

To run this application 

clone the repo
`git clone https://github.com/ishnmu/Foody.git`

switch to branch _session-three_ , as it has the full version
`git checkout session-three`

###### ExperienceAPIs

`cd ExperienceAPIs`

Install dependencies

`npm i`

Start

`node app.js` 

or 
you can also do `npm start`

Now Experience APIs will be up at [http://localhost:3000] 

###### PaymentGateway

`cd PaymentGateway`

Install dependencies

`npm i`

Start

`node app.js` 

or 
you can also do `npm start`

Now Experience APIs will be up at [http://localhost:3030] 

PS: You can also import *POSTMAN* Collection from this [link](https://www.getpostman.com/collections/b17ece42651a48c8edbc) for hitting the endpoint and have that as a reference for the contracts (payload).

