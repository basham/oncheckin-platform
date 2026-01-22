import { co, z } from "jazz-tools";

export const CURRENT_SCHEMA_VERSION = 1;
export const schemaVersion = CURRENT_SCHEMA_VERSION;
export const now = () => new Date().toISOString();

export const MetaComponent = co.map({
	name: z.string().optional(),
	description: z.string().optional(),
	lastUpdatedAt: z.iso.datetime().optional(),
	lastViewedAt: z.iso.datetime().optional(),
	schemaVersion: z.number().int(),
});
export type MetaComponent = co.loaded<typeof MetaComponent>;

export const BaselineComponent = co.map({
	asOfDate: z.iso.date(),
	number: z.number().int().min(0),
});
export type BaselineComponent = co.loaded<typeof BaselineComponent>;

export const CheckinRole = z.enum(["participant", "organizer"]);
export const CheckinComponent = co.map({
	role: CheckinRole,
});
export type CheckinComponent = co.loaded<typeof CheckinComponent>;

export const EventComponent = co.map({
	startsAt: z.iso.datetime(),
});
export type EventComponent = co.loaded<typeof EventComponent>;

export const PersonComponent = co.map({
	nickname: z.string().optional(),
});
export type PersonComponent = co.loaded<typeof PersonComponent>;

export const LinkComponent = co.map({
	get from() {
		return Entity;
	},
	get to() {
		return Entity;
	},
});
export type LinkComponent = co.loaded<typeof LinkComponent>;

export const RootComponent = co.map({
	get root() {
		return Root;
	},
});
export type RootComponent = co.loaded<typeof RootComponent>;

export const SequenceComponent = co.map({
	mode: z.enum(["auto", "custom", "ignore"]),
	number: z.number().int().positive().optional(),
});
export type SequenceComponent = co.loaded<typeof SequenceComponent>;

export const TagParents = z.enum(["checkin", "event", "person"]);
export const TagComponent = co.map({
	childOf: TagParents,
});
export type TagComponent = co.loaded<typeof TagComponent>;

export const Entity = co.map({
	meta: MetaComponent,
	baseline: co.optional(BaselineComponent),
	checkin: co.optional(CheckinComponent),
	club: co.optional(RootComponent),
	event: co.optional(EventComponent),
	link: co.optional(LinkComponent),
	person: co.optional(PersonComponent),
	sequence: co.optional(SequenceComponent),
	tag: co.optional(TagComponent),
	get tags() {
		return co.optional(co.list(Entity));
	},
});
export type Entity = co.loaded<typeof Entity>;

export const Root = co.map({
	meta: MetaComponent,
	entities: co.record(z.string(), Entity),
});
export type Root = co.loaded<typeof Root>;

export const Account = co
	.account({
		profile: co.profile(),
		root: Root,
	})
	.withMigration((account) => {
		if (!account.$jazz.has("root")) {
			account.$jazz.set("root", {
				meta: {
					schemaVersion: CURRENT_SCHEMA_VERSION,
				},
				entities: {},
			});
		}
	});
