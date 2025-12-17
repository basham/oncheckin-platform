const checkInIdDelimiter = "|";

export function decodeCheckInId(id) {
	const [participantId, eventId] = id.split(checkInIdDelimiter);
	return { participantId, eventId };
}

export function encodeCheckInId(participantId, eventId) {
	return [participantId, eventId].join(checkInIdDelimiter);
}
