const NEXT = {
  IS_CLIENT: typeof window !== "undefined",
  IS_SERVER: typeof window === "undefined",
};

export default NEXT;
