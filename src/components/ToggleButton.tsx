import { FC } from "react";

interface ToggleButtonProps {
	isToggled: boolean;
	onToggle: () => void;
	onIcon: React.ReactNode;
	offIcon: React.ReactNode;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
	isToggled,
	onToggle,
	onIcon,
	offIcon,
}) => {
	return (
		<button onClick={onToggle} aria-label="Toggle button">
			{isToggled ? onIcon : offIcon}
		</button>
	);
};
