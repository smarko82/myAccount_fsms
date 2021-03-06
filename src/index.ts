import { interpret } from "xstate";
import { inspect } from "@xstate/inspect";
import { rootFSM } from "./fsm/root/rootFSM";

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
const machine = rootFSM;

// Edit your service(s) here
const service = interpret(machine, { devTools: true });

service.start();
