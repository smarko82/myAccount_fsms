import { interpret } from "xstate";
import { inspect } from "@xstate/inspect";
import { rootFSM } from "./fsm/root/rootFSM";

import { postCartMachine } from "./fsm/upgrade/postCartFSM";
import { upgradeFSM } from "./fsm/upgrade/upgradeFSM";
import { pinResetFSM } from "./fsm/pin-reset/pinResetFSM";

inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});

document.getElementById("app").innerHTML = `
<section>
  <div>
    Open the <strong>Console</strong> to view the machine output.
  </div>
</section>
`;

// Edit your machine(s) here
const machine = upgradeFSM;

// Edit your service(s) here
const service = interpret(machine, { devTools: true });

service.start();
