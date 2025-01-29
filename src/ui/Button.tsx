import styled, { css } from "styled-components";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Delete, Edit, CheckCircle } from "@mui/icons-material"; // Material UI Icons

// Define button sizes
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
} as const;

// Define button variations
const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
} as const;

// Define available button sizes and variations
type ButtonSize = keyof typeof sizes;
type ButtonVariation = keyof typeof variations;

// Define props for the button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variation?: ButtonVariation;
  icon?: "delete" | "edit" | "check"; // Available Material UI icons
  children?: ReactNode;
}

// Styled button component
const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 0.8rem;

  ${(props) => sizes[props.size || "medium"]}
  ${(props) => variations[props.variation || "primary"]}
`;

// Map icon names to Material UI components
const getIcon = (icon?: string) => {
  switch (icon) {
    case "delete":
      return <Delete />;
    case "edit":
      return <Edit />;
    case "check":
      return <CheckCircle />;
    default:
      return null;
  }
};

// Button component with optional icon
const Button = ({
  size = "medium",
  variation = "primary",
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton size={size} variation={variation} {...props}>
      {icon && getIcon(icon)}
      {children}
    </StyledButton>
  );
};

export default Button;
