import { useState } from "react";
import { useCardStore } from "../stores/cardStore";
import { Card } from "./Card";
import { Button } from "./Button";

export const DeletedCards = () => {
	const deletedCards = useCardStore((state) => state.deletedCards);
	const revertCard = useCardStore((state) => state.revertCard);
	const [isRevealed, setIsRevealed] = useState(false);
	return (
		<section className="w-full max-w-xl">
			<div className="flex items-center justify-between">
				<h1 className="mb-1 font-medium text-lg">
					Deleted Cards ({deletedCards.length})
				</h1>

				<Button
					disabled={!deletedCards.length}
					onClick={() => setIsRevealed((prev) => !prev)}
					className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
				>
					Reveal
				</Button>
			</div>
			<div
				className={`flex flex-col gap-y-3 transition-max-height transition-max-width duration-300 ease-in-out overflow-hidden ${
					isRevealed ? "max-h-[200px]" : "max-h-0"
				}`}
			>
				{deletedCards.map((card) => (
					<Card
						key={card.id}
						card={{ ...card, description: "" }}
						onDelete={revertCard}
						cardType={"delete"}
					/>
				))}
			</div>
		</section>
	);
};
