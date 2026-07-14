import { useDispatch, useSelector } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";

import type { AppDispatch, RootState } from "./store";

/**
 * Typed Dispatch Hook
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed Selector Hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
