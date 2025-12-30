import { co, z } from "jazz-tools";

export const MetaComponent = co.map({
	name: z.string().optional(),
	description: z.string().optional(),
	lastUpdatedAt: z.date().default(() => new Date()),
});
export type MetaComponent = co.loaded<typeof MetaComponent>;

export const BaselineComponent = co.map({
	total: z.number().int().min(0),
	asOfDate: z.iso.date(),
});
export type BaselineComponent = co.loaded<typeof BaselineComponent>;

export const CheckinRole = z
	.enum(["participant", "organizer"])
	.default("participant");
export const CheckinComponent = co.map({
	get event() {
		return Entity;
	},
	lastCheckpointAt: z.date().optional(),
	get person() {
		return Entity;
	},
	role: CheckinRole,
});
export type CheckinComponent = co.loaded<typeof CheckinComponent>;

export const EventComponent = co.map({
	excludeFromTotal: z.boolean().optional(),
	startsAt: z.iso.date(),
});
export type EventComponent = co.loaded<typeof EventComponent>;

export const MemberComponent = co.map({
	name: z.string().optional(),
});
export type MemberComponent = co.loaded<typeof MemberComponent>;

export const PersonComponent = co.map({});
export type PersonComponent = co.loaded<typeof PersonComponent>;

export const TagTargetTypes = z.enum(["checkin", "event", "member", "person"]);
export const TagComponent = co.map({
	targetType: TagTargetTypes,
});
export type TagComponent = co.loaded<typeof TagComponent>;

export const Entity = co.map({
	meta: MetaComponent,
	baselineOrganizerCheckins: co.optional(BaselineComponent),
	baselineParticipantCheckins: co.optional(BaselineComponent),
	checkin: co.optional(CheckinComponent),
	event: co.optional(EventComponent),
	member: co.optional(MemberComponent),
	person: co.optional(PersonComponent),
	tag: co.optional(TagComponent),
	tags: co.optional(co.record(z.string(), z.boolean().default(true))),
});
export type Entity = co.loaded<typeof Entity>;

export const Club = co.map({
	meta: MetaComponent,
	baselineEvents: co.optional(BaselineComponent),
	entities: co.record(z.string(), Entity),
});
export interface Club extends co.loaded<typeof Club> {}

export const ClubAccount = co.map({
	club: Club,
	lastOpenedAt: z.date(),
});
export type ClubAccount = co.loaded<typeof ClubAccount>;

export const RootAccount = co.map({
	clubAccounts: co.record(z.string(), ClubAccount),
});
export interface RootAccount extends co.loaded<typeof RootAccount> {}

export const Account = co.account({
	root: RootAccount,
	profile: co.profile(),
});
