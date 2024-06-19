// src/app/utils/xumm.js
import { Xumm } from "xumm";
import { config } from "dotenv";

config();

const xumm = new Xumm(
  process.env.NEXT_PUBLIC_XUMM_API_KEY!,
  process.env.NEXT_PUBLIC_XUMM_API_SECRET!
);

export default xumm;
