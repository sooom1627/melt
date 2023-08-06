import React, { useEffect, useState } from "react";
// Recoil
import { useRecoilState } from "recoil";
import { tagListState } from "../../../providers/tagsProvider";
// Models
import { Tags } from "../../../models/Tags";

interface Props {
	showModal: boolean;
	toggleModal: () => void;
	selectedTag?: Tags;
}

export const TagsEditModal: React.FC<Props> = ({
	showModal,
	toggleModal,
	selectedTag,
}) => {
	const [tags, setTags] = useRecoilState(tagListState);
	const [newName, setNewName] = useState<string>(
		selectedTag ? selectedTag.name : ""
	);
	const [newDesc, setNewDesc] = useState<string>(
		selectedTag?.description ? selectedTag.description : ""
	);
	const [selectedColorValue, setSelectedColorValue] = useState<string>(
		selectedTag ? selectedTag.color : ""
	);

	useEffect(() => {
		setSelectedColorValue(selectedTag ? selectedTag.color : "");
		setNewName(selectedTag ? selectedTag.name : "");
		setNewDesc(selectedTag?.description ? selectedTag.description : "");
	}, [selectedTag]);

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedColorValue(event.target.value);
	};

	const childClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const changeTagName = (
		id: string,
		newName: string,
		newDesc: string,
		newColor: string
	) => {
		toggleModal();
		setTags((currentTags) =>
			currentTags.map((tag) => {
				if (tag.id === id) {
					return {
						...tag,
						name: newName,
						description: newDesc,
						color: newColor,
					};
				} else {
					return tag;
				}
			})
		);
	};

	const removeTag = (id: string) => {
		toggleModal();
		setTags((currentTags) => currentTags.filter((tag) => tag.id !== id));
	};

	return (
		<>
			<div
				tabIndex={-1}
				onClick={toggleModal}
				className={`${
					showModal ? "bg-slate-700/50" : "hidden"
				}  duration-300 fixed flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full`}
			>
				<div
					onClick={childClick}
					className="relative w-full max-w-3xl max-h-full z-50"
				>
					<div className="relative bg-white rounded-lg shadow">
						<div className="flex items-start justify-between p-4 border-b rounded-t ">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								タグの編集
							</h3>
							<button
								type="button"
								onClick={toggleModal}
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="defaultModal"
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<div className="px-8 pt-4 pb-2">
							<label className="text-base font-bold text-gray-900">
								タグ名
							</label>
							<input
								type="text"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
								className="my-3 block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
								placeholder="タグ名を編集"
							/>
						</div>
						<div className="px-8 pt-2 pb-2">
							<p className="text-base font-bold text-gray-900">カラー</p>
							<ul className="items-center w-full my-3 text-sm font-medium text-gray-900 bg-white sm:flex">
								<li className="w-8 h-8 mx-2">
									<div className="flex h-full items-center">
										<input
											id="gray"
											type="radio"
											value="bg-gray-200 text-gray-800"
											name="list-radio"
											className="hidden"
											onChange={handleColorChange}
										/>
										<label
											htmlFor="gray"
											className={`w-full h-full rounded-full py-3 text-sm font-medium text-gray-900 bg-gray-400 ${
												selectedColorValue === "bg-gray-200 text-gray-800"
													? "outline-gray-700 outline-4 outline"
													: ""
											}`}
										></label>
									</div>
								</li>
								<li className="w-8 h-8 mx-2">
									<div className="flex h-full items-center">
										<input
											id="blue"
											type="radio"
											value="bg-blue-200 text-blue-800"
											name="list-radio"
											className="hidden"
											onChange={handleColorChange}
										/>
										<label
											htmlFor="blue"
											className={`w-full h-full rounded-full py-3 text-sm font-medium text-gray-900 bg-blue-400 ${
												selectedColorValue === "bg-blue-200 text-blue-800"
													? "outline-blue-700 outline-4 outline"
													: ""
											}`}
										></label>
									</div>
								</li>
								<li className="w-8 h-8 mx-2">
									<div className="flex h-full items-center">
										<input
											id="green"
											type="radio"
											value="bg-green-200 text-green-800"
											name="list-radio"
											className="hidden"
											onChange={handleColorChange}
										/>
										<label
											htmlFor="green"
											className={`w-full h-full rounded-full py-3 text-sm font-medium text-gray-900 bg-green-400 ${
												selectedColorValue === "bg-green-200 text-green-800"
													? "outline-green-700 outline-4 outline"
													: ""
											}`}
										></label>
									</div>
								</li>
								<li className="w-8 h-8 mx-2">
									<div className="flex h-full items-center">
										<input
											id="yellow"
											type="radio"
											value="bg-yellow-200 text-yellow-800"
											name="list-radio"
											className="hidden"
											onChange={handleColorChange}
										/>
										<label
											htmlFor="yellow"
											className={`w-full h-full rounded-full py-3 text-sm font-medium text-gray-900 bg-yellow-400 ${
												selectedColorValue === "bg-yellow-200 text-yellow-800"
													? "outline-yellow-500 outline-4 outline"
													: ""
											}`}
										></label>
									</div>
								</li>
								<li className="w-8 h-8 mx-2">
									<div className="flex h-full items-center">
										<input
											id="orange"
											type="radio"
											value="bg-orange-200 text-orange-800"
											name="list-radio"
											className="hidden"
											onChange={handleColorChange}
										/>
										<label
											htmlFor="orange"
											className={`w-full h-full rounded-full py-3 text-sm font-medium text-gray-900 bg-orange-400 ${
												selectedColorValue === "bg-orange-200 text-orange-800"
													? "outline-orange-600 outline-4 outline"
													: ""
											}`}
										></label>
									</div>
								</li>
								<li className="w-8 h-8 mx-2">
									<div className="flex h-full items-center">
										<input
											id="red"
											type="radio"
											value="bg-red-200 text-red-800"
											name="list-radio"
											className="hidden"
											onChange={handleColorChange}
										/>
										<label
											htmlFor="red"
											className={`w-full h-full rounded-full py-3 text-sm font-medium text-gray-900 bg-red-400 ${
												selectedColorValue === "bg-red-200 text-red-800"
													? "outline-red-600 outline-4 outline"
													: ""
											}`}
										></label>
									</div>
								</li>
								<li className="w-8 h-8 mx-2">
									<div className="flex h-full items-center">
										<input
											id="violet"
											type="radio"
											value="bg-violet-200 text-violet-800"
											name="list-radio"
											className="hidden"
											onChange={handleColorChange}
										/>
										<label
											htmlFor="violet"
											className={`w-full h-full rounded-full py-3 text-sm font-medium text-gray-900 bg-violet-400 ${
												selectedColorValue === "bg-violet-200 text-violet-800"
													? "outline-violet-500 outline-4 outline"
													: ""
											}`}
										></label>
									</div>
								</li>
							</ul>
						</div>
						<div className="px-8 pt-2">
							<label className="text-base font-bold text-gray-900">
								タグの説明
							</label>
							<textarea
								value={newDesc}
								onChange={(e) => setNewDesc(e.target.value)}
								className="my-3 block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
								placeholder="タグ名の説明"
							/>
						</div>
						{selectedTag ? (
							<div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b ">
								<button
									onClick={() =>
										changeTagName(
											selectedTag.id,
											newName,
											newDesc,
											selectedColorValue
										)
									}
									className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
								>
									タグ更新
								</button>
								<button
									onClick={() => removeTag(selectedTag.id)}
									className="text-white bg-red-500  hover:bg-red-600 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10"
								>
									タグの削除
								</button>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
