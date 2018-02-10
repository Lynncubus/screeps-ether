# Ether

Ether is an AI im writing for Screeps.

# Usage

Create file `.env` in root and edit it:
```
TOKEN=SCREEPS_TOKEN
```

Build and upload: `npm run build` or `gulp`

# Todo

- Make carrier able to construct. 
	
	carry-only creeps are useless on later levels

- role.defender
- role tiers
	
	In preperation for future we need to be able to build tiers from cheap too expensive.

- towers
- Auto path building

	To improve efficiency in swampy areas we want to construct pathways from important objects to resources

- Caching basic stuff like my own creeps in a room.

	At this point we've been doing stuff like Room.find, which can be cpu expensive on every call. A simple loop over all the rooms with some basic stuff like Room.myScreeps would simplify and lower cpu cost

- Cache paths to resources
	- In combinations with the path building

- Create concept for a manager that will manage everything from construction to energy sharing
	- One core manager under `Game.manager`
	- Has a memory slot under `Memory.manager`
	- Has sub modules based on the type of management
		- These have a memory slot under `Memory.manager.modules[module]`

- Body sorting

	To make creeps more tougher, we should create a way to sort body parts on importance and logic.
	If a creep is unable to do its job due to lost body parts, kill it.
