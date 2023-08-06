import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { tagListState } from "../../providers/tagsProvider";
import { Tags } from "../../models/Tags";

export const TagsManage: React.FC = () => {
	const [newTag, setNewTag] = useState("");
	const [tags, setTags] = useRecoilState(tagListState);
	const [showTags, setShowTags] = useState(tags);

	const handleAddTag = (newTag: string) => {
		if (newTag) {
			const newTags: Tags = {
				id: uuidv4(),
				name: newTag,
				color: "bg-gray-100 text-gray-800",
				description: "なし",
			};
			setTags([...tags, newTags]);
			setNewTag("");
		}
	};

	return (
		<div className="px-12 sm:ml-60 pt-16">
			<form
				className="w-full mb-8 "
				onSubmit={(e) => {
					e.preventDefault();
					handleAddTag(newTag);
				}}
			>
				<label className="mb-2 text-sm font-medium text-gray-900 sr-only">
					タスクを入力
				</label>
				<div className="relative w-100">
					<input
						type="text"
						value={newTag}
						onChange={(e) => setNewTag(e.target.value)}
						className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="タグを作成"
					/>
					<button
						type="submit"
						className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						追加
					</button>
				</div>
			</form>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								タグ名
							</th>
							<th scope="col" className="px-6 py-3">
								カラー
							</th>
							<th scope="col" className="px-6 py-3">
								説明
							</th>
							<th scope="col" className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{tags.map((tag) => (
							<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{tag.name}
								</th>
								<td className="px-6 py-4">
									<div className={`${tag.color} w-8 h-4 rounded`}></div>
								</td>
								<td className="px-6 py-4">{tag.description}</td>
								<td className="px-6 py-4">
									<a
										href="#"
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									>
										Edit
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
