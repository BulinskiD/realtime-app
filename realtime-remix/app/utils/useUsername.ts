import { useParams } from "react-router-dom";

export function useUsername(): string {
  const { userName } = useParams();

  return userName;
}
