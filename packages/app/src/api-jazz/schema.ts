import { co, z } from "jazz-tools";

const CURRENT_SCHEMA_VERSION = 1;
const now = () => new Date().toISOString();

export const MetaComponent = co.map({
	name: z.string().optional(),
	description: z.string().optional(),
	lastUpdatedAt: z.iso.datetime().default(now).optional(),
	schemaVersion: z.number().int().default(CURRENT_SCHEMA_VERSION).optional(),
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
	lastCheckpointAt: z.iso.datetime().optional(),
	get person() {
		return Entity;
	},
	role: CheckinRole,
});
export type CheckinComponent = co.loaded<typeof CheckinComponent>;

export const EventComponent = co.map({
	excludeFromTotal: z.boolean().optional(),
	startsAt: z.iso.datetime(),
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

export const TagsComponent = co.record(
	z.string(),
	z.iso.datetime().default(now),
);
export type TagsComponent = co.loaded<typeof TagsComponent>;

export const Entity = co.map({
	meta: MetaComponent,
	baselineOrganizerCheckins: co.optional(BaselineComponent),
	baselineParticipantCheckins: co.optional(BaselineComponent),
	checkin: co.optional(CheckinComponent),
	event: co.optional(EventComponent),
	member: co.optional(MemberComponent),
	person: co.optional(PersonComponent),
	tag: co.optional(TagComponent),
	tags: co.optional(TagsComponent),
});
export type Entity = co.loaded<typeof Entity>;

export const Club = co.map({
	meta: MetaComponent,
	baselineEvents: co.optional(BaselineComponent),
	entities: co.record(z.string(), Entity),
});
export type Club = co.loaded<typeof Club>;

export const AccountClub = co.map({
	meta: MetaComponent,
	club: Club,
	lastOpenedAt: z.iso.datetime().optional(),
});
export type AccountClub = co.loaded<typeof AccountClub>;

export const AccountRoot = co.map({
	meta: MetaComponent,
	accountClubs: co.record(z.string(), AccountClub),
});
export type AccountRoot = co.loaded<typeof AccountRoot>;

export const Account = co
	.account({
		profile: co.profile(),
		root: AccountRoot,
	})
	.withMigration((account) => {
		if (!account.$jazz.has("root")) {
			account.$jazz.set("root", {
				meta: {},
				accountClubs: {},
			});
		}
	});
