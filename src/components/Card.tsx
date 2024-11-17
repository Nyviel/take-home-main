import { FC, memo } from "react";
import { ListItem } from "../api/getListData";
import { ChevronDownIcon, ChevronUpIcon, RevertIcon, XMarkIcon } from "./icons";
import { useCardStore } from "../stores/cardStore";
import { Button } from "./Button";
import { ToggleButton } from "./ToggleButton";

type CardProps = {
	card: ListItem;
	onDelete: (card: ListItem) => void;
	cardType: "visible" | "delete";
};

export const Card: FC<CardProps> = memo(({ card, onDelete, cardType }) => {
	const toggleExpanded = useCardStore((state) => state.toggleExpanded);
	return (
		<article className="border border-black px-2 py-1.5 transition-all ease-in-out">
			<div className="flex justify-between mb-0.5">
				<h1 className="font-medium">{card.title}</h1>
				<div className="flex">
					<ToggleButton
						isToggled={card.isExpanded}
						onToggle={() => toggleExpanded(card)}
						offIcon={<ChevronDownIcon />}
						onIcon={<ChevronUpIcon />}
					/>
					<Button
						onClick={() => {
							onDelete(card);
						}}
					>
						{cardType == "delete" ? <RevertIcon /> : <XMarkIcon />}
					</Button>
				</div>
			</div>
			<div
				className={`transition-max-height transition-max-width duration-300 ease-in-out overflow-hidden ${
					!card.isExpanded ? "max-h-0" : "max-h-[200px]"
				}`}
			>
				<p className="text-sm">{card.description}</p>
			</div>
		</article>
	);
});
