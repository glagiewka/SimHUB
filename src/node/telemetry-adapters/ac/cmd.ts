import {ACAdapter} from "./ACAdapter";
import {EventName} from "@common/event";

new ACAdapter(process.argv[2])
    .subscribe(EventName.GameConnected, (e) => { console.log(e)  })
    .subscribe(EventName.Physics, (e) => { console.log(e)  })
    .start();

