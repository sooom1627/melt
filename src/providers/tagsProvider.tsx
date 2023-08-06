import { atom, DefaultValue } from "recoil";
import { Tags } from "../models/Tags";

const parseStoredTags = (savedValue: string): Tags[] => {
	try {
		return JSON.parse(savedValue);
	} catch {
		return [];
	}
};

const localStorageEffect =
	(key: string) =>
	({
		setSelf,
		onSet,
	}: {
		setSelf: (newValue: Tags[]) => void;
		onSet: (fn: (newValue: Tags[]) => void) => void;
	}) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(parseStoredTags(savedValue));
		}

		onSet((newValue: Tags[]) => {
			if (newValue instanceof DefaultValue) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, JSON.stringify(newValue));
			}
		});
	};

export const tagListState = atom<Tags[]>({
	key: "tagListState",
	default: [],
	effects_UNSTABLE: [localStorageEffect("tags")],
});
