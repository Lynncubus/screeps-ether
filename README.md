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
- caching basic stuff like my own creeps in a room.

	At this point we've been doing stuff like Room.find, which can be cpu expensive on every call. A simple loop over all the rooms with some basic stuff like Room.myScreeps would simplify and lower cpu cost