import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { persistedTagListState } from "../../providers/tagsProvider";

export const TagsManage: React.FC = () => {
	const [newTag, setNewTag] = useState("");
	const [tags, setTags] = useRecoilState(persistedTagListState);

	const handleAddTag = () => {
		if (newTag && !tags.includes(newTag)) {
			setTags([...tags, newTag]);
			setNewTag("");
		}
	};

	return (
		<div className="px-12 sm:ml-60">
			<input
				type="text"
				value={newTag}
				onChange={(e) => setNewTag(e.target.value)}
			/>
			<button onClick={handleAddTag}>タグを追加</button>
			<ul>
				{tags.map((tag) => (
					<li key={tag}>{tag}</li>
				))}
			</ul>
		</div>
	);
};
