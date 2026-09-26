// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import serviceWorker from './integrations/sw.mjs';
import venueKit from '@present/venue-kit';
import printPack from './integrations/print-pack.mjs';
import houseRules from '@present/house-rules';
import bedtimeHandover from '@present/bedtime-handover';
import chargerStation from '@present/charger-station';
import fridgeQuestion from '@present/fridge-question';
import coupons from '@present/coupons';
import guestBook from '@present/guest-book';
import placemats from '@present/placemats';
import postIt from '@present/post-it';
import skyCheck from '@present/sky-check';
import directionDice from '@present/direction-dice';
import bench from '@present/bench';
import passTheParcel from '@present/pass-the-parcel';
import silentMinute from '@present/silent-minute';
import toast from '@present/toast';
import twoTruths from '@present/two-truths';
import storyStack from '@present/story-stack';
import tableQuiz from '@present/table-quiz';
import analogHour from '@present/analog-hour';
import presenceLedger from '@present/presence-ledger';
import walkAndTalk from '@present/walk-and-talk';
import noticingCards from '@present/noticing-cards';
import phoneParking from '@present/phone-parking';
import conversationRoulette from '@present/conversation-roulette';
import oneQuestion from '@present/one-question';
import tablePact from '@present/table-pact';

// Tools register themselves as Astro integrations that inject a route each.
// Add a tool here after creating it in tools/<name>/.
const toolIntegrations = [tablePact(), oneQuestion(), conversationRoulette(), phoneParking(), noticingCards(), walkAndTalk(), presenceLedger(), analogHour(), tableQuiz(), storyStack(), twoTruths(), toast(), silentMinute(), passTheParcel(), bench(), directionDice(), skyCheck(), postIt(), placemats(), guestBook(), coupons(), fridgeQuestion(), chargerStation(), bedtimeHandover(), houseRules(), venueKit()];

const base = process.env.BASE_PATH || '/';
const site = process.env.SITE_URL || 'https://mohitagw15856.github.io';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [...toolIntegrations, printPack(), serviceWorker()],
  vite: {
    plugins: [tailwindcss()],
    server: { fs: { allow: ['..'] } },
  },
});
