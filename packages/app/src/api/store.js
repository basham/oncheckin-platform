import cuid from '@paralleldrive/cuid2';
import * as Y from 'yjs';
import { IndexeddbPersistence, storeState } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';
import { APP_ID, SERVER_URL } from '../constants.js';
import { debounce, getOrCreate } from '../util.js';

export { Y };

export const cache = new Map();

export function createId() {
	return cuid.createId();
}

export function createYMap() {
	return new Y.Map();
}

export function createMemoryStore() {
	const doc = new Y.Doc();
	return { doc };
}

export function createLocalStore(id) {
	const cacheKey = `local-store:${id}`;
	return getOrCreate(cache, cacheKey, async () => {
		const store = createMemoryStore();
		const storeId = `${APP_ID}-${id}`;
		const { doc } = store;
		const localProvider = new IndexeddbPersistence(storeId, doc);
		const clearData = async () => {
			await localProvider.clearData();
			cache.delete(cacheKey);
		};
		const save = () => storeState(localProvider);
		await localProvider.whenSynced;
		return { ...store, id, storeId, clearData, save };
	});
}

const messageReconnectTimeout = 30000;

export function createRemoteStore(id) {
	const cacheKey = `remote-store:${id}`;
	return getOrCreate(cache, cacheKey, async () => {
		const store = await createLocalStore(id);
		const { storeId, doc } = store;
		let remoteProvider;
		const bc = new BroadcastChannel(`bc-${id}`);
		const sendCount = () => {
			const value = remoteProvider ? remoteProvider.awareness.getStates().size : 0;
			console.log('COUNT', value, id);
			return bc.postMessage(['count', value]);
		};
		const createRemoteProvider = () => {
			remoteProvider = new WebsocketProvider(SERVER_URL, storeId, doc);
			remoteProvider.awareness.on('change', sendCount);
		};
		const destroyRemoteProvider = () => {
			if (!remoteProvider) {
				return;
			}
			remoteProvider.destroy();
			remoteProvider = null;
			sendCount();
		};
		createRemoteProvider();

		// Reset the provider if it has been awhile since the last message;
		const resetInterval = setInterval(() => {
			if (!remoteProvider) {
				return;
			}
			const diff = Date.now() - remoteProvider.wsLastMessageReceived;
			if (diff < messageReconnectTimeout) {
				return;
			}
			//destroyRemoteProvider();
			//createRemoteProvider();
		}, 1000);

		// Reset the provider when back online after going offline.
		self.addEventListener('offline', () => {
			destroyRemoteProvider();
		});
		self.addEventListener('online', () => {
			createRemoteProvider();
		});

		bc.onmessage = (event) => {
			const [type] = event.data;
			if (type === 'getCount') {
				sendCount();
			}
		};

		const clearData = async () => {
			bc.close();
			clearInterval(resetInterval);
			await store.clearData();
			remoteProvider.destroy();
			cache.delete(cacheKey);
		};

		return { ...store, clearData };
	});
}
