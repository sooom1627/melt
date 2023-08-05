import { atom, selector } from "recoil";

export const tagListState = atom<string[]>({
	key: "tagListState",
	default: [],
});

export const persistedTagListState = selector<string[]>({
	key: "persistedTagListState",
	get: ({ get }) => {
		const savedTags = localStorage.getItem("tags");
		return savedTags ? JSON.parse(savedTags) : get(tagListState);
	},
	set: ({ set }, newValue) => {
		localStorage.setItem("tags", JSON.stringify(newValue));
		set(tagListState, newValue);
	},
});
