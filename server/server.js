const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const { inspect } = require('util');

server.use(bodyParser.json());
server.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

const PORT = process.env.PORT || 3001;

class Users {
	constructor() {
		this.users = [];
		this.objId = 0;
	}

	add(name) {
		this.users.push({ name: name, id: this.objId++ });
		return this.objId - 1;
	}

	exists(id) {
		return this.users.find(value => {
			return value.id === Number(id);
		});
	}
}

class Rooms {
	constructor(users) {
		this.rooms = [{ name: "main", users: [], text: [], id: 0 }];
		this.objId = 1;
		this.users = users;
	}

	add(name) {
		this.rooms.push({ name: name, users: [], text: [], id: this.objId++ });
		return this.objId - 1;
	}

	addUser(roomId, userId) {
		const room = this.getRoom(roomId);
		if (!room) {
			throw Error("Room not found");
		}

		if (!this.users.exists(userId)) {
			throw Error("User not found");
		}
		room.users.push(userId);
	}

	deleteUser(roomId, userId) {
		const room = this.getRoom(roomId);
		if (!room) {
			throw Error("Room not found");
		}

		if (!this.users.exists(userId)) {
			throw Error("User not found");
		}
		room.users = room.users.filter(value => {
			return Number(userId) !== value;
		});
	}

	addText(roomId, userId, text) {
		const room = this.getRoom(roomId);
		if (!room) {
			throw Error("Room not found");
		}

		if (!this.users.exists(userId)) {
			throw Error("User not found");
		}

		room.text.push({
			text: text,
			userId: userId
		});
	}

	getRooms() {
		return this.rooms.map(value => {
			return { name: value.name, id: value.id };
		});
	}

	getRoom(id) {
		return this.rooms.find(value => {
			return value.id === Number(id);
		});
	}
}
const users = new Users();
const rooms = new Rooms(users);

server.post("/users", (req, res, next) => {
	console.info(`User joined ${inspect(req.body)}`);
	const userId = users.add(req.body.name);
	res.json({
		userId: userId
	});
});

server.get("/users", (req, res, next) => {
	res.json(users.users);
});

server.get("/rooms", (req, res, next) => {
	res.json(rooms.getRooms());
});

server.post("/rooms", (req, res, next) => {
	console.info(`Adding a room ${inspect(req.body)}`);
	const roomtId = rooms.add(req.body.name);
	res.json({
		roomId: roomtId
	});
});

server.get("/rooms/:roomId", (req, res, next) => {
	const room = rooms.getRoom(req.params.roomId);
	if (!room) {
		res.status(404).send("Not found");
		return;
	}

	res.json({
		usersCount: room.users.length,
		textCount: room.text.length,
		name: room.name
	});
});

server.get("/rooms/:roomId/users", (req, res, next) => {
	const room = rooms.getRoom(req.params.roomId);
	if (!room) {
		res.status(404).send("Not found");
		return;
	}

	if (!req.query.from || !req.query.to) {
		res.status(400).send("Missing query params of 'from' and 'to'");
		return;
	}

	res.json({
		users: room.users.slice(req.query.from, req.query.to)
	});
});

server.post("/rooms/:roomId/users", (req, res, next) => {
	try {
		console.info(`Adding a user ${inspect(req.body)}`);
		rooms.addUser(req.params.roomId, req.body.userId);
		res.status(200).send("SUCCESS");
	} catch (e) {
		res.status(404).send(e.message);
	}
});

server.delete("/rooms/:roomId/users/:userId", (req, res, next) => {
	try {
		console.info(`Deleting a user ${req.params.userId}`);
		rooms.deleteUser(req.params.roomId, req.params.userId);
		res.status(200).send("SUCCESS");
	} catch (e) {
		res.status(404).send(e.message);
	}
});

server.get("/rooms/:roomId/text", (req, res, next) => {
	const room = rooms.getRoom(req.params.roomId, res);
	if (!req.query.from || !req.query.to) {
		res.status(400).send("Missing query params of 'from' and 'to'");
		return;
	}
	if (room) {
		res.json(room.text.slice(req.query.from, req.query.to));
	} else {
		res.status(404).send("Room not found");
	}
});

server.post("/rooms/:roomId/text", (req, res, next) => {
	try {
		console.info(`Adding a text ${inspect(req.body)}`);
		rooms.addText(req.params.roomId, req.body.userId, req.body.text);
		res.status(200).send("SUCCESS");
	} catch (e) {
		res.status(404).send(e.message);
	}
});

server.listen(PORT, () => {
	console.log("Server running on port:", PORT);
});
